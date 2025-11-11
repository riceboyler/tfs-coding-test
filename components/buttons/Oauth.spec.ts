import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { mockStyledSystemForButtons, mockIcon, OAUTH_PROVIDERS, OAUTH_DETAILS } from '../test-utils'

// Mock styled-system components before importing Oauth
mockStyledSystemForButtons()

// Import Oauth after mocks are set up
const OauthModule = await import('./Oauth.vue')
const Oauth = OauthModule.default

describe('Oauth.vue', () => {
  describe('Button Rendering', () => {
    it('should render as a button element', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const button = wrapper.find('button')
      expect(button.exists()).toBe(true)
    })

    it('should render with correct element type', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('button')
    })

    it('should be an HTMLButtonElement', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.element).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe('Google Provider', () => {
    it('should render with google provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should display "Google" text for google provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.text()).toContain(OAUTH_DETAILS.google.text)
    })

    it('should render google icon', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('data-icon')).toBe(OAUTH_DETAILS.google.icon)
    })

    it('should have correct icon name for google', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-icon')).toBe('logos:google-icon')
    })

    it('should have correct icon size for google', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-size')).toBe('24px')
    })
  })

  describe('Apple Provider', () => {
    it('should render with apple provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should display "Apple" text for apple provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.text()).toContain(OAUTH_DETAILS.apple.text)
    })

    it('should render apple icon', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('data-icon')).toBe(OAUTH_DETAILS.apple.icon)
    })

    it('should have correct icon name for apple', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-icon')).toBe('logos:apple')
    })

    it('should have correct icon size for apple', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-size')).toBe('24px')
    })
  })

  describe('Provider Comparison', () => {
    it('should render different content for google vs apple provider', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.text()).toContain(OAUTH_DETAILS.google.text)
      expect(googleWrapper.find('.icon').attributes('data-icon')).toBe(OAUTH_DETAILS.google.icon)

      expect(appleWrapper.text()).toContain(OAUTH_DETAILS.apple.text)
      expect(appleWrapper.find('.icon').attributes('data-icon')).toBe(OAUTH_DETAILS.apple.icon)
    })

    it('should have different icon names for different providers', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.find('.icon').attributes('data-icon')).not.toBe(
        appleWrapper.find('.icon').attributes('data-icon')
      )
    })

    it('should use correct icon for each provider', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.find('.icon').attributes('data-icon')).toBe(OAUTH_DETAILS.google.icon)
      expect(appleWrapper.find('.icon').attributes('data-icon')).toBe(OAUTH_DETAILS.apple.icon)
    })
  })

  describe('Styling Props', () => {
    it('should apply cursor pointer style', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const button = wrapper.find('button')
      expect(button.attributes('style')).toContain('pointer')
    })

    it('should have transition style', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const button = wrapper.find('button')
      expect(button.attributes('style')).toContain('transition')
    })

    it('should have border style', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const button = wrapper.find('button')
      expect(button.attributes('style')).toContain('border')
    })
  })

  describe('Component Structure', () => {
    it('should have a single root button element', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.element.tagName.toLowerCase()).toBe('button')
      expect(wrapper.findAll('button')).toHaveLength(1)
    })

    it('should contain an icon element', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.find('.icon').exists()).toBe(true)
    })

    it('should contain provider text', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.text()).toBeTruthy()
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('should render HStack for layout', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      // HStack is rendered as a div in our mock
      expect(wrapper.find('div').exists()).toBe(true)
    })
  })

  describe('Edge Cases', () => {
    it('should render without errors for google provider', () => {
      expect(() => {
        mount(Oauth, {
          props: {
            provider: OAUTH_PROVIDERS.google
          },
          global: {
            components: {
              Icon: mockIcon()
            }
          }
        })
      }).not.toThrow()
    })

    it('should render without errors for apple provider', () => {
      expect(() => {
        mount(Oauth, {
          props: {
            provider: OAUTH_PROVIDERS.apple
          },
          global: {
            components: {
              Icon: mockIcon()
            }
          }
        })
      }).not.toThrow()
    })

    it('should maintain correct content throughout component lifecycle', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.text()).toContain(OAUTH_DETAILS.google.text)
      expect(appleWrapper.text()).toContain(OAUTH_DETAILS.apple.text)
    })

    it('should consistently render the same provider content', () => {
      const wrapper1 = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const wrapper2 = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper1.text()).toBe(wrapper2.text())
      expect(wrapper1.find('.icon').attributes('data-icon')).toBe(wrapper2.find('.icon').attributes('data-icon'))
    })
  })

  describe('Accessibility', () => {
    it('should be keyboard accessible as a button', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const button = wrapper.find('button')
      expect(button.element).toBeInstanceOf(HTMLButtonElement)
    })

    it('should have an icon for visual identification', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('data-icon')).toBeTruthy()
    })

    it('should display visible text for screen readers', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.text()).toBeTruthy()
      expect(wrapper.text().length).toBeGreaterThan(0)
    })

    it('should have meaningful content for both providers', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.text()).toContain('Google')
      expect(appleWrapper.text()).toContain('Apple')
    })
  })

  describe('Icon Details Logic', () => {
    it('should compute correct icon details for google provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-icon')).toBe('logos:google-icon')
      expect(wrapper.text()).toContain('Google')
    })

    it('should compute correct icon details for apple provider', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const icon = wrapper.find('.icon')
      expect(icon.attributes('data-icon')).toBe('logos:apple')
      expect(wrapper.text()).toContain('Apple')
    })

    it('should use provider prop to determine icon details', () => {
      const googleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      const appleWrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(googleWrapper.find('.icon').attributes('data-icon')).not.toBe(
        appleWrapper.find('.icon').attributes('data-icon')
      )
    })
  })

  describe('Required Props', () => {
    it('should have provider as a required prop', () => {
      // This test validates that the component expects a provider prop
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.props('provider')).toBe(OAUTH_PROVIDERS.google)
    })

    it('should accept google as a valid provider value', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.google
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.props('provider')).toBe('google')
    })

    it('should accept apple as a valid provider value', () => {
      const wrapper = mount(Oauth, {
        props: {
          provider: OAUTH_PROVIDERS.apple
        },
        global: {
          components: {
            Icon: mockIcon()
          }
        }
      })

      expect(wrapper.props('provider')).toBe('apple')
    })
  })
})
