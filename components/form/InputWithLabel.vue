<template>
  <VStack
    gap="8px"
    alignItems="flex-start"
  >
    <styled.label
      fontSize="12px"
      fontWeight="600"
      lineHeight="18px"
      :for="fieldName"
    >
      {{ labelText }}
    </styled.label>
    <styled.input
      v-model="inputModel"
      :name="fieldName"
      :type="inputType"
      px="16px"
      py="12px"
      border="solid 1px"
      borderColor="var(--light-slate)"
      borderRadius="12px"
      :width="{ base: '327px', md: '400px' }"
      :placeholder="placeholder ?? `Enter ${labelText}`"
    />
  </VStack>
</template>

<script lang="ts" setup>
  import { styled, VStack } from "styled-system/jsx";

  type InputType = "text" | "password" | "number";
  defineProps({
    labelText: { type: String, required: true },
    fieldName: { type: String, required: true },
    inputType: {
      type: String as PropType<InputType>,
      required: false,
      default: "text",
    },
    placeholder: { type: String, required: false },
  });

  const inputModel = defineModel<string>();
</script>

<style></style>
