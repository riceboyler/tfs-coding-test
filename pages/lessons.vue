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
        >
          <LessonTile :item="item" />
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
    /* Need to compensate for topbar */
    margin-top: 72px;
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
</style>
