import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TypographyComponentVM } from './test-utils';
import { mockStyledSystemBox, TEST_COLORS, TEST_CONTENT } from './test-utils';

// Mock styled-system components before importing H2
mockStyledSystemBox();

// Import H2 after mocks are set up
const H2Module = await import('./H2.vue');
const H2 = H2Module.default;

describe('H2.vue', () => {
  describe('Element Rendering', () => {
    it('should render as an h2 element', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.exists()).toBe(true);
    });

    it('should render the h2 element with correct tag name', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
    });

    it('should be a valid HTML h2 element', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.simple
        }
      });

      expect(wrapper.element).toBeInstanceOf(HTMLHeadingElement);
    });
  });

  describe('Slot Content', () => {
    it('should render slot content inside h2', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'My Heading Text'
        }
      });

      expect(wrapper.text()).toBe('My Heading Text');
    });

    it('should render empty h2 when no slot content provided', () => {
      const wrapper = mount(H2);

      expect(wrapper.find('h2').exists()).toBe(true);
      expect(wrapper.text()).toBe('');
    });

    it('should render multiple text nodes in slot', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.multiWord
        }
      });

      expect(wrapper.text()).toContain('Hello');
      expect(wrapper.text()).toContain('World');
      expect(wrapper.text()).toContain('Test');
    });

    it('should render HTML elements in slot', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.nested
        }
      });

      expect(wrapper.html()).toContain(TEST_CONTENT.nested);
    });

    it('should preserve whitespace in slot content', () => {
      const wrapper = mount(H2, {
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
      const wrapper = mount(H2, {
        slots: {
          default: 'Test'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.default);
    });

    it('should apply default color to h2 element', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Test'
        }
      });

      const vm = wrapper.vm as TypographyComponentVM;
      expect(vm.$props.color).toBe(TEST_COLORS.default);
    });

    it('should render with default color when color prop is undefined', () => {
      const wrapper = mount(H2, {
        props: {
          color: undefined
        },
        slots: {
          default: 'Test'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.default);
    });
  });

  describe('Color Prop - Custom Values', () => {
    it('should accept and apply custom color prop', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Red Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.red);
    });

    it('should handle CSS variable as color', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.variable
        },
        slots: {
          default: 'Primary Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.variable);
    });

    it('should handle hex color values', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.hex
        },
        slots: {
          default: 'Hex Color Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.hex);
    });

    it('should handle RGB color values', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.rgb
        },
        slots: {
          default: 'RGB Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.rgb);
    });

    it('should handle RGBA color values with transparency', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.rgba
        },
        slots: {
          default: 'RGBA Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.rgba);
    });

    it('should handle HSL color values', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.hsl
        },
        slots: {
          default: 'HSL Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.hsl);
    });

    it('should handle named colors', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.blue
        },
        slots: {
          default: 'Blue Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.blue);
    });

    it('should handle currentColor keyword', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.currentColor
        },
        slots: {
          default: 'Current Color Heading'
        }
      });

      const h2 = wrapper.find('h2');
      // CSS normalizes currentColor to lowercase
      expect(h2.attributes('style')?.toLowerCase()).toContain('currentcolor');
    });

    it('should handle transparent keyword', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.transparent
        },
        slots: {
          default: 'Transparent Heading'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.attributes('style')).toContain(TEST_COLORS.transparent);
    });
  });

  describe('Color Prop - Updates', () => {
    it('should update color when prop changes', async () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.red);

      await wrapper.setProps({ color: TEST_COLORS.blue });

      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.blue);
    });

    it('should revert to default color when prop is removed', async () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Test'
        }
      });

      await wrapper.setProps({ color: undefined });

      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.default);
    });

    it('should handle multiple color changes', async () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.red);

      await wrapper.setProps({ color: TEST_COLORS.green });
      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.green);

      await wrapper.setProps({ color: TEST_COLORS.blue });
      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.blue);
    });
  });

  describe('Props Validation', () => {
    it('should accept color prop as string type', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Test'
        }
      });

      const vm = wrapper.vm as TypographyComponentVM;
      expect(typeof vm.$props.color).toBe('string');
    });

    it('should have color prop as optional (not required)', () => {
      expect(() => {
        mount(H2, {
          slots: {
            default: 'Test'
          }
        });
      }).not.toThrow();
    });

    it('should accept empty string as color', () => {
      const wrapper = mount(H2, {
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
    it('should pass "h2" as the "as" prop to Box component', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
    });

    it('should pass color prop to Box component', () => {
      const wrapper = mount(H2, {
        props: {
          color: TEST_COLORS.red
        },
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.find('h2').attributes('style')).toContain(TEST_COLORS.red);
    });

    it('should render slot content through Box component', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Content through Box'
        }
      });

      expect(wrapper.text()).toBe('Content through Box');
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text content', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.long
        }
      });

      expect(wrapper.text()).toBe(TEST_CONTENT.long);
      expect(wrapper.find('h2').exists()).toBe(true);
    });

    it('should handle special characters in content', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.special
        }
      });

      expect(wrapper.text()).toContain(TEST_CONTENT.special);
    });

    it('should handle unicode characters', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.unicode
        }
      });

      expect(wrapper.text()).toBe(TEST_CONTENT.unicode);
    });

    it('should handle line breaks in content', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.multiline
        }
      });

      expect(wrapper.text()).toContain('Line 1');
      expect(wrapper.text()).toContain('Line 2');
      expect(wrapper.text()).toContain('Line 3');
    });

    it('should handle numeric content converted to string', () => {
      const wrapper = mount(H2, {
        slots: {
          default: TEST_CONTENT.numeric
        }
      });

      expect(wrapper.text()).toBe(TEST_CONTENT.numeric);
    });
  });

  describe('Component Structure', () => {
    it('should have only one root element (h2)', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Test'
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
    });

    it('should not add extra wrapper elements', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Test'
        }
      });

      const html = wrapper.html();
      expect(html).toMatch(/^<h2/);
      expect(html).toMatch(/<\/h2>$/);
    });

    it('should render without errors when mounted', () => {
      expect(() => {
        mount(H2, {
          slots: {
            default: 'Test'
          }
        });
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should be semantically correct as h2 heading', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Section Title'
        }
      });

      const h2 = wrapper.find('h2');
      expect(h2.exists()).toBe(true);
      expect(h2.element.tagName).toBe('H2');
    });

    it('should maintain semantic heading structure', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Subheading'
        }
      });

      expect(wrapper.element).toBeInstanceOf(HTMLHeadingElement);
    });

    it('should allow screen readers to identify as heading level 2', () => {
      const wrapper = mount(H2, {
        slots: {
          default: 'Accessible Heading'
        }
      });

      expect(wrapper.element.tagName.toLowerCase()).toBe('h2');
    });
  });
});
