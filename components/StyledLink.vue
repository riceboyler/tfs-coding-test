<template>
  <styled.a
    :href="href"
    fontSize="14px"
    fontWeight="600"
    lineHeight="22px"
  >
    <slot />
  </styled.a>
</template>

<script lang="ts" setup>
  import { styled } from "styled-system/jsx";
  defineProps({ href: { type: String, required: true } });
</script>

<style></style>
