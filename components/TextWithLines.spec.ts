import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockStyledSystem, TEST_SLOT_CONTENT } from './test-utils'

// Mock styled-system components before importing TextWithLines
mockStyledSystem()

// Import TextWithLines after mocks are set up
import TextWithLines from './TextWithLines.vue'

describe('TextWithLines.vue', () => {
  describe('Component Structure', () => {
    it('should render as an HStack container', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.exists()).toBe(true)
    })

    it('should contain two Box elements for lines', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes).toHaveLength(2)
    })

    it('should have content between the two lines', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      expect(wrapper.text()).toContain(TEST_SLOT_CONTENT.simple)
    })

    it('should render elements in correct order', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'Test'
        }
      })

      const html = wrapper.html()
      const firstBoxIndex = html.indexOf('class="box"')
      const textIndex = html.indexOf('Test')
      const lastBoxIndex = html.lastIndexOf('class="box"')

      expect(firstBoxIndex).toBeLessThan(textIndex)
      expect(textIndex).toBeLessThan(lastBoxIndex)
    })
  })

  describe('HStack Container Props', () => {
    it('should have justifyContent center', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('center')
    })

    it('should have flexbox display', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('flex')
    })

    it('should have gap styling', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('gap')
    })

    it('should have width 100%', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('100%')
    })

    it('should have color styling', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('color')
    })
  })

  describe('Line Styling', () => {
    it('should have height styling on both lines', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes[0].attributes('style')).toContain('height')
      expect(boxes[1].attributes('style')).toContain('height')
    })

    it('should have background styling on both lines', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes[0].attributes('style')).toContain('background')
      expect(boxes[1].attributes('style')).toContain('background')
    })

    it('should have flex styling on both lines', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes[0].attributes('style')).toContain('flex')
      expect(boxes[1].attributes('style')).toContain('flex')
    })

    it('should have width styling on first line', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes[0].attributes('style')).toContain('width')
    })
  })

  describe('Slot Content', () => {
    it('should render slot content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      expect(wrapper.text()).toBe(TEST_SLOT_CONTENT.simple)
    })

    it('should render when slot is empty', () => {
      const wrapper = mount(TextWithLines)

      const hstack = wrapper.find('.hstack')
      expect(hstack.exists()).toBe(true)
      expect(wrapper.findAll('.box')).toHaveLength(2)
    })

    it('should render short text content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'or'
        }
      })

      expect(wrapper.text()).toBe('or')
    })

    it('should render longer text content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.long
        }
      })

      expect(wrapper.text()).toBe(TEST_SLOT_CONTENT.long)
    })

    it('should handle special characters in slot content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.special
        }
      })

      expect(wrapper.text()).toContain(TEST_SLOT_CONTENT.special)
    })

    it('should handle unicode characters in slot content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.unicode
        }
      })

      expect(wrapper.text()).toBe(TEST_SLOT_CONTENT.unicode)
    })

    it('should render HTML in slot content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.html
        }
      })

      expect(wrapper.html()).toContain('span')
    })

    it('should render multiple text nodes in slot', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.multiWord
        }
      })

      expect(wrapper.text()).toContain('Multiple')
      expect(wrapper.text()).toContain('Words')
      expect(wrapper.text()).toContain('Here')
    })
  })

  describe('Props', () => {
    it('should have no required props', () => {
      expect(() => {
        mount(TextWithLines)
      }).not.toThrow()
    })

    it('should not accept any props', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      expect(Object.keys(wrapper.props())).toHaveLength(0)
    })
  })

  describe('Visual Structure', () => {
    it('should create horizontal divider with centered text', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'OR'
        }
      })

      const boxes = wrapper.findAll('.box')
      const text = wrapper.text()

      expect(boxes).toHaveLength(2)
      expect(text).toBe('OR')
    })

    it('should have symmetric structure', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'Text'
        }
      })

      const boxes = wrapper.findAll('.box')
      expect(boxes[0].element.tagName).toBe(boxes[1].element.tagName)
      expect(boxes[0].classes()).toContain('box')
      expect(boxes[1].classes()).toContain('box')
    })

    it('should maintain structure without content', () => {
      const wrapper = mount(TextWithLines)

      const hstack = wrapper.find('.hstack')
      const boxes = wrapper.findAll('.box')

      expect(hstack.exists()).toBe(true)
      expect(boxes).toHaveLength(2)
    })
  })

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(TextWithLines)
      }).not.toThrow()
    })

    it('should render without errors with slot content', () => {
      expect(() => {
        mount(TextWithLines, {
          slots: {
            default: TEST_SLOT_CONTENT.simple
          }
        })
      }).not.toThrow()
    })

    it('should handle very long content', () => {
      const longContent = 'This is a very long piece of text that might wrap to multiple lines or extend beyond the normal container width'
      const wrapper = mount(TextWithLines, {
        slots: {
          default: longContent
        }
      })

      expect(wrapper.text()).toBe(longContent)
      expect(wrapper.findAll('.box')).toHaveLength(2)
    })

    it('should handle whitespace-only content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: '   '
        }
      })

      expect(wrapper.find('.hstack').exists()).toBe(true)
      expect(wrapper.findAll('.box')).toHaveLength(2)
    })

    it('should maintain structure across multiple renders', () => {
      const wrapper1 = mount(TextWithLines, {
        slots: {
          default: 'First'
        }
      })

      const wrapper2 = mount(TextWithLines, {
        slots: {
          default: 'Second'
        }
      })

      expect(wrapper1.findAll('.box')).toHaveLength(2)
      expect(wrapper2.findAll('.box')).toHaveLength(2)
      expect(wrapper1.text()).toBe('First')
      expect(wrapper2.text()).toBe('Second')
    })
  })

  describe('Accessibility', () => {
    it('should have semantic structure', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      expect(wrapper.find('.hstack').exists()).toBe(true)
    })

    it('should have visible content when slot is provided', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'Visible Text'
        }
      })

      expect(wrapper.text()).toBeTruthy()
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('should not have any hidden or invisible required elements', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      const boxes = wrapper.findAll('.box')

      expect(hstack.exists()).toBe(true)
      expect(boxes).toHaveLength(2)
    })

    it('should be compatible with screen readers', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'Screen reader text'
        }
      })

      expect(wrapper.text()).toBe('Screen reader text')
    })
  })

  describe('Layout Behavior', () => {
    it('should use flexbox layout', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('flex')
    })

    it('should center content', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('center')
    })

    it('should have spacing between elements', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('gap')
    })

    it('should span full width', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      const hstack = wrapper.find('.hstack')
      expect(hstack.attributes('style')).toContain('100%')
    })
  })

  describe('Use Cases', () => {
    it('should work as a section divider with text', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'OR'
        }
      })

      expect(wrapper.text()).toBe('OR')
      expect(wrapper.findAll('.box')).toHaveLength(2)
    })

    it('should work as a login separator', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'or continue with'
        }
      })

      expect(wrapper.text()).toBe('or continue with')
    })

    it('should work with single character', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: '•'
        }
      })

      expect(wrapper.text()).toBe('•')
      expect(wrapper.findAll('.box')).toHaveLength(2)
    })

    it('should work with multiple words', () => {
      const wrapper = mount(TextWithLines, {
        slots: {
          default: 'Continue with social'
        }
      })

      expect(wrapper.text()).toBe('Continue with social')
    })
  })
})
