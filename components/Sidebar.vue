<template>
  <Box
    :width="{ base: '0%', md: isLogin ? '415px' : '233px' }"
    :display="{ base: 'none', md: 'block' }"
    minHeight="100vh"
    px="16px"
    py="24px"
    :background="
      isLogin
        ? 'linear-gradient(139deg, var(--dark-blue), var(--light-blue) 88.24%)'
        : 'var(--dark-blue)'
    "
    position="fixed"
    top="0"
  >
    <slot />
  </Box>
</template>

<script lang="ts" setup>
  import { Box } from "styled-system/jsx";

  defineProps({ isLogin: { type: Boolean, required: false, default: false } });
</script>

<style></style>
