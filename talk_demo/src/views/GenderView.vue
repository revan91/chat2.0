<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useGender } from "./GenderView";

const {
  selectedPartnerGender,
  matchCount,
  selectPartnerGender,
  startMatch
} = useGender();
</script>

<template>
  <div class="chat-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <Sidebar />

    <div class="main-card-container d-flex flex-column position-relative">
      <Navbar />

      <!-- 中間區域：僅保留性別選擇卡片 -->
      <div class="flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <div class="card p-4 shadow-sm text-center border-0 w-100 match-card">
          
          <h5 class="fw-bold mb-4 text-dark">請選擇想要配對的對象性別</h5>

          <!-- 性別選擇按鈕區 -->
          <div class="mb-3">
            <div class="gender-selector d-flex justify-content-center gap-3 w-100">
              <!-- 男性按鈕 -->
              <button
                type="button"
                :class="[
                  'btn btn-light gender-btn male d-flex justify-content-center align-items-center border-0',
                  { active: selectedPartnerGender === 'male' }
                ]"
                @click="selectPartnerGender('male')"
              >
                <i class="fa-solid fa-mars"></i>
              </button>

              <!-- 女性按鈕 -->
              <button
                type="button"
                :class="[
                  'btn btn-light gender-btn female d-flex justify-content-center align-items-center border-0',
                  { active: selectedPartnerGender === 'female' }
                ]"
                @click="selectPartnerGender('female')"
              >
                <i class="fa-solid fa-venus"></i>
              </button>

              <!-- 不限性別按鈕 -->
              <button
                type="button"
                :class="[
                  'btn btn-light gender-btn any d-flex justify-content-center align-items-center border-0',
                  { active: selectedPartnerGender === 'any' }
                ]"
                @click="selectPartnerGender('any')"
              >
                <i class="fa-solid fa-venus-mars"></i>
              </button>
            </div>
          </div>

          <!-- 🎯 按鈕下方：即時顯示人數提示 -->
          <div class="match-count-info mb-4" style="min-height: 24px;">
            <p v-if="matchCount !== null" class="text-secondary small fw-bold m-0 animated fadeIn">
              💡 當前有 <span class="text-primary fs-6">{{ matchCount }}</span> 位符合條件的使用者正在線上等待
            </p>
            <p v-else class="text-muted small m-0">
              請點擊上方按鈕查看即時在線等待人數
            </p>
          </div>

          <!-- 開始配對按鈕 -->
          <button
            type="button"
            @click="startMatch"
            class="btn btn-custom-cyan btn-lg w-100 fw-bold py-3"
          >
            開始配對
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import "./GenderView.css";

/* 動態滑入效果 */
.animated.fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>