<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const soundEnabled = ref(true);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<template>
  <!-- 1. 漢堡按鈕 (開關選單用) -->
  <button
    class="toggle-btn"
    :class="{ 'btn-active': isOpen }"
    @click="toggleMenu"
    aria-label="Toggle Menu"
  >
    <i class="fa-solid fa-bars"></i>
  </button>

  <!-- 2. 遮罩層 (點擊選單外部可關閉) -->
  <div
    class="overlay"
    :class="{ active: isOpen }"
    @click="closeMenu"
  ></div>

  <!-- 3. 側邊選單主體 -->
  <aside
    class="sidebar"
    :class="{ active: isOpen }"
  >
    <!-- 上方 Logo 區域 (點擊跳轉首頁) -->
    <div class="logo-container">
      <router-link to="/" class="logo-box" @click="closeMenu" title="回到首頁">
        <span class="logo-text">H</span>
      </router-link>
    </div>

    <!-- 第一區塊：主要選單 -->
    <ul class="menu-list">
      <li>
        <router-link
          to="/rule"
          @click="closeMenu"
        >
          <i class="fa-regular fa-question-circle icon"></i>使用者規章
        </router-link>
      </li>
      <li>
        <a
          href="https://www.threads.com/@coding_91"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="fa-solid fa-star icon"></i>聯絡我們
        </a>
      </li>
    </ul>

    <!-- 第二區塊：捷徑 -->
    <div class="menu-category">快速通道</div>
    <ul class="menu-list">
      <li>
        <router-link
          to="/donate"
          @click="closeMenu"
        >
          <i class="fa-solid fa-right-from-bracket icon"></i>贊助我們
        </router-link>
      </li>
      <li>
        <a href="#">
          <i class="fa-solid fa-magnifying-glass icon"></i>約會景點推薦(等待製作中)
        </a>
      </li>
    </ul>

    <!-- 第三區塊：設定 -->
    <div class="menu-category">設定</div>
    <ul class="menu-list">
      <li class="toggle-item">
        <div class="item-left">
          <i class="fa-solid fa-volume-high icon"></i>新訊息音效提醒
        </div>
        <label class="switch">
          <input
            type="checkbox"
            v-model="soundEnabled"
          >
          <span class="slider"></span>
        </label>
      </li>
    </ul>
  </aside>
</template>

<style scoped>
/* 漢堡按鈕 (固定於左上角) */
.toggle-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 28px;
  color: #ed5a8c;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
  transition: left 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

/* 當選單展開時，按鈕右移 */
.toggle-btn.btn-active {
  left: 240px;
}

/* 暗色遮罩 */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  z-index: 900;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 側邊選單本體 */
.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 280px;
  height: 100vh;
  background-color: #f2f2f2;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: left 0.3s ease;
  z-index: 999;
  overflow-y: auto;
}

.sidebar.active {
  left: 0;
}

/* Logo 區塊 */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  background-color: #eeeeee;
}

.logo-box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #cf8cf1, #ad33e6);
  border-radius: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(255, 42, 95, 0.3);
  
  /* 變更為按鈕屬性 */
  text-decoration: none; /* 清除 router-link 預設底線 */
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.logo-text {
  color: white;
  font-size: 55px;
  font-weight: bold;
}

/* 分類標頭 */
.menu-category {
  background-color: #e9e9e9;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
}

/* 選單清單 */
.menu-list {
  list-style: none;
  background-color: #fff;
  padding: 0;
  margin: 0;
}

.menu-list li {
  border-bottom: 1px solid #f0f0f0;
}

.menu-list a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  -webkit-tap-highlight-color: transparent;
}

.menu-list a:hover {
  background-color: #f9f9f9;
}

/* 圖示風格 */
.icon {
  margin-right: 12px;
  font-size: 1.2rem;
  color: #ad33e6;
  width: 24px;
  text-align: center;
}

/* 開關控制項 */
.toggle-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  font-size: 1rem;
  color: #333;
}

.item-left {
  display: flex;
  align-items: center;
}

/* iOS Toggle 切換鈕 */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #ad33e6;
}

input:checked + .slider:before {
  transform: translateX(24px);
}
/* 滑鼠懸停與按下的互動回饋 */
.logo-box:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 15px rgba(173, 51, 230, 0.4);
}

.logo-box:active {
  transform: translateY(0) scale(0.98);
}
</style>