<template>
  <styled.button
    px="20px"
    py="10px"
    :width="width ?? { base: '327px', md: '400px' }"
    color="var(--white)"
    backgroundColor="var(--light-blue)"
    borderRadius="100px"
    fontSize="14px"
    fontWeight="bold"
    :minHeight="height ?? '52px'"
    cursor="pointer"
    :type="type ?? 'button'"
    :_hover="{ backgroundColor: 'var(--link-blue)' }"
    transition="all 500ms"
    display="flex"
    flexDirection="row"
    alignItems="center"
    justifyContent="center"
    @click.prevent="$emit('action')"
  >
    <slot />
  </styled.button>
</template>

<script lang="ts" setup>
  import { styled } from "styled-system/jsx";

  defineProps({
    type: {
      type: String as PropType<"button" | "reset" | "submit" | undefined>,
    },
    width: String,
    height: String,
  });
  defineEmits(["action"]);
</script>

<style></style>
