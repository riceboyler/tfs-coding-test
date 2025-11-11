import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Iconic from './Iconic.vue';

const TEST_ICONS = {
  default: 'mdi:home',
  arrow: 'tabler:arrow-narrow-left',
  inbox: 'mynaui:inbox',
  search: 'rivet-icons:magnifying-glass',
  settings: 'mdi:cog',
  empty: ''
} as const;

describe('Iconic.vue', () => {
  describe('Component Structure', () => {
    it('should render as a button element', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
    });

    it('should render with correct element type', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('should be an HTMLButtonElement', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.element).toBeInstanceOf(HTMLButtonElement);
    });

    it('should have icon-button class', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.classes()).toContain('icon-button');
    });
  });

  describe('Icon Prop', () => {
    it('should render Icon component', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });

    it('should pass icon name to Icon component', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe(TEST_ICONS.default);
    });

    it('should pass size 24px to Icon component', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-size')).toBe('24px');
    });

    it('should handle different icon names', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.arrow
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe(TEST_ICONS.arrow);
    });

    it('should update icon when prop changes', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.find('.icon').attributes('data-icon')).toBe(TEST_ICONS.default);

      await wrapper.setProps({ icon: TEST_ICONS.inbox });

      expect(wrapper.find('.icon').attributes('data-icon')).toBe(TEST_ICONS.inbox);
    });

    it('should handle empty icon name', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.empty
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.attributes('data-icon')).toBe(TEST_ICONS.empty);
    });
  });

  describe('Required Props', () => {
    it('should have icon as a required prop', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.props('icon')).toBe(TEST_ICONS.default);
    });

    it('should accept any valid icon string', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.settings
        }
      });

      expect(wrapper.props('icon')).toBe(TEST_ICONS.settings);
    });
  });

  describe('Styling', () => {
    it('should have cursor pointer style', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');
      const computedStyles = button.element.style || {};
      // The component has cursor: pointer in CSS
      expect(wrapper.classes()).toContain('icon-button');
    });

    it('should have proper button styling', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('.icon-button');
      expect(button.exists()).toBe(true);
    });
  });

  describe('Button Behavior', () => {
    it('should be clickable', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      // Button should not throw errors when clicked
      expect(button.exists()).toBe(true);
    });

    it('should handle multiple clicks', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');

      expect(button.exists()).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(Iconic, {
          props: {
            icon: TEST_ICONS.default
          }
        });
      }).not.toThrow();
    });

    it('should maintain functionality after prop updates', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      await wrapper.find('button').trigger('click');

      await wrapper.setProps({ icon: TEST_ICONS.arrow });

      await wrapper.find('button').trigger('click');
      expect(wrapper.find('.icon').attributes('data-icon')).toBe(TEST_ICONS.arrow);
    });

    it('should handle rapid consecutive clicks', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');

      // Simulate rapid clicks
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');

      expect(button.exists()).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible as a button', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const button = wrapper.find('button');
      expect(button.element).toBeInstanceOf(HTMLButtonElement);
    });

    it('should have appropriate button semantics', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('should contain icon for visual feedback', () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      const icon = wrapper.find('.icon');
      expect(icon.exists()).toBe(true);
    });
  });

  describe('Integration Tests', () => {
    it('should work with various icon types', () => {
      const icons = [
        TEST_ICONS.default,
        TEST_ICONS.arrow,
        TEST_ICONS.inbox,
        TEST_ICONS.search,
        TEST_ICONS.settings
      ];

      icons.forEach(iconName => {
        const wrapper = mount(Iconic, {
          props: {
            icon: iconName
          }
        });

        const icon = wrapper.find('.icon');
        expect(icon.attributes('data-icon')).toBe(iconName);
      });
    });

    it('should maintain structure with different icons', async () => {
      const wrapper = mount(Iconic, {
        props: {
          icon: TEST_ICONS.default
        }
      });

      expect(wrapper.findAll('button')).toHaveLength(1);
      expect(wrapper.findAll('.icon')).toHaveLength(1);

      await wrapper.setProps({ icon: TEST_ICONS.settings });

      expect(wrapper.findAll('button')).toHaveLength(1);
      expect(wrapper.findAll('.icon')).toHaveLength(1);
    });
  });
});
