<template>
  <div
    class="search-wrapper"
    rel="group"
  >
    <Icon
      name="rivet-icons:magnifying-glass"
      class="icon"
    />
    <input
      v-model="searchModel"
      type="text"
      name="search"
      class="search-input"
      placeholder="Search"
    />
  </div>
</template>

<script lang="ts" setup>
  const searchModel = defineModel<string>();
</script>

<style>
  .search-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--gray-f6f6f6);
    padding: 12px 16px;
    border-radius: 100px;
    position: relative;
    width: 168px;
    gap: 8px;
    border: solid 2px;
    border-color: var(--gray-f6f6f6);
  }

  .search-wrapper:focus-within,
  .search-wrapper:hover {
    border-color: var(--black);
  }

  .search-input:focus,
  .search-input:focus-visible {
    border: none !important;
    outline: none !important;
  }

  .search-input {
    z-index: 2;
    width: 100%;
    font-weight: 600;
  }

  .search-input::placeholder {
    color: var(--black);
  }

  .search-wrapper > .icon {
    font-weight: bold;
    color: var(--black);
    font-size: 18px;
  }
</style>
