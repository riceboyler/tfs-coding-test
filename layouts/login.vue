<script setup lang="ts">
  import { Center, Flex, Box } from "styled-system/jsx";
</script>

<template>
  <Flex
    :direction="{ base: 'column', md: 'row' }"
    minHeight="100vh"
  >
    <SideBar is-login>
      <Box
        pt="36px"
        pl="25px"
      >
        <TypographyH1 color="var(--white)">Welcome Back</TypographyH1>
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
    </SideBar>
    <Center
      width="100%"
      minHeight="100vh"
    >
      <slot />
    </Center>
  </Flex>
</template>
