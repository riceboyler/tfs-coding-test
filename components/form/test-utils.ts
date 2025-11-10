import { defineComponent } from 'vue'
import { vi } from 'vitest'

/**
 * Shared type definitions for form components
 */
export interface InputWithLabelProps {
  labelText: string
  fieldName: string
  inputType?: 'text' | 'password' | 'number'
  placeholder?: string
  modelValue?: string
}

export interface FormComponentVM {
  $props: InputWithLabelProps
}

/**
 * Mock the styled-system/jsx components for form components
 */
export function mockStyledSystemForForm() {
  vi.mock('styled-system/jsx', () => ({
    styled: {
      label: defineComponent({
        name: 'StyledLabel',
        props: {
          fontSize: String,
          fontWeight: String,
          lineHeight: String,
          for: String
        },
        template: `
          <label
            :for="$props.for"
            :style="{
              fontSize,
              fontWeight,
              lineHeight
            }"
          >
            <slot />
          </label>
        `
      }),
      input: defineComponent({
        name: 'StyledInput',
        props: {
          name: String,
          type: String,
          px: String,
          py: String,
          border: String,
          borderColor: String,
          borderRadius: String,
          width: [Object, String],
          placeholder: String,
          modelValue: String
        },
        emits: ['update:modelValue'],
        template: `
          <input
            :name="name"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            :style="{
              padding: px && py ? \`\${py} \${px}\` : undefined,
              border,
              borderColor,
              borderRadius
            }"
          />
        `
      })
    },
    VStack: defineComponent({
      name: 'VStack',
      props: ['gap', 'alignItems'],
      template: '<div class="vstack"><slot /></div>'
    })
  }))
}

/**
 * Common input types
 */
export const INPUT_TYPES = {
  text: 'text',
  password: 'password',
  number: 'number'
} as const

/**
 * Common test strings for form inputs
 */
export const TEST_INPUT_VALUES = {
  short: 'test',
  email: 'user@example.com',
  password: 'SecurePass123!',
  long: 'This is a very long input value that might exceed normal field lengths',
  number: '12345',
  special: '<script>alert("xss")</script>',
  unicode: '测试 🎉',
  empty: '',
  spaces: '   ',
  multiline: 'Line 1\nLine 2'
} as const

/**
 * Common label text values
 */
export const TEST_LABELS = {
  email: 'Email',
  password: 'Password',
  username: 'Username',
  age: 'Age',
  long: 'This is a very long label text that might wrap',
  special: 'Label with <special> characters',
  unicode: '用户名 Username'
} as const

/**
 * Common field name values
 */
export const TEST_FIELD_NAMES = {
  email: 'email',
  password: 'password',
  username: 'username',
  age: 'age',
  firstName: 'firstName',
  lastName: 'lastName'
} as const

/**
 * Common placeholder values
 */
export const TEST_PLACEHOLDERS = {
  email: 'Enter your email',
  password: 'Enter your password',
  custom: 'Type here...',
  long: 'This is a very long placeholder text that might be truncated',
  empty: ''
} as const
