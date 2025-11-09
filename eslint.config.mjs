// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt().overrideRules({
// Your custom configs here
  "vue/attribute-hyphenation": "off",
  "vue/require-default-prop": "off",
  "vue/max-attributes-per-line": [
    "error",
    {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    },
  ],
});
