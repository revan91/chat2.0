<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useHome } from "./HomeView";

// 🎯 引入 handleSecret
const { selectedGender, nickname, selectGender, handleNext, handleSecret } = useHome();
</script>

<template>
  <div class="home-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <Sidebar />

    <div class="main-card-container d-flex flex-column position-relative">
      <Navbar />

      <div class="content-area flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <!-- 🎯 gap-3 讓性別選擇、暱稱、兩個按鈕之間保持一致的漂亮間距 -->
        <div class="form-box d-flex flex-column align-items-center gap-3">

          <!-- 性別選擇按鈕 -->
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

          <!-- 暱稱輸入框 -->
          <div class="w-100 mb-2">
            <input
              type="text"
              v-model="nickname"
              class="form-control form-control-lg text-center border-0 nickname-input"
              placeholder="暱稱"
              maxlength="12"
              autocomplete="off"
            />
          </div>

          <!-- 下一步按鈕 -->
          <button
            type="button"
            class="btn btn-custom-cyan btn-lg w-100 fw-bold py-3"
            @click="handleNext"
          >
            下一步
          </button>

          <!-- 🎯 密語配對按鈕 (樣式相同，跳轉至 secret.vue) -->
          <button
            type="button"
            class="btn btn-custom-cyan btn-lg w-100 fw-bold py-3"
            @click="handleSecret"
          >
            密語配對
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./HomeView.css";
</style>