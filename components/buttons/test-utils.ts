import { defineComponent } from 'vue'
import { vi } from 'vitest'

/**
 * Shared type definitions for button components
 */
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
          border: String
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
              border
            }"
          >
            <slot />
          </button>
        `
      })
    },
    Box: defineComponent({
      name: 'Box',
      props: ['fontWeight', 'lineHeight'],
      template: '<div><slot /></div>'
    }),
    HStack: defineComponent({
      name: 'HStack',
      props: ['alignItems', 'justifyContent'],
      template: '<div><slot /></div>'
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
