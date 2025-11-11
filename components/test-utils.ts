import { defineComponent } from 'vue'
import { vi } from 'vitest'

/**
 * Shared type definitions for components
 */
export interface StyledLinkProps {
  href: string
}

export interface ComponentVM {
  $props: Record<string, unknown>
}

export interface PrimaryButtonProps {
  text?: string
  type?: 'button' | 'reset' | 'submit' | undefined
}

export interface OauthButtonProps {
  provider: 'google' | 'apple'
}

export interface ButtonComponentVM {
  $props: PrimaryButtonProps | OauthButtonProps
  $emit: (event: string, ...args: unknown[]) => void
}

/**
 * Mock styled-system/jsx components
 * This provides a general mock for styled.a, Box, HStack, and VStack
 */
export function mockStyledSystem() {
  vi.mock('styled-system/jsx', async () => {
    const { defineComponent, h } = await import('vue');

    return {
      styled: {
        a: defineComponent({
          name: 'StyledAnchor',
          props: {
            href: String,
            fontSize: String,
            fontWeight: String,
            lineHeight: String
          },
          render() {
            return h('a', {
              href: this.href,
              style: {
                fontSize: this.fontSize,
                fontWeight: this.fontWeight,
                lineHeight: this.lineHeight
              }
            }, this.$slots.default?.())
          }
        })
      },
      Box: defineComponent({
        name: 'Box',
        props: {
          height: String,
          flex: String,
          background: String,
          width: [String, Object],
          fontWeight: String,
          lineHeight: String,
          color: String,
          as: String,
          backgroundColor: String,
          p: String,
          listStyleType: String,
          listStylePosition: String,
          borderRadius: String,
          minHeight: String,
          px: String,
          py: String,
          position: String,
          top: String,
          display: [String, Object],
          mt: String,
          ml: String,
          pl: String,
          pr: String
        },
        render() {
          return h(this.as || 'div', {
            class: 'box',
            style: {
              height: this.height,
              flex: this.flex,
              background: this.background,
              width: typeof this.width === 'object' ? undefined : this.width,
              fontWeight: this.fontWeight,
              lineHeight: this.lineHeight,
              color: this.color,
              backgroundColor: this.backgroundColor,
              padding: this.p,
              listStyleType: this.listStyleType,
              listStylePosition: this.listStylePosition,
              borderRadius: this.borderRadius,
              minHeight: this.minHeight,
              paddingLeft: this.pl || this.px,
              paddingRight: this.pr || this.px,
              paddingTop: this.py,
              paddingBottom: this.py,
              position: this.position,
              top: this.top,
              marginTop: this.mt,
              marginLeft: this.ml,
              display: typeof this.display === 'object' ? undefined : this.display
            }
          }, this.$slots.default?.())
        }
      }),
      HStack: defineComponent({
        name: 'HStack',
        props: {
          gap: String,
          alignItems: String,
          justifyContent: String,
          width: String,
          color: String,
          fontSize: String,
          fontWeight: String
        },
        render() {
          return h('div', {
            class: 'hstack',
            style: {
              display: 'flex',
              gap: this.gap,
              alignItems: this.alignItems,
              justifyContent: this.justifyContent,
              width: this.width,
              color: this.color,
              fontSize: this.fontSize,
              fontWeight: this.fontWeight
            }
          }, this.$slots.default?.())
        }
      }),
      VStack: defineComponent({
        name: 'VStack',
        props: {
          gap: String,
          alignItems: String,
          justifyContent: String,
          as: String,
          mt: String
        },
        render() {
          return h(this.as || 'div', {
            class: 'vstack',
            style: {
              display: 'flex',
              flexDirection: 'column',
              gap: this.gap,
              alignItems: this.alignItems,
              justifyContent: this.justifyContent,
              marginTop: this.mt
            }
          }, this.$slots.default?.())
        }
      }),
      Flex: defineComponent({
        name: 'Flex',
        props: {
          direction: [String, Object],
          minHeight: String
        },
        render() {
          return h('div', {
            class: 'flex',
            style: {
              display: 'flex',
              flexDirection: typeof this.direction === 'object' ? undefined : this.direction,
              minHeight: this.minHeight
            }
          }, this.$slots.default?.())
        }
      })
    }
  })
}

/**
 * Mock the styled-system/jsx components for buttons
 */
