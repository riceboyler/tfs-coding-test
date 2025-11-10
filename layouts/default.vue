<template>
  <Flex
    :direction="{ base: 'column', md: 'row' }"
    min-height="100vh"
  >
    <SideBar :is-login="false">
      <VStack alignItems="flex-start">
        <NuxtImg
          src="./images/aw-logo-white-small.png"
          alt="ArtistWorks logo"
        />
        <VStack
          gap="10px"
          alignItems="flex-start"
          :for="item in topNavItems"
        />
      </VStack>
    </SideBar>
    <slot />
  </Flex>
</template>

<script lang="ts" setup>
  import { Flex, VStack } from "styled-system/jsx";

  type NavItem = { icon: string; text: string };

  const topNavItems: NavItem[] = [
    { icon: "material-symbols:home-outline-rounded", text: "Home" },
    { icon: "material-symbols:play-circle-outline-rounded", text: "Lessons" },
    { icon: "hugeicons:exchange-01", text: "Video Exchanges" },
    { icon: "mynaui:book-open", text: "Study Materials" },
    { icon: "mdi:bookmark-outline", text: "Bookmarks" },
    { icon: "fluent:hourglass-one-quarter-16-regular", text: "History" },
  ];
</script>

<style></style>
