import { defineComponent } from 'vue'
import { vi } from 'vitest'

/**
 * Shared type definitions for typography components
 */
export interface TypographyProps {
  color?: string
}

export interface TypographyComponentVM {
  $props: TypographyProps
}

/**
 * Mock the Box component from styled-system/jsx
 * This should be called before importing any typography components
 */
export function mockStyledSystemBox() {
  vi.mock('styled-system/jsx', () => ({
    Box: defineComponent({
      name: 'Box',
      props: ['as', 'color'],
      template: '<component :is="as" :style="{ color }"><slot /></component>'
    })
  }))
}

/**
 * Common color values for testing
 */
export const TEST_COLORS = {
  default: 'var(--black)',
  red: 'red',
  blue: 'blue',
  green: 'green',
  hex: '#FF5733',
  rgb: 'rgb(255, 87, 51)',
  rgba: 'rgba(255, 87, 51, 0.5)',
  hsl: 'hsl(120, 100%, 50%)',
  variable: 'var(--primary-color)',
  currentColor: 'currentColor',
  transparent: 'transparent'
} as const

/**
 * Common test content strings
 */
export const TEST_CONTENT = {
  simple: 'Test Heading',
  multiWord: 'Hello World Test',
  withSpaces: '  Heading with spaces  ',
  special: '<>&"\'!@#$%^&*()',
  unicode: '你好世界 🌍',
  multiline: 'Line 1\nLine 2\nLine 3',
  numeric: '123456',
  long: 'A'.repeat(10000),
  nested: '<span>Nested Content</span>'
} as const
