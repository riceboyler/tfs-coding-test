import { createResolver } from "@nuxt/kit";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    "styled-system": resolve("./styled-system"),
  },
  compatibilityDate: "2025-07-15",
  css: ["@/assets/css/global.css"],
  devtools: { enabled: true },
  eslint: {
    config: {
      stylistic: {
        indent: "tab",
        semi: true,
        arrowParens: true,
        blockSpacing: true,
        jsx: true,
        quoteProps: "always",
        quotes: "double",
      },
    },
  },
  fonts: {
    families: [{ name: "Manrope", provider: "google" }],
  },
  modules: [
    "@nuxt/content",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxt/fonts",
    "@nuxt/eslint",
    "@nuxt/icon",
  ],

  postcss: {
    plugins: {
      "@pandacss/dev/postcss": {},
    },
  },
});