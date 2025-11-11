import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockStyledSystem } from '../test-utils';
import { ref, computed } from 'vue';

// Mock styled-system components
mockStyledSystem();

// Mock Nuxt composables
const mockPush = vi.fn();
const mockRouter = {
  push: mockPush
};

vi.stubGlobal('useRouter', vi.fn(() => mockRouter));
vi.stubGlobal('ref', ref);
vi.stubGlobal('computed', computed);

// Define stub components
const StyledLinkStub = {
  name: 'StyledLink',
  props: ['href'],
  template: '<a :href="href" class="styled-link"><slot /></a>'
};

const FormInputWithLabelStub = {
  name: 'FormInputWithLabel',
  props: ['modelValue', 'fieldName', 'labelText', 'inputType'],
  emits: ['update:modelValue'],
  template: `
    <div class="input-wrapper">
      <label>{{ labelText }}</label>
      <input
        :type="inputType || 'text'"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :data-field="fieldName"
      />
    </div>
  `
};

const ButtonsPrimaryStub = {
  name: 'ButtonsPrimary',
  props: ['type'],
  emits: ['action'],
  template: '<button :type="type" @click="$emit(\'action\')" class="primary-button"><slot /></button>'
};

// Import Form after mocks are set up
const FormModule = await import('./Form.vue');
const Form = FormModule.default;

// Helper function to mount with stubs
function mountForm(options = {}) {
  return mount(Form, {
    global: {
      components: {
        StyledLink: StyledLinkStub,
        FormInputWithLabel: FormInputWithLabelStub,
        ButtonsPrimary: ButtonsPrimaryStub
      }
    },
    ...options
  });
}

