<template>
  <HStack
    justifyContent="center"
    alignItems="center"
    width="100%"
    gap="12px"
    color="var(--gray-767676)"
  >
    <Box
      height="1px"
      flex="1 0 0"
      background="var(--gray-ebebeb)"
      width="100%"
    />
    <slot />
    <Box
      height="1px"
      flex="1 0 0"
      background="var(--gray-ebebeb)"
    />
  </HStack>
</template>

<script lang="ts" setup>
  import { HStack, Box } from "styled-system/jsx";
</script>

<style>
  .hr-lines {
    position: relative;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    color: var(--gray-767676);
  }

  .hr-lines::before,
  .hr-lines::after {
    content: " ";
    display: block;
    height: 2px;
    width: 130px;
    position: absolute;
    top: 50%;
    background: var(--gray-ebebeb);
  }

  .hr-lines::before {
    left: 0;
  }

  .hr-lines::after {
    right: 0;
  }
</style>
