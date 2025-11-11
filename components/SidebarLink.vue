<template>
  <NuxtLink
    :href="itemHref"
    class="sidebar-link"
  >
    <div class="flex-wrapper">
      <Icon
        class="icon"
        :name="iconName"
      />
      <div class="link-text">
        {{ itemText }}
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import type { NavItem } from "../layouts/default.vue";

  const props = defineProps({
    item: Object as PropType<NavItem>,
  });

  const iconName = computed(() => (props.item && props.item.icon) || '');
  const itemText = computed(() => props.item && props.item.text);
  const itemHref = computed(() => props.item && props.item.href);
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
