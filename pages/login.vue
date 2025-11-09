<template>
  <VStack
    justifyContent="flex-start"
    alignItems="flex-start"
    gap="24px"
  >
    <NuxtImg
      width="48px"
      height="48px"
      src="./images/aw-logo-black-small.png"
    />
    <Box as="h2"> Sign in to ArtistWorks </Box>
    <LoginForm />
    <VStack
      mt="16px"
      gap="40px"
      width="100%"
    >
      <TextWithLines>Or sign in with</TextWithLines>
      <HStack gap="16px">
        <OauthButton provider="google" />
        <OauthButton provider="apple" />
      </HStack>
    </VStack>
  </VStack>
</template>

<script lang="ts" setup>
  import { Box, VStack, HStack } from "styled-system/jsx";

  definePageMeta({ layout: "login" });
</script>
