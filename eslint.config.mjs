// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrideRules({
  // Your custom configs here
  "@stylistic/indent": "off",
  "@stylistic/quote-props": "off",
  "vue/attribute-hyphenation": "off",
  "vue/html-indent": "off",
  "vue/html-self-closing": "off",
  "vue/multi-word-component-names": "off",
  "vue/require-default-prop": "off",
  "vue/singleline-html-element-content-newline": "off",
  "vue/max-attributes-per-line": [
    "error",
    {
      "singleline": {
        "max": 1,
      },
      "multiline": {
        "max": 1,
      },
    },
  ],
});
