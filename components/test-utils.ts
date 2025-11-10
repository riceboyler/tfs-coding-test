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

/**
 * Mock styled-system/jsx components
 * This provides a general mock for styled.a, Box, and HStack
 */
export function mockStyledSystem() {
  vi.mock('styled-system/jsx', () => ({
    styled: {
      a: defineComponent({
        name: 'StyledAnchor',
        props: {
          href: String,
          fontSize: String,
          fontWeight: String,
          lineHeight: String
        },
        template: `
          <a
            :href="href"
            :style="{
              fontSize,
              fontWeight,
              lineHeight
            }"
          >
            <slot />
          </a>
        `
      })
    },
    Box: defineComponent({
      name: 'Box',
      props: {
        height: String,
        flex: String,
        background: String,
        width: String,
        fontWeight: String,
        lineHeight: String
      },
      template: `
        <div
          class="box"
          :style="{
            height,
            flex,
            background,
            width,
            fontWeight,
            lineHeight
          }"
        >
          <slot />
        </div>
      `
    }),
    HStack: defineComponent({
      name: 'HStack',
      props: {
        gap: String,
        alignItems: String,
        justifyContent: String,
        width: String,
        color: String
      },
      template: `
        <div
          class="hstack"
          :style="{
            display: 'flex',
            gap,
            alignItems,
            justifyContent,
            width,
            color
          }"
        >
          <slot />
        </div>
      `
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
