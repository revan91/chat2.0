<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useHome } from "./HomeView";

const { selectedGender, nickname, selectGender, handleNext } = useHome();
</script>

<template>
  <div class="home-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <!-- 側邊欄元件[cite: 9] -->
    <Sidebar />

    <!-- 中間卡片區塊 -->
    <div class="main-card-container d-flex flex-column position-relative">

      <!-- 頂部 Navbar[cite: 9] -->
      <Navbar />

      <!-- 中間內容表單區 (Flex 居中)[cite: 9] -->
      <div class="content-area flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <div class="form-box d-flex flex-column align-items-center gap-4">

          <!-- 性別選擇按鈕[cite: 9] -->
          <div class="gender-selector d-flex justify-content-center gap-4 w-100">
            <button
              type="button"
              :class="[
                'btn btn-light gender-btn male d-flex justify-content-center align-items-center border-0', 
                { active: selectedGender === 'male' }
              ]"
              @click="selectGender('male')"
            >
              <i class="fa-solid fa-mars"></i>
            </button>

            <button
              type="button"
              :class="[
                'btn btn-light gender-btn female d-flex justify-content-center align-items-center border-0', 
                { active: selectedGender === 'female' }
              ]"
              @click="selectGender('female')"
            >
              <i class="fa-solid fa-venus"></i>
            </button>
          </div>

          <!-- 暱稱輸入框[cite: 9] -->
          <div class="w-100">
            <input
              type="text"
              v-model="nickname"
              class="form-control form-control-lg text-center border-0 nickname-input"
              placeholder="暱稱"
              maxlength="12"
              autocomplete="off"
            />
          </div>

          <!-- 下一步按鈕[cite: 9] -->

          <!-- ✅ 修改後的按鈕 (移除 disabled，讓點擊能觸發 handleNext) -->
          <button
            type="button"
            class="btn btn-custom-cyan btn-lg w-100 fw-bold py-3"
            @click="handleNext"
          >
            下一步
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./HomeView.css";
</style>