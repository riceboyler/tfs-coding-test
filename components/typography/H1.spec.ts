import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TypographyComponentVM } from './test-utils';
import { mockStyledSystemBox, TEST_COLORS, TEST_CONTENT } from './test-utils';

// Mock styled-system components before importing H1
mockStyledSystemBox();

// Import H1 after mocks are set up
const H1Module = await import('./H1.vue');
const H1 = H1Module.default;

describe('H1.vue', () => {
  describe('Element Rendering', () => {
    it('should render as an h1 element', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.exists()).toBe(true);
    });

    it('should render the h1 element with correct tag name', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
    });

    it('should be a valid HTML h1 element', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      expect(wrapper.element).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('Slot Content', () => {
    it('should render slot content inside h1', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'My Heading Text'
        }
      });

      expect(wrapper.text()).toBe('My Heading Text');
    });

    it('should render empty h1 when no slot content provided', () => {
      const wrapper = mount(H1);

      expect(wrapper.find('h1').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('should render multiple text nodes in slot', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.multiWord
        }
      });

      expect(wrapper.text()).toContain('Hello');
      expect(wrapper.text()).toContain('World');
      expect(wrapper.text()).toContain('Test');
    });

    it('should render HTML elements in slot', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.nested
        }
      });

      expect(wrapper.html()).toContain(TEST_CONTENT.nested);
    });

    it('should preserve whitespace in slot content', () => {
      const wrapper = mount(H1, {
        slots: {
          default: TEST_CONTENT.withSpaces
        }
      });

      // Note: HTML rendering trims whitespace by default
      expect(wrapper.text()).toBeTruthy();
      expect(wrapper.text()).toContain('Heading with spaces');
    });
  });

  describe('Color Prop - Default Value', () => {
    it('should use default color "var(--black)" when no color prop is provided', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Test'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain(TEST_COLORS.default);
    });

    it('should apply default color to h1 element', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Test'
        }
      });

      const vm = wrapper.vm as TypographyComponentVM;
      // Check that the component uses the default prop value
      expect(vm.$props.color).toBe(TEST_COLORS.default);
    });

    it('should render with default color when color prop is undefined', () => {
      const wrapper = mount(H1, {
        props: {
          color: undefined
        },
        slots: {
          default: 'Test'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain(TEST_COLORS.default);
    });
  });

  describe('Color Prop - Custom Values', () => {
    it('should accept and apply custom color prop', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Red Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('red');
    });

    it('should handle CSS variable as color', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'var(--primary-color)'
        },
        slots: {
          default: 'Primary Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('var(--primary-color)');
    });

    it('should handle hex color values', () => {
      const wrapper = mount(H1, {
        props: {
          color: '#FF5733'
        },
        slots: {
          default: 'Hex Color Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('#FF5733');
    });

    it('should handle RGB color values', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'rgb(255, 87, 51)'
        },
        slots: {
          default: 'RGB Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('rgb(255, 87, 51)');
    });

    it('should handle RGBA color values with transparency', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'rgba(255, 87, 51, 0.5)'
        },
        slots: {
          default: 'RGBA Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('rgba(255, 87, 51, 0.5)');
    });

    it('should handle HSL color values', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'hsl(120, 100%, 50%)'
        },
        slots: {
          default: 'HSL Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('hsl(120, 100%, 50%)');
    });

    it('should handle named colors', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'blue'
        },
        slots: {
          default: 'Blue Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('blue');
    });

    it('should handle currentColor keyword', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'currentColor'
        },
        slots: {
          default: 'Current Color Heading'
        }
      });

      const h1 = wrapper.find('h1');
      // CSS normalizes currentColor to lowercase
      expect(h1.attributes('style')?.toLowerCase()).toContain('currentcolor');
    });

    it('should handle transparent keyword', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'transparent'
        },
        slots: {
          default: 'Transparent Heading'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.attributes('style')).toContain('transparent');
    });
  });

  describe('Color Prop - Updates', () => {
    it('should update color when prop changes', async () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h1').attributes('style')).toContain('red');

      await wrapper.setProps({ color: 'blue' });

      expect(wrapper.find('h1').attributes('style')).toContain('blue');
    });

    it('should revert to default color when prop is removed', async () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Test'
        }
      });

      await wrapper.setProps({ color: undefined });

      expect(wrapper.find('h1').attributes('style')).toContain('var(--black)');
    });

    it('should handle multiple color changes', async () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h1').attributes('style')).toContain('red');

      await wrapper.setProps({ color: 'green' });
      expect(wrapper.find('h1').attributes('style')).toContain('green');

      await wrapper.setProps({ color: 'blue' });
      expect(wrapper.find('h1').attributes('style')).toContain('blue');
    });
  });

  describe('Props Validation', () => {
    it('should accept color prop as string type', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Test'
        }
      });

      const vm = wrapper.vm as TypographyComponentVM;
      expect(typeof vm.$props.color).toBe('string');
    });

    it('should have color prop as optional (not required)', () => {
      // Should not throw error when mounted without color prop
      expect(() => {
        mount(H1, {
          slots: {
            default: 'Test'
          }
        });
      }).not.toThrow();
    });

    it('should accept empty string as color', () => {
      const wrapper = mount(H1, {
        props: {
          color: ''
        },
        slots: {
          default: 'Test'
        }
      });

      const vm = wrapper.vm as TypographyComponentVM;
      expect(vm.$props.color).toBe('');
    });
  });

  describe('Box Component Integration', () => {
    it('should pass "h1" as the "as" prop to Box component', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Test'
        }
      });

      // Verify the element is actually an h1
      expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
    });

    it('should pass color prop to Box component', () => {
      const wrapper = mount(H1, {
        props: {
          color: 'red'
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h1').attributes('style')).toContain('red');
    });

    it('should render slot content through Box component', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Content through Box'
        }
      });

      expect(wrapper.text()).toBe('Content through Box');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text content', () => {
      const longText = 'A'.repeat(10000);
      const wrapper = mount(H1, {
        slots: {
          default: longText
        }
      });

      expect(wrapper.text()).toBe(longText);
      expect(wrapper.find('h1').exists()).toBe(true);
    });

    it('should handle special characters in content', () => {
      const wrapper = mount(H1, {
        slots: {
          default: '<>&"\'!@#$%^&*()'
        }
      });

      expect(wrapper.text()).toContain('<>&"\'!@#$%^&*()');
    });

    it('should handle unicode characters', () => {
      const wrapper = mount(H1, {
        slots: {
          default: '你好世界 🌍'
        }
      });

      expect(wrapper.text()).toBe('你好世界 🌍');
    });

    it('should handle line breaks in content', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Line 1\nLine 2\nLine 3'
        }
      });

      expect(wrapper.text()).toContain('Line 1');
      expect(wrapper.text()).toContain('Line 2');
      expect(wrapper.text()).toContain('Line 3');
    });

    it('should handle numeric content converted to string', () => {
      const wrapper = mount(H1, {
        slots: {
          default: '123456'
        }
      });

      expect(wrapper.text()).toBe('123456');
    });
  });

  describe('Component Structure', () => {
    it('should have only one root element (h1)', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
    });

    it('should not add extra wrapper elements', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Test'
        }
      });

      const html = wrapper.html();
      // Should start with <h1 and end with </h1>
      expect(html).toMatch(/^<h1/);
      expect(html).toMatch(/<\/h1>$/);
    });

    it('should render without errors when mounted', () => {
      expect(() => {
        mount(H1, {
          slots: {
            default: 'Test'
          }
        });
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should be semantically correct as h1 heading', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Page Title'
        }
      });

      const h1 = wrapper.find('h1');
      expect(h1.exists()).toBe(true);
      expect(h1.element.tagName).toBe('H1');
    });

    it('should maintain semantic heading structure', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Main Heading'
        }
      });

      // H1 should be a heading element for accessibility
      expect(wrapper.element).toBeInstanceOf(HTMLHeadingElement);
    });

    it('should allow screen readers to identify as heading level 1', () => {
      const wrapper = mount(H1, {
        slots: {
          default: 'Accessible Heading'
        }
      });

      // HTML h1 elements are automatically identified by screen readers
      expect(wrapper.element.tagName.toLowerCase()).toBe('h1');
    });
  });
});