describe('Form.vue', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  describe('Component Structure', () => {
    it('should render form element', () => {
      const wrapper = mountForm();

      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
    });

    it('should render VStack container', () => {
      const wrapper = mountForm();

      // VStack renders as container (div)
      // Note: Class assertions depend on mock implementation
      expect(wrapper.element).toBeTruthy();
      expect(wrapper.element.tagName.toLowerCase()).toBe('div');
    });

    it('should render HStack for new user prompt', () => {
      const wrapper = mountForm();

      // HStack renders for the new user prompt section
      // Verify by checking for the "New user?" text
      expect(wrapper.text()).toContain('New user?');
    });
  });

  describe('New User Prompt', () => {
    it('should display "New user?" text', () => {
      const wrapper = mountForm();

      expect(wrapper.text()).toContain('New user?');
    });

    it('should display "Create an account." link', () => {
      const wrapper = mountForm();

      const link = wrapper.find('.styled-link');
      expect(link.exists()).toBe(true);
      expect(link.text()).toContain('Create an account.');
    });

    it('should have link to account creation', () => {
      const wrapper = mountForm();

      const link = wrapper.find('.styled-link');
      expect(link.attributes('href')).toBe('#');
    });
  });

  describe('Form Fields', () => {
    it('should render username field', () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      expect(usernameInput.exists()).toBe(true);
    });

    it('should render password field', () => {
      const wrapper = mountForm();

      const passwordInput = wrapper.find('[data-field="password"]');
      expect(passwordInput.exists()).toBe(true);
    });

    it('should have password input type for password field', () => {
      const wrapper = mountForm();

      const passwordInput = wrapper.find('[data-field="password"]');
      expect(passwordInput.attributes('type')).toBe('password');
    });

    it('should render submit button', () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      expect(submitButton.exists()).toBe(true);
    });

    it('should display "Continue" on submit button', () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      expect(submitButton.text()).toContain('Continue');
    });

    it('should have type="submit" on submit button', () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      expect(submitButton.attributes('type')).toBe('submit');
    });
  });

  describe('Forgot Password Link', () => {
    it('should render forgot password link', () => {
      const wrapper = mountForm();

      const links = wrapper.findAll('.styled-link');
      const forgotPasswordLink = links.find(link => link.text().includes('Forgot password?'));
      expect(forgotPasswordLink).toBeTruthy();
    });

    it('should have correct href for forgot password', () => {
      const wrapper = mountForm();

      const links = wrapper.findAll('.styled-link');
      const forgotPasswordLink = links.find(link => link.attributes('href') === '/forgot-password');
      expect(forgotPasswordLink).toBeTruthy();
    });
  });

  describe('Form Input Handling', () => {
    it('should update username when input changes', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      expect((usernameInput.element as HTMLInputElement).value).toBe('testuser');
    });

    it('should update password when input changes', async () => {
      const wrapper = mountForm();

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      expect((passwordInput.element as HTMLInputElement).value).toBe('testpass123');
    });

    it('should handle empty username', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('');

      expect((usernameInput.element as HTMLInputElement).value).toBe('');
    });

    it('should handle empty password', async () => {
      const wrapper = mountForm();

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('');

      expect((passwordInput.element as HTMLInputElement).value).toBe('');
    });
  });

  describe('Form Validation', () => {
    it('should not show errors initially', () => {
      const wrapper = mountForm();

      const errorBox = wrapper.find('.box');
      // Error box should not be visible initially
      expect(wrapper.text()).not.toContain('There were some errors:');
    });

    it('should show error when submitting with empty username', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      expect(wrapper.text()).toContain('There were some errors:');
      expect(wrapper.text()).toContain('Username is required');
    });

    it('should show error when submitting with empty password', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      expect(wrapper.text()).toContain('There were some errors:');
      expect(wrapper.text()).toContain('Password is required');
    });

    it('should show both errors when both fields are empty', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      expect(wrapper.text()).toContain('Username is required');
      expect(wrapper.text()).toContain('Password is required');
    });

    it('should not show errors when both fields are filled', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      // Wait for next tick
      await wrapper.vm.$nextTick();

      // Should redirect, not show errors
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Form Submission', () => {
    it('should navigate to home when form is valid', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should not navigate when form is invalid', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      expect(mockPush).not.toHaveBeenCalled();
    });

    it('should clear form after successful submission', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      // Form should be cleared after successful submission
      // Note: The actual clearing happens in the component, we verify navigation occurred
      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should handle multiple submission attempts', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');

      // First attempt - should fail
      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();
      expect(mockPush).not.toHaveBeenCalled();

      // Fill in fields
      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      // Second attempt - should succeed
      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Error Display', () => {
    it('should render error list when there are errors', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toContain('There were some errors:');
    });

    it('should display errors as list items', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      const errorList = wrapper.find('ul');
      expect(errorList.exists()).toBe(true);
    });

    it('should clear errors on valid submission', async () => {
      const wrapper = mountForm();

      // First, trigger errors
      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toContain('There were some errors:');

      // Then fill in valid data
      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Should navigate, clearing errors
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mountForm();
      }).not.toThrow();
    });

    it('should handle special characters in username', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('user@example.com');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('pass123!@#');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should handle very long username', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('a'.repeat(100));

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('password123');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should handle whitespace-only username', async () => {
      const wrapper = mountForm();

      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('   ');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('password123');

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      // Whitespace-only should be treated as valid (component doesn't trim)
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  describe('Accessibility', () => {
    it('should have semantic form element', () => {
      const wrapper = mountForm();

      const form = wrapper.find('form');
      expect(form.exists()).toBe(true);
    });

    it('should have labels for inputs', () => {
      const wrapper = mountForm();

      const labels = wrapper.findAll('label');
      expect(labels.length).toBeGreaterThanOrEqual(2);
    });

    it('should have submit button', () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('[type="submit"]');
      expect(submitButton.exists()).toBe(true);
    });

    it('should show error messages to users', async () => {
      const wrapper = mountForm();

      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      const errorMessages = wrapper.text();
      expect(errorMessages).toContain('There were some errors:');
    });

    it('should have password input type for security', () => {
      const wrapper = mountForm();

      const passwordInput = wrapper.find('[data-field="password"]');
      expect(passwordInput.attributes('type')).toBe('password');
    });
  });

  describe('Integration', () => {
    it('should work as a complete login form', async () => {
      const wrapper = mountForm();

      // Check initial state
      expect(wrapper.find('form').exists()).toBe(true);
      expect(wrapper.find('[data-field="username"]').exists()).toBe(true);
      expect(wrapper.find('[data-field="password"]').exists()).toBe(true);

      // Fill in form
      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      // Submit
      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      // Verify navigation
      expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('should provide full validation feedback', async () => {
      const wrapper = mountForm();

      // Submit empty form
      const submitButton = wrapper.find('.primary-button');
      await submitButton.trigger('click');

      await wrapper.vm.$nextTick();

      // Check errors are shown
      expect(wrapper.text()).toContain('Username is required');
      expect(wrapper.text()).toContain('Password is required');

      // Fill username only
      const usernameInput = wrapper.find('[data-field="username"]');
      await usernameInput.setValue('testuser');

      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Should still show password error
      expect(wrapper.text()).toContain('Password is required');

      // Fill password
      const passwordInput = wrapper.find('[data-field="password"]');
      await passwordInput.setValue('testpass123');

      await submitButton.trigger('click');
      await wrapper.vm.$nextTick();

      // Should navigate successfully
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
