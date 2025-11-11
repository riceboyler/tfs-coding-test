<template>
  <div class="wrapper">
    <Topbar />
    <div class="lessons-body">
      <h1>Intermediate</h1>
      <div class="stats">
        <div>{{ Math.round(mockLessonData.length / 2) }} Topics</div>
        <div>·</div>
        <div>{{ mockLessonData.length }} Lesson Videos</div>
        <div>·</div>
        <div>{{ mockLessonData.length * 8 }} Video Exchanges</div>
      </div>
      <div class="controls">
        <Search />
      </div>
      <div class="tiles">
        <div
          v-for="item in mockLessonData.slice(page, 10)"
          :key="item.lesson"
          class="tile"
        >
          <div class="img-wrapper">
            <NuxtImg
              :src="item.imageSrc"
              class="tile-image"
            />
          </div>
          <div class="tile-right">
            <div class="lesson-title">{{ item.lesson }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: "default" });

  const mockLessonData = generateLessonData(168);
  const page = ref(0);
</script>

<style>
  .wrapper {
    width: 100%;
  }
  .lessons-body {
    margin-top: calc(72px + 64px);
    padding-left: 64px;
    padding-right: 44px;
  }

  .stats {
    margin-top: 24px;
    color: var(--gray-595959);
    font-weight: 500;
    line-height: 22px;
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .dot {
    content: "·";
    margin-left: 8px;
    margin-right: 8px;
  }

  .controls {
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin-top: 48px;
  }

  .tiles {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 48px;
  }

  .tile {
    display: flex;
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
</style>
