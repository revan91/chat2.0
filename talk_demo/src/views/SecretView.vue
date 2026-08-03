<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useSecret } from "./SecretView";

const { secretKey, startMatch } = useSecret();
</script>

<template>
  <div class="chat-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <Sidebar />

    <div class="main-card-container d-flex flex-column position-relative">
      <Navbar />

      <!-- 中間區域：僅保留密語輸入卡片 -->
      <div class="flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <div class="card p-4 shadow-sm text-center border-0 w-100 match-card">
          
          <h4 class="fw-bold mb-4 text-dark">🔐 密語配對</h4>

          <div class="mb-4">
            <input
              type="text"
              v-model="secretKey"
              class="form-control form-control-lg text-center bg-light secret-key-input"
              placeholder="請輸入暗號"
              autocomplete="off"
            />
          </div>

          <button
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
@import "./ChatView.css";
</style>