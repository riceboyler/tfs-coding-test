<script setup lang="ts">
  import { Center, Flex } from "styled-system/jsx";
</script>

<template>
  <Flex
    :direction="{ base: 'column', md: 'row' }"
    minHeight="100vh"
  >
    <LoginLayoutSidebar />
    <Center
      width="100%"
      minHeight="100vh"
    >
      <slot />
    </Center>
  </Flex>
</template>
