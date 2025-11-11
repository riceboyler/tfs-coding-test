<template>
  <div class="topbar">
    <div class="left">
      <ButtonsIconic icon="tabler:arrow-narrow-left" />
      <div class="breadcrumb">Lessons</div>
    </div>
    <div class="right">
      <Search />
      <ButtonsIconic icon="mynaui:inbox" />
      <ButtonsPrimary
        width="180px"
        height="42px"
      >
        <div class="button-flex">
          <Icon
            name="ri:arrow-up-circle-line"
            size="24px"
          />
          Submit Video
        </div>
      </ButtonsPrimary>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style>
  .topbar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 233px);
    height: 72px;
    padding: 13px 40px;
    border-bottom: solid 1px var(--gray-ebebeb);
    position: fixed;
    top: 0;
    background-color: var(--white);
    z-index: 10;
    margin-left: -64px;

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
      align-self: flex-start;
      height: 100%;
      width: 100%;
      align-content: center;

      .breadcrumb {
        font-size: 12px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0.48px;
        text-transform: uppercase;
        color: var(--gray-767676);
      }
    }

    .right {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      align-self: flex-end;
      width: 50%;
      height: 100%;
      gap: 24px;

      .button-flex {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    }
  }
</style>
