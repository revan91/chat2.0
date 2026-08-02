<script setup>
import { useRouter } from 'vue-router'
</script>

<template>
  <nav class="navbar">
    <div class="logo">💬 匿名聊天網</div>
    <div class="links">
      <router-link to="/">首頁</router-link>
      <router-link to="/chat">聊天室</router-link>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #333;
  color: white;
}
.navbar a {
  color: white;
  margin-left: 15px;
  text-decoration: none;
}
.navbar a.router-link-active {
  color: #42b883; /* 當前頁面連結會自動亮起 Vue 綠色 */
  font-weight: bold;
}
</style>