import { defineComponent, ref, computed } from 'vue'
import { vi } from 'vitest'

/**
 * Mock styled-system/jsx components for login components
 */
export function mockStyledSystemForLogin() {
  vi.mock('styled-system/jsx', () => ({
    Box: defineComponent({
      name: 'Box',
      props: {
        color: String,
        width: [String, Object],
        display: [String, Object],
        minHeight: String,
        background: String,
        pt: String,
        pl: String,
        backgroundPosition: String,
        height: String,
        flexShrink: [String, Number],
        aspectRatio: String,
        position: String,
        bottom: String,
        left: String,
        as: String,
        backgroundColor: String,
        p: String,
        listStyleType: String,
        listStylePosition: String,
        borderRadius: String
      },
      template: `
        <component
          :is="as || 'div'"
          class="box"
          :style="{
            color,
            width: typeof width === 'object' ? undefined : width,
            display: typeof display === 'object' ? undefined : display,
            minHeight,
            background,
            paddingTop: pt,
            paddingLeft: pl,
            backgroundPosition,
            height,
            flexShrink,
            aspectRatio,
            position,
            bottom,
            left,
            backgroundColor,
            padding: p,
            listStyleType,
            listStylePosition,
            borderRadius
          }"
        >
          <slot />
        </component>
      `
    }),
    HStack: defineComponent({
      name: 'HStack',
      props: {
        fontSize: String,
        fontWeight: String,
        gap: String,
        alignItems: String,
        justifyContent: String
      },
      template: `
        <div
          class="hstack"
          :style="{
            display: 'flex',
            fontSize,
            fontWeight,
            gap,
            alignItems,
            justifyContent
          }"
        >
          <slot />
        </div>
      `
    }),
    VStack: defineComponent({
      name: 'VStack',
      props: {
        justifyContent: String,
        alignItems: String,
        gap: String,
        as: String,
        mt: String
      },
      template: `
        <component
          :is="as || 'div'"
          class="vstack"
          :style="{
            display: 'flex',
            flexDirection: 'column',
            justifyContent,
            alignItems,
            gap,
            marginTop: mt
          }"
        >
          <slot />
        </component>
      `
    })
  }))
}

/**
 * Mock StyledLink component
 */
export function mockStyledLink() {
  return defineComponent({
    name: 'StyledLink',
    props: ['href'],
    template: '<a :href="href" class="styled-link"><slot /></a>'
  })
}

/**
 * Mock FormInputWithLabel component
 */
export function mockFormInputWithLabel() {
  return defineComponent({
    name: 'FormInputWithLabel',
    props: {
      modelValue: String,
      fieldName: String,
      labelText: String,
      inputType: {
        type: String,
        default: 'text'
      }
    },
    emits: ['update:modelValue'],
    template: `
      <div class="form-input-with-label" :data-field="fieldName">
        <label :for="fieldName">{{ labelText }}</label>
        <input
          :id="fieldName"
          :name="fieldName"
          :type="inputType"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          class="form-input"
        />
      </div>
    `
  })
}

/**
 * Mock ButtonsPrimary component
 */
export function mockButtonsPrimary() {
  return defineComponent({
    name: 'ButtonsPrimary',
    props: {
      text: String,
      type: {
        type: String,
        default: 'button'
      }
    },
    emits: ['action'],
    template: `
      <button
        :type="type"
        @click="$emit('action')"
        class="primary-button"
      >
        {{ text }}
      </button>
    `
  })
}

/**
 * Mock TypographyH1 component
 */
export function mockTypographyH1() {
  return defineComponent({
    name: 'TypographyH1',
    props: ['color'],
    template: '<h1 :style="{ color }" class="typography-h1"><slot /></h1>'
  })
}

/**
 * Mock Nuxt composables
 */
export function mockNuxtComposables() {
  const mockRouter = {
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    currentRoute: ref({ path: '/' })
  }

  // Mock useRouter
  global.useRouter = vi.fn(() => mockRouter)

  // Mock ref and computed (these are from Vue, but need to be global)
  global.ref = ref
  global.computed = computed

  return { mockRouter }
}

/**
 * Test data for login form
 */
export const TEST_CREDENTIALS = {
  validUsername: 'testuser',
  validPassword: 'password123',
  emptyUsername: '',
  emptyPassword: '',
  longUsername: 'a'.repeat(100),
  specialUsername: 'test@user.com',
  unicodeUsername: '测试用户'
} as const

/**
 * Test data for errors
 */
export const TEST_ERRORS = {
  usernameRequired: 'Username is required',
  passwordRequired: 'Password is required',
  invalidCredentials: 'Invalid credentials'
} as const

/**
 * Test data for links
 */
export const TEST_LINKS = {
  createAccount: '#',
  forgotPassword: '/forgot-password',
  home: '/'
} as const

/**
 * Test data for sidebar content
 */
export const TEST_SIDEBAR = {
  welcomeText: 'Welcome Back',
  logoPath: './images/aw-logo-transparent.png'
} as const
