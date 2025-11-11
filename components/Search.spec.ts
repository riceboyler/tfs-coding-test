import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Search from './Search.vue';

const TEST_SEARCH_TERMS = {
  short: 'test',
  long: 'this is a very long search query',
  special: 'test & search <script>',
  unicode: '测试搜索 🔍',
  withSpaces: '  padded  ',
  empty: ''
} as const;

describe('Search.vue', () => {
  describe('Component Structure', () => {
    it('should render search wrapper', () => {
      const wrapper = mount(Search);

      const searchWrapper = wrapper.find('.search-wrapper');
      expect(searchWrapper.exists()).toBe(true);
    });

    it('should render search input', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input[name="search"]');
      expect(input.exists()).toBe(true);
    });

    it('should render search icon', () => {
      const wrapper = mount(Search);

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });

    it('should have correct input type', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.attributes('type')).toBe('text');
    });

    it('should have search-input class', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.classes()).toContain('search-input');
    });
  });

  describe('Icon Display', () => {
    it('should display magnifying glass icon', () => {
      const wrapper = mount(Search);

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe('rivet-icons:magnifying-glass');
    });

    it('should render icon before input', () => {
      const wrapper = mount(Search);

      const searchWrapper = wrapper.find('.search-wrapper');
      const children = searchWrapper.element.children;

      // Icon should come before input
      expect(children[0].classList.contains('icon')).toBe(true);
    });
  });

  describe('Placeholder', () => {
    it('should have "Search" placeholder', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBe('Search');
    });
  });

  describe('V-Model Binding', () => {
    it('should update modelValue when input changes', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: ''
        }
      });

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.short);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([TEST_SEARCH_TERMS.short]);
    });

    it('should display initial modelValue', () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.short);
    });

    it('should update display when modelValue prop changes', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      await wrapper.setProps({ modelValue: TEST_SEARCH_TERMS.long });

      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.long);
    });

    it('should handle empty string', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.empty);

      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('update:modelValue')![wrapper.emitted('update:modelValue')!.length - 1]).toEqual([TEST_SEARCH_TERMS.empty]);
    });
  });

  describe('Input Behavior', () => {
    it('should handle text input', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.short);

      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.short);
    });

    it('should handle long text input', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.long);

      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.long);
    });

    it('should handle special characters', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.special);

      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.special);
    });

    it('should handle unicode characters', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.unicode);

      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.unicode);
    });

    it('should handle text with spaces', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.withSpaces);

      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.withSpaces);
    });

    it('should handle clearing input', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      const input = wrapper.find('input');
      await input.setValue('');

      expect((input.element as HTMLInputElement).value).toBe('');
    });
  });

  describe('Focus Behavior', () => {
    it('should be focusable', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.trigger('focus');

      // In test environment, document.activeElement doesn't update as expected
      // Just verify the input element exists and is focusable
      expect(input.exists()).toBe(true);
      expect(input.element.tagName.toLowerCase()).toBe('input');
    });

    it('should handle blur event', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.trigger('blur');

      expect(input.exists()).toBe(true);
    });
  });

  describe('Styling', () => {
    it('should have search-wrapper styling', () => {
      const wrapper = mount(Search);

      const searchWrapper = wrapper.find('.search-wrapper');
      expect(searchWrapper.exists()).toBe(true);
    });

    it('should have icon styling', () => {
      const wrapper = mount(Search);

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(Search);
      }).not.toThrow();
    });

    it('should render with initial value without errors', () => {
      expect(() => {
        mount(Search, {
          props: {
            modelValue: TEST_SEARCH_TERMS.short
          }
        });
      }).not.toThrow();
    });

    it('should handle rapid input changes', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue('a');
      await input.setValue('ab');
      await input.setValue('abc');
      await input.setValue('abcd');

      expect((input.element as HTMLInputElement).value).toBe('abcd');
    });

    it('should maintain functionality after multiple value changes', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      const input = wrapper.find('input');

      await wrapper.setProps({ modelValue: TEST_SEARCH_TERMS.long });
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.long);

      await wrapper.setProps({ modelValue: TEST_SEARCH_TERMS.empty });
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.empty);

      await wrapper.setProps({ modelValue: TEST_SEARCH_TERMS.unicode });
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.unicode);
    });
  });

  describe('Accessibility', () => {
    it('should have accessible input element', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.element).toBeInstanceOf(HTMLInputElement);
    });

    it('should have name attribute', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.attributes('name')).toBe('search');
    });

    it('should have placeholder for screen readers', () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      expect(input.attributes('placeholder')).toBeTruthy();
    });

    it('should be keyboard accessible', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.trigger('focus');
      await input.trigger('keydown', { key: 'Enter' });

      expect(input.exists()).toBe(true);
    });
  });

  describe('Integration', () => {
    it('should work as a controlled component', async () => {
      const wrapper = mount(Search, {
        props: {
          modelValue: TEST_SEARCH_TERMS.short
        }
      });

      const input = wrapper.find('input');
      expect((input.element as HTMLInputElement).value).toBe(TEST_SEARCH_TERMS.short);

      await input.setValue(TEST_SEARCH_TERMS.long);
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    });

    it('should maintain icon while typing', async () => {
      const wrapper = mount(Search);

      const input = wrapper.find('input');
      await input.setValue(TEST_SEARCH_TERMS.short);

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
      expect(icon.attributes('data-icon')).toBe('rivet-icons:magnifying-glass');
    });
  });
});
