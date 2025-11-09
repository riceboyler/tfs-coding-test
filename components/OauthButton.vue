<template>
  <styled.button
    border="solid 1px var(--black)"
    borderRadius="12px"
    px="20px"
    minHeight="52px"
  >
    {{ provider }}
    <HStack :if="provider === 'apple'">
      <NuxtImg
        src="./images/apple-logo.svg"
        alt="Apple Logo"
      />
      <Box
        fontWeight="bold"
        lineHeight="14px"
      >
        Apple
      </Box>
    </HStack>
    <HStack :if="provider === 'google'">
      <NuxtImg
        src="./images/google-logo.svg"
        alt="Apple Logo"
      />
      <Box
        fontWeight="bold"
        lineHeight="14px"
      >
        Google
      </Box>
    </HStack>
  </styled.button>
</template>

<script lang="ts" setup>
  import { Box, HStack, styled } from "styled-system/jsx";
  type Store = "google" | "apple";
  defineProps({
    provider: { type: String as PropType<Store>, required: true },
  });
</script>

<style></style>
