<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="layoutIndex">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
<style></style>
