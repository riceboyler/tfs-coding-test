<template>
  <styled.button
    px="20px"
    py="10px"
    :width="{ base: '327px', md: '400px' }"
    color="var(--white)"
    backgroundColor="var(--light-blue)"
    borderRadius="100px"
    fontSize="14px"
    fontWeight="bold"
    minHeight="52px"
    cursor="pointer"
    :type="type ?? 'button'"
    @click.prevent="$emit('action')"
  >
    {{ text }}
  </styled.button>
</template>

<script lang="ts" setup>
  import { styled } from "styled-system/jsx";

  defineProps({
    text: { type: String, default: "Continue" },
    type: {
      type: String as PropType<"button" | "reset" | "submit" | undefined>,
    },
  });
  defineEmits(["action"]);
</script>

<style></style>
