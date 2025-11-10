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
    <TypographyH2>Sign in to ArtistWorks</TypographyH2>
    <LoginForm />
    <VStack
      mt="16px"
      gap="40px"
      width="100%"
    >
      <TextWithLines>Or sign in with</TextWithLines>
      <HStack gap="16px">
        <ButtonsOauth provider="google" />
        <ButtonsOauth provider="apple" />
      </HStack>
    </VStack>
  </VStack>
</template>

<script lang="ts" setup>
  import { VStack, HStack } from "styled-system/jsx";

  definePageMeta({ layout: "login" });
</script>
