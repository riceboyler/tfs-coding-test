import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

// Global Icon component mock
const IconMock = defineComponent({
  name: 'Icon',
  props: {
    name: String,
    size: String,
    class: String
  },
  render() {
    return h('span', {
      'data-icon': this.name,
      'data-size': this.size,
      class: 'icon'
    })
  }
})

// Global NuxtLink component mock
const NuxtLinkMock = defineComponent({
  name: 'NuxtLink',
  props: {
    to: [String, Object],
    href: String,
    class: String
  },
  render() {
    return h('a', {
      href: this.href,
      class: this.class
    }, this.$slots.default?.())
  }
})

// Global NuxtImg component mock
const NuxtImgMock = defineComponent({
  name: 'NuxtImg',
  props: {
    src: String,
    alt: String,
    class: String
  },
  render() {
    return h('img', {
      src: this.src,
      alt: this.alt,
      class: this.class
    })
  }
})

// Register global component stubs
config.global.stubs = {
  Icon: IconMock,
  NuxtLink: NuxtLinkMock,
  NuxtImg: NuxtImgMock
}

// Stub global Nuxt composables
vi.stubGlobal('useRouter', vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn()
})))

vi.stubGlobal('useRoute', vi.fn(() => ({
  path: '/',
  params: {},
  query: {}
})))

vi.stubGlobal('navigateTo', vi.fn())
