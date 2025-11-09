<template>
  <Box
    :width="{ base: '0%', md: '415px' }"
    :display="{ base: 'none', md: 'block' }"
    minHeight="100vh"
    background="linear-gradient(139deg, var(--dark-blue), var(--light-blue) 88.24%)"
  >
    <Box
      as="h1"
      color="var(--white)"
      pt="52px"
      pl="49px"
    >
      Welcome Back
    </Box>
    <Box
      background="url('./images/aw-logo-transparent.png') no-repeat"
      backgroundPosition="bottom left"
      width="433px"
      height="498px"
      flexShrink="0"
      aspectRatio="433/498"
      position="absolute"
      bottom="0"
      left="0"
    />
  </Box>
</template>

<script lang="ts" setup>
  import { Box } from "styled-system/jsx";
</script>

<style></style>
