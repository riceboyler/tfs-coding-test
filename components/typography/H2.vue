<template>
  <Box
    as="h2"
    :color="color"
  >
    <slot />
  </Box>
</template>

<script lang="ts" setup>
  import { Box } from "styled-system/jsx";
  defineProps({
    color: { type: String, required: false, default: "var(--black)" },
  });
</script>

<style></style>
