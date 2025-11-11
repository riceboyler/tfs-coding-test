import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { mockStyledSystemForButtons, BUTTON_TYPES, BUTTON_TEXT } from '../test-utils';

// Mock styled-system components before importing Primary
mockStyledSystemForButtons();

// Import Primary after mocks are set up
const PrimaryModule = await import('./Primary.vue');
const Primary = PrimaryModule.default;

describe('Primary.vue', () => {
  describe('Button Rendering', () => {
    it('should render as a button element', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
    });

    it('should render with correct element type', () => {
      const wrapper = mount(Primary);

      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
    });

    it('should be an HTMLButtonElement', () => {
      const wrapper = mount(Primary);

      expect(wrapper.element).toBeInstanceOf(HTMLButtonElement);
    });
  });

  describe('Slot Content', () => {
    it('should render slot content when provided', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.default
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.default);
    });

    it('should display custom text in slot', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.custom);
    });

    it('should render when slot is empty', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('should handle empty string in slot', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.empty
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.empty);
    });

    it('should handle long text in slot', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.long
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.long);
    });

    it('should handle special characters in slot', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.special
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.special);
    });

    it('should handle unicode characters in slot', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.unicode
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.unicode);
    });
  });

  describe('Type Prop', () => {
    it('should have type="button" by default', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe(BUTTON_TYPES.button);
    });

    it('should accept type="submit"', () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.submit
        }
      });

      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe(BUTTON_TYPES.submit);
    });

    it('should accept type="reset"', () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.reset
        }
      });

      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe(BUTTON_TYPES.reset);
    });

    it('should accept type="button"', () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.button
        }
      });

      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe(BUTTON_TYPES.button);
    });

    it('should update type when prop changes', async () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.button
        }
      });

      expect(wrapper.find('button').attributes('type')).toBe(BUTTON_TYPES.button);

      await wrapper.setProps({ type: BUTTON_TYPES.submit });

      expect(wrapper.find('button').attributes('type')).toBe(BUTTON_TYPES.submit);
    });
  });

  describe('Action Event', () => {
    it('should emit "action" event when clicked', async () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(wrapper.emitted()).toHaveProperty('action');
    });

    it('should emit "action" event exactly once per click', async () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(wrapper.emitted('action')).toHaveLength(1);
    });

    it('should emit "action" event multiple times when clicked multiple times', async () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');

      expect(wrapper.emitted('action')).toHaveLength(3);
    });

    it('should prevent default behavior on click', async () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      const clickEvent = new Event('click');
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

      button.element.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Styling Props', () => {
    it('should apply cursor pointer style', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.attributes('style')).toContain('pointer');
    });

    it('should have transition style', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.attributes('style')).toContain('transition');
    });
  });

  describe('Props Combination', () => {
    it('should handle both slot content and type props together', () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.submit
        },
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.custom);
      expect(wrapper.find('button').attributes('type')).toBe(BUTTON_TYPES.submit);
    });

    it('should emit action with custom slot content and submit type', async () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.submit
        },
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      const button = wrapper.find('button');
      await button.trigger('click');

      expect(wrapper.emitted('action')).toHaveLength(1);
      expect(wrapper.text()).toBe(BUTTON_TEXT.custom);
      expect(button.attributes('type')).toBe(BUTTON_TYPES.submit);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid consecutive clicks', async () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');

      // Simulate rapid clicks
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');
      await button.trigger('click');

      expect(wrapper.emitted('action')).toHaveLength(5);
    });

    it('should maintain functionality after prop updates', async () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.button
        },
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('action')).toHaveLength(1);

      await wrapper.setProps({ type: BUTTON_TYPES.submit });

      await wrapper.find('button').trigger('click');
      expect(wrapper.emitted('action')).toHaveLength(2);
    });

    it('should render without errors', () => {
      expect(() => {
        mount(Primary);
      }).not.toThrow();
    });

    it('should render without errors with all props', () => {
      expect(() => {
        mount(Primary, {
          props: {
            type: BUTTON_TYPES.submit
          },
          slots: {
            default: BUTTON_TEXT.custom
          }
        });
      }).not.toThrow();
    });
  });

  describe('Component Structure', () => {
    it('should have a single root button element', () => {
      const wrapper = mount(Primary);

      expect(wrapper.element.tagName.toLowerCase()).toBe('button');
      expect(wrapper.findAll('button')).toHaveLength(1);
    });

    it('should contain only text content (no nested elements)', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      const button = wrapper.find('button');
      expect(button.text()).toBe(BUTTON_TEXT.custom);
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible as a button', () => {
      const wrapper = mount(Primary);

      const button = wrapper.find('button');
      expect(button.element).toBeInstanceOf(HTMLButtonElement);
    });

    it('should have appropriate button semantics', () => {
      const wrapper = mount(Primary, {
        props: {
          type: BUTTON_TYPES.submit
        }
      });

      const button = wrapper.find('button');
      expect(button.attributes('type')).toBe(BUTTON_TYPES.submit);
    });

    it('should display visible text for screen readers', () => {
      const wrapper = mount(Primary, {
        slots: {
          default: BUTTON_TEXT.custom
        }
      });

      expect(wrapper.text()).toBe(BUTTON_TEXT.custom);
      expect(wrapper.text().length).toBeGreaterThan(0);
    });
  });
});