export function mockStyledSystemForButtons() {
  vi.mock('styled-system/jsx', () => ({
    styled: {
      button: defineComponent({
        name: 'StyledButton',
        props: {
          px: String,
          py: String,
          width: [Object, String],
          color: String,
          backgroundColor: String,
          borderRadius: String,
          fontSize: String,
          fontWeight: String,
          minHeight: String,
          minWidth: String,
          cursor: String,
          type: String,
          _hover: Object,
          transition: String,
          border: String,
          display: String,
          flexDirection: String,
          alignItems: String,
          justifyContent: String
        },
        emits: ['click'],
        template: `
          <button
            :type="type"
            @click="$emit('click', $event)"
            :style="{
              padding: px && py ? \`\${py} \${px}\` : undefined,
              color,
              backgroundColor,
              borderRadius,
              fontSize,
              fontWeight,
              minHeight,
              minWidth,
              cursor,
              transition,
              border,
              display,
              flexDirection,
              alignItems,
              justifyContent
            }"
          >
            <slot />
          </button>
        `
      })
    },
    Box: defineComponent({
      name: 'Box',
      props: ['fontWeight', 'lineHeight', 'as', 'color', 'backgroundColor', 'p', 'listStyleType', 'listStylePosition', 'borderRadius'],
      template: '<component :is="as || \'div\'"><slot /></component>'
    }),
    HStack: defineComponent({
      name: 'HStack',
      props: ['alignItems', 'justifyContent', 'fontSize', 'fontWeight'],
      template: '<div><slot /></div>'
    }),
    VStack: defineComponent({
      name: 'VStack',
      props: ['alignItems', 'justifyContent', 'gap', 'as', 'mt'],
      template: '<component :is="as || \'div\'"><slot /></component>'
    })
  }))
}

/**
 * Mock Icon component
 */
export function mockIcon() {
  return defineComponent({
    name: 'Icon',
    props: ['name', 'size'],
    template: '<span :data-icon="name" :data-size="size" class="icon"></span>'
  })
}

/**
 * Mock NuxtImg component
 */
export function mockNuxtImg() {
  vi.mock('#components', () => ({
    NuxtImg: defineComponent({
      name: 'NuxtImg',
      props: ['src', 'alt', 'class'],
      template: '<img :src="src" :alt="alt" :class="class" />'
    })
  }))
}

/**
 * Mock NuxtLink component
 */
export function mockNuxtLink() {
  vi.mock('#components', () => ({
    NuxtLink: defineComponent({
      name: 'NuxtLink',
      props: ['to', 'href', 'class'],
      template: '<a :href="to || href" :class="class"><slot /></a>'
    })
  }))
}

/**
 * Common test URLs
 */
export const TEST_URLS = {
  relative: '/about',
  absolute: 'https://example.com',
  external: 'https://google.com',
  withQuery: 'https://example.com?foo=bar',
  withHash: 'https://example.com#section',
  mailto: 'mailto:test@example.com',
  tel: 'tel:+1234567890',
  long: 'https://example.com/very/long/path/to/some/resource/that/might/be/truncated',
  special: 'https://example.com/path?query=value&other=<script>',
  unicode: 'https://example.com/测试',
  empty: ''
} as const

/**
 * Common test link text
 */
export const TEST_LINK_TEXT = {
  short: 'Link',
  long: 'This is a very long link text that might wrap to multiple lines',
  special: 'Link with <special> characters',
  unicode: '链接 Link 🔗',
  empty: ''
} as const

/**
 * Common test content for slots
 */
export const TEST_SLOT_CONTENT = {
  simple: 'Test Content',
  multiWord: 'Multiple Words Here',
  long: 'This is very long content that might wrap',
  special: '<>&"\'!@#$%^&*()',
  unicode: '测试内容 🎉',
  html: '<span>Nested HTML</span>',
  empty: ''
} as const

/**
 * Common test button types
 */
export const BUTTON_TYPES = {
  button: 'button',
  submit: 'submit',
  reset: 'reset',
  undefined: undefined
} as const

/**
 * Common test strings for buttons
 */
export const BUTTON_TEXT = {
  default: 'Continue',
  custom: 'Click Me',
  short: 'OK',
  long: 'This is a very long button text that might wrap',
  special: 'Submit & Continue',
  unicode: 'Submit 🚀',
  empty: ''
} as const

/**
 * OAuth provider types
 */
export const OAUTH_PROVIDERS = {
  google: 'google',
  apple: 'apple'
} as const

/**
 * OAuth provider details
 */
export const OAUTH_DETAILS = {
  google: {
    text: 'Google',
    icon: 'logos:google-icon'
  },
  apple: {
    text: 'Apple',
    icon: 'logos:apple'
  }
} as const
