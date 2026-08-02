<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import { useDonate } from "./DonateView";
const { bankCode, accountNumber, isCopied, copyAccount } = useDonate();
</script>

<template>
  <div class="donate-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <!-- 側邊欄元件[cite: 5] -->
    <Sidebar />

    <!-- 中間卡片區塊 -->
    <div class="main-card-container d-flex flex-column position-relative">

      <!-- 頂部 Navbar (使用 Bootstrap 導覽卡片與文字間距) -->
      <Navbar />

      <!-- 中間內容表單區 (當內容超出時自動允許垂直滾動) -->
      <div class="content-area flex-grow-1 d-flex justify-content-center p-3">
        <!-- form-box 加 my-auto 可以讓內容少時居中，內容多時順暢滾動 -->
        <div class="form-box my-auto d-flex flex-column align-items-center gap-4">
          <!-- 贊助白色卡片主體 -->
          <div class="donate-card text-center d-flex flex-column align-items-center gap-3 w-100">

            <!-- 卡片標頭 -->
            <div class="donate-header">
              <i class="fa-solid fa-mug-hot donate-icon mb-2"></i>
              <h2 class="fs-4 fw-bold text-dark mb-2">贊助「有聊」團隊</h2>
              <p class="fs-6 text-muted mb-0">感謝您的支持！您的贊助能讓伺服器維修與開發團隊持續運作。</p>
            </div>

            <!-- QR Code 容器 -->
            <div class="qrcode-wrapper p-3 d-flex justify-content-center align-items-center">
              <img
                src="/donate.jpg"
                alt="收款碼 QR Code"
                class="qrcode-img"
              />
            </div>

            <!-- 帳號複製區塊 -->
            <div class="account-info w-100">
              <p class="account-title text-start text-secondary mb-2 fs-7">
                轉帳帳戶 (銀行代碼 {{ bankCode }})
              </p>
              <div class="account-box d-flex justify-content-between align-items-center fw-bold text-secondary-emphasis">
                <span>{{ accountNumber }}</span>
                <button
                  type="button"
                  class="btn btn-sm btn-copy rounded-2 px-3 py-1 d-flex align-items-center gap-1"
                  :class="{ 'copied': isCopied }"
                  @click="copyAccount"
                >
                  <i :class="isCopied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
                  <span>{{ isCopied ? '已複製' : '複製' }}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "./DonateView.css";
</style>