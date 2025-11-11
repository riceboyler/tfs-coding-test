<template>
  <div class="tile">
    <div class="tile-top">
      <div class="img-wrapper">
        <NuxtImg
          :src="item.imageSrc"
          class="tile-image"
        />
      </div>
      <div class="tile-right">
        <div class="tile-top-row">
          <div class="lesson-title">{{ item.lesson }}</div>
          <div class="lesson-icons">
            <Icon
              :name="item.completed ? 'mdi:bookmark' : 'mdi:bookmark-outline'"
              size="24px"
            />
            <Icon
              :name="
                item.bookmarked
                  ? 'material-symbols:check-circle-rounded'
                  : 'material-symbols:check-circle-outline-rounded'
              "
              size="24px"
            />
          </div>
        </div>
        <div class="lesson-type">{{ item.type }}</div>
      </div>
    </div>
    <div class="tile-bottom">
      <div class="progress-bar">
        <div
          class="progress"
          :style="`width: ${item.progress * 100}%`"
        ></div>
      </div>
      <div class="lesson-length">{{ item.length }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { PropType } from 'vue';

  export type LessonData = {
    lesson: string;
    type: string;
    length: string;
    imageSrc: string;
    completed: boolean;
    bookmarked: boolean;
    progress: number;
  };
  defineProps({
    item: {
      type: Object as PropType<LessonData>,
      required: true,
    },
  });
</script>

<style>
  .tile {
    display: flex;
    flex-direction: column;
    border: solid 1.5px var(--gray-ebebeb);
    border-radius: 12px;
    min-width: 343px;
    align-self: stretch;
    min-height: 80px;
    padding: 16px;
    gap: 24px;
  }

  .img-wrapper {
    border-radius: 4px;
    overflow: hidden;
    width: 102px;
    height: 74px;
  }

  .tile-right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    width: 100%;
  }

  .tile-top-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  .lesson-title {
    font-weight: 600;
  }

  .lesson-icons {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  .lesson-length {
    font-size: 12px;
    align-self: flex-end;
    justify-self: flex-end;
  }

  .tile-top {
    display: flex;
    flex-direction: row;
    gap: 24px;
  }

  .tile-bottom {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  .progress-bar {
    position: relative;
    width: 100%;
    height: 10px;
    border-radius: 100px;
    background-color: var(--gray-f6f6f6);

    .progress {
      background-color: var(--light-blue);
      height: 10px;
      border-radius: 100px;
    }
  }
</style>
