<template>
  <Flex
    :direction="{ base: 'column', md: 'row' }"
    min-height="100vh"
  >
    <Sidebar :is-login="false">
      <VStack alignItems="flex-start">
        <NuxtImg
          src="./images/aw-logo-white-small.png"
          alt="ArtistWorks logo"
          width="40px"
          height="40px"
        />
        <VStack
          gap="10px"
          alignItems="flex-start"
          width="100%"
        >
          <Box
            v-for="item in topNavItems"
            :key="item.text"
            width="100%"
          >
            <SidebarLink :item="item" />
          </Box>
          <hr class="divider" />
          <Box
            v-for="item in midNavItems"
            :key="item.text"
            width="100%"
          >
            <SidebarLink :item="item" />
          </Box>
          <hr class="divider" />
          <Box
            v-for="item in bottomNavItems"
            :key="item.text"
            width="100%"
          >
            <SidebarLink :item="item" />
          </Box>
        </VStack>
      </VStack>
    </Sidebar>
    <Box marginLeft="233px">
      <slot />
    </Box>
  </Flex>
</template>

<script lang="ts" setup>
  import { Box, Flex, VStack } from "styled-system/jsx";

  export type NavItem = {
    icon: string;
    text: string;
    href?: string | URL;
    onClick?: () => void;
  };

  const topNavItems: NavItem[] = [
    {
      icon: "material-symbols:home-outline-rounded",
      text: "Home",
      href: "/",
    },
    {
      icon: "material-symbols:play-circle-outline-rounded",
      text: "Lessons",
      href: "/lessons",
    },
    {
      icon: "hugeicons:exchange-01",
      text: "Video Exchanges",
      href: "/video-exchanges",
    },
    {
      icon: "mynaui:book-open",
      text: "Study Materials",
      href: "/study-materials",
    },
    { icon: "mdi:bookmark-outline", text: "Bookmarks", href: "/bookmarks" },
    {
      icon: "fluent:hourglass-one-quarter-16-regular",
      text: "History",
      href: "/history",
    },
  ];
  const midNavItems: NavItem[] = [
    {
      icon: "ph:metronome-bold",
      text: "Metronome",
      onClick: () => {},
    },
    {
      icon: "ph:music-notes-simple-bold",
      text: "Scale Browser",
      onClick: () => {},
    },
  ];
  const bottomNavItems: NavItem[] = [
    {
      icon: "mynaui:globe",
      text: "Community",
      href: "/community",
    },
  ];
</script>

<style>
  .divider {
    margin-top: 16px;
    margin-bottom: 16px;
    color: var(--white-transparent-20);
    height: 1px;
    align-self: stretch;
  }
</style>
