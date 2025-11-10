import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockStyledSystem, TEST_URLS, TEST_LINK_TEXT, TEST_SLOT_CONTENT } from './test-utils'

// Mock styled-system components before importing StyledLink
mockStyledSystem()

// Import StyledLink after mocks are set up
const StyledLinkModule = await import('./StyledLink.vue')
const StyledLink = StyledLinkModule.default

describe('StyledLink.vue', () => {
  describe('Component Structure', () => {
    it('should render as an anchor element', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
    })

    it('should render with correct element type', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('a')
    })

    it('should be an HTMLAnchorElement', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.element).toBeInstanceOf(HTMLAnchorElement)
    })
  })

  describe('Href Prop', () => {
    it('should set the href attribute', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.attributes('href')).toBe(TEST_URLS.relative)
    })

    it('should handle absolute URLs', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.absolute
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.absolute)
    })

    it('should handle external URLs', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.external
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.external)
    })

    it('should handle URLs with query parameters', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.withQuery
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.withQuery)
    })

    it('should handle URLs with hash fragments', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.withHash
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.withHash)
    })

    it('should handle mailto links', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.mailto
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.mailto)
    })

    it('should handle tel links', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.tel
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.tel)
    })

    it('should handle long URLs', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.long
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.long)
    })

    it('should handle URLs with special characters', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.special
        }
      })

      expect(wrapper.find('a').attributes('href')).toContain('example.com')
    })

    it('should handle URLs with unicode characters', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.unicode
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.unicode)
    })

    it('should update href when prop changes', async () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.relative)

      await wrapper.setProps({ href: TEST_URLS.absolute })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.absolute)
    })
  })

  describe('Slot Content', () => {
    it('should render slot content', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_SLOT_CONTENT.simple
        }
      })

      expect(wrapper.text()).toBe(TEST_SLOT_CONTENT.simple)
    })

    it('should render when slot is empty', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.exists()).toBe(true)
      expect(wrapper.text()).toBe('')
    })

    it('should render short link text', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_LINK_TEXT.short
        }
      })

      expect(wrapper.text()).toBe(TEST_LINK_TEXT.short)
    })

    it('should render long link text', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_LINK_TEXT.long
        }
      })

      expect(wrapper.text()).toBe(TEST_LINK_TEXT.long)
    })

    it('should handle special characters in slot content', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_SLOT_CONTENT.special
        }
      })

      expect(wrapper.text()).toContain(TEST_SLOT_CONTENT.special)
    })

    it('should handle unicode characters in slot content', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_SLOT_CONTENT.unicode
        }
      })

      expect(wrapper.text()).toBe(TEST_SLOT_CONTENT.unicode)
    })

    it('should render HTML in slot content', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_SLOT_CONTENT.html
        }
      })

      expect(wrapper.html()).toContain('span')
    })

    it('should render multiple text nodes in slot', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_SLOT_CONTENT.multiWord
        }
      })

      expect(wrapper.text()).toContain('Multiple')
      expect(wrapper.text()).toContain('Words')
      expect(wrapper.text()).toContain('Here')
    })
  })

  describe('Styling Props', () => {
    it('should apply font styling', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      const style = anchor.attributes('style')
      expect(style).toBeTruthy()
    })

    it('should have font size style', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.attributes('style')).toContain('font')
    })
  })

  describe('Props Combination', () => {
    it('should handle href with slot content', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.absolute
        },
        slots: {
          default: TEST_LINK_TEXT.short
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.absolute)
      expect(wrapper.text()).toBe(TEST_LINK_TEXT.short)
    })

    it('should handle external URL with descriptive text', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.external
        },
        slots: {
          default: 'Visit Google'
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.external)
      expect(wrapper.text()).toBe('Visit Google')
    })
  })

  describe('Edge Cases', () => {
    it('should render without errors', () => {
      expect(() => {
        mount(StyledLink, {
          props: {
            href: TEST_URLS.relative
          }
        })
      }).not.toThrow()
    })

    it('should render without errors with all props and slot', () => {
      expect(() => {
        mount(StyledLink, {
          props: {
            href: TEST_URLS.absolute
          },
          slots: {
            default: TEST_LINK_TEXT.short
          }
        })
      }).not.toThrow()
    })

    it('should maintain functionality after prop updates', async () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_LINK_TEXT.short
        }
      })

      await wrapper.setProps({ href: TEST_URLS.absolute })
      await wrapper.setProps({ href: TEST_URLS.external })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.external)
      expect(wrapper.text()).toBe(TEST_LINK_TEXT.short)
    })

    it('should handle empty href', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.empty
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.empty)
    })
  })

  describe('Accessibility', () => {
    it('should be a semantic anchor element', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.element.tagName).toBe('A')
    })

    it('should have an href attribute for navigation', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.find('a').attributes('href')).toBeTruthy()
    })

    it('should have visible link text', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_LINK_TEXT.short
        }
      })

      expect(wrapper.text()).toBeTruthy()
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('should be keyboard accessible', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.element).toBeInstanceOf(HTMLAnchorElement)
    })
  })

  describe('Required Props', () => {
    it('should have href as a required prop', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.props('href')).toBe(TEST_URLS.relative)
    })

    it('should accept any valid href string', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.mailto
        }
      })

      expect(wrapper.props('href')).toBe(TEST_URLS.mailto)
    })
  })

  describe('Link Behavior', () => {
    it('should be clickable', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        },
        slots: {
          default: TEST_LINK_TEXT.short
        }
      })

      const anchor = wrapper.find('a')
      expect(anchor.element).toBeInstanceOf(HTMLAnchorElement)
    })

    it('should navigate to relative path', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.relative
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.relative)
    })

    it('should navigate to absolute URL', () => {
      const wrapper = mount(StyledLink, {
        props: {
          href: TEST_URLS.absolute
        }
      })

      expect(wrapper.find('a').attributes('href')).toBe(TEST_URLS.absolute)
    })
  })
})
