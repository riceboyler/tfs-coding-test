<template>
  <styled.button
    border="solid 1px var(--black)"
    borderRadius="12px"
    px="20px"
    minHeight="52px"
    minWidth="149px"
    cursor="pointer"
    transition="all 500ms"
    :_hover="{ backgroundColor: 'var(--light-slate)' }"
  >
    <HStack
      alignItems="center"
      justifyContent="center"
    >
      <Icon
        :name="imageDetails.icon"
        size="24px"
      />
      <Box
        fontWeight="bold"
        lineHeight="14px"
      >
        {{ imageDetails.text }}
      </Box>
    </HStack>
  </styled.button>
</template>

<script lang="ts" setup>
  import { Box, HStack, styled } from "styled-system/jsx";
  type Provider = "google" | "apple";
  const props = defineProps({
    provider: { type: String as PropType<Provider>, required: true },
  });
  const imageDetails =
    props.provider === "apple"
      ? { icon: "logos:apple", text: "Apple" }
      : { icon: "logos:google-icon", text: "Google" };
</script>

<style></style>
