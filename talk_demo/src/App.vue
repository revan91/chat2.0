<script setup>
// App.vue 為路由根出口，頁面內容皆由 router-view 控制
</script>

<template>
  <div id="app-layout" class="w-100 min-vh-100 overflow-x-hidden">
    <!-- 根據網址動態切換 HomeView 或 ChatView[cite: 13] -->
    <router-view />
  </div>
</template>

<style>
/* 1. 覆蓋瀏覽器預設邊距，確保滿版無縫隙 */
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>