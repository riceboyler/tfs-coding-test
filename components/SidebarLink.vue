<template>
  <NuxtLink
    :href="item?.href"
    class="sidebar-link"
  >
    <div class="flex-wrapper">
      <Icon
        class="icon"
        :name="item?.icon ?? ''"
        font-weight="bold"
      />
      <div class="link-text">
        {{ item?.text }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
  import type { NavItem } from "../layouts/default.vue";

  defineProps({
    item: Object as PropType<NavItem>,
  });
</script>

<style scoped>
  .sidebar-link {
    width: 100%;
    min-width: 200px;
    cursor: pointer;
  }
  .flex-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: var(--white);
    padding: 12px;
    font-weight: 600;
    width: 100%;
    gap: 12px;
  }
  .icon {
    height: 16px;
    width: 16px;
  }
  .flex-wrapper:hover,
  .router-link-active > .flex-wrapper {
    color: var(--white);
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
