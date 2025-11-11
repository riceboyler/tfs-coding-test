<template>
  <button class="icon-button">
    <Icon
      :name="icon"
      size="24px"
    />
  </button>
</template>

<script lang="ts" setup>
  defineProps({
    icon: {
      type: String,
      required: true,
    },
  });
</script>

<style>
  .icon-button {
    display: flex;
    padding: 8px;
    background-color: var(--gray-f6f6f6);
    border-radius: 100px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: all 200ms;
    height: 100%;
    min-height: 42px;
    min-width: 42px;
  }
  .icon-button:hover {
    background-color: var(--light-blue);
  }
</style>
