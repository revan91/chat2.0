<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import { useChat } from './ChatView'

const {
  isMatching,
  inRoom,
  secretKey,
  inputMessage,
  messages,
  msgCount,
  chatBoxRef,
  mySocketId, // 🎯 引入 mySocketId
  isModalOpen,
  leaveVerifyText,
  startMatch,
  sendMessage,
  openLeaveModal,
  closeLeaveModal,
  confirmLeave,
  handleReport
} = useChat()
</script>

<template>
  <div class="chat-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <Sidebar />

    <div class="main-card-container d-flex flex-column position-relative">
      <Navbar />

      <div class="flex-grow-1 overflow-hidden d-flex flex-column position-relative">
        <div v-if="!isMatching" class="h-100 d-flex justify-content-center align-items-center p-3">
          <div class="card p-4 shadow-sm text-center border-0 w-100" style="max-width: 360px; background-color: rgba(255, 255, 255, 0.9);">
            <div class="mb-3">
              <input 
                type="text" 
                v-model="secretKey" 
                class="form-control form-control-lg text-center bg-light border-0" 
                placeholder="暗號 (選填)" 
                autocomplete="off" 
              />
            </div>
            <button @click="startMatch" class="btn btn-custom-cyan btn-lg w-100 fw-bold">
              開始配對
            </button>
          </div>
        </div>

        <div 
          v-else 
          id="chat-box" 
          ref="chatBoxRef" 
          class="flex-grow-1 p-3 overflow-y-auto d-flex flex-column gap-2"
        >
          <template v-for="(item, index) in messages" :key="index">
            <div v-if="item.type === 'system'" class="system-msg">
              {{ item.text }}
            </div>
            
            <!-- 🎯 精準判斷：傳訊者的 ID 是否等於我自己的 Socket ID -->
            <div 
              v-else 
              :class="['message d-flex flex-column', item.senderSocketId === mySocketId ? 'my-message' : 'other-message']"
            >
              <span v-if="item.senderSocketId !== mySocketId" class="sender-name">
                {{ item.senderName }}
              </span>
              {{ item.text }}
            </div>
          </template>
        </div>
      </div>

      <!-- 輸入框與 Modal 部分保持不變 -->
      <form class="custom-input-group p-2 d-flex align-items-center gap-2" @submit.prevent="sendMessage">
        <button type="button" class="btn btn-danger rounded-pill px-3 fw-bold flex-shrink-0" @click="openLeaveModal">
          離開
        </button>
        
        <input 
          type="text" 
          v-model="inputMessage" 
          class="form-control rounded-pill border-secondary-subtle px-3" 
          :placeholder="inRoom ? '輸入訊息...' : (isMatching ? '配對尋找中...' : '請先開始配對...')" 
          :disabled="!inRoom" 
          autocomplete="off" 
        />
        
        <button type="submit" class="btn btn-primary rounded-pill px-3 fw-bold flex-shrink-0" :disabled="!inRoom">
          傳送
        </button>
      </form>

    </div>

    <!-- Modal 彈窗 -->
    <div v-if="isModalOpen" class="modal d-block bg-dark bg-opacity-75 d-flex align-items-center justify-content-center" style="z-index: 1055;">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 400px; width: 90%;">
        <div class="modal-content text-white border-0 shadow-lg" style="background-color: #2b2b2b; border-radius: 12px; padding: 10px;">
          
          <div class="modal-header border-0 pb-0 position-relative">
            <h5 class="modal-title fs-5 fw-bold text-center w-100 lh-base">
              {{ msgCount >= 30 ? '雙方聊天已達 30 句，請輸入 Leave 驗證後離開：' : '是否確定離開聊天室？' }}
            </h5>
            <button 
              type="button" 
              class="btn-close btn-close-white position-absolute top-0 end-0 m-3" 
              @click="closeLeaveModal"
            ></button>
          </div>
          
          <div v-if="msgCount >= 30" class="modal-body py-3">
            <input 
              type="text" 
              v-model="leaveVerifyText" 
              class="form-control text-center text-white border-secondary" 
              style="background-color: #383838; height: 45px; border-radius: 6px; font-size: 1.1rem;"
              placeholder="請輸入 Leave" 
              autocomplete="off" 
            />
          </div>
          <div v-else class="modal-body py-1"></div>

          <div class="modal-footer border-0 d-flex justify-content-between pt-0 px-3 pb-2">
            <button 
              type="button" 
              class="btn fw-bold text-white px-3 py-2" 
              style="background-color: #e67e22; border-radius: 8px;"
              @click="handleReport"
            >
              檢舉/回報
            </button>
            
            <button 
              type="button" 
              class="btn fw-bold text-white px-4 py-2" 
              style="background-color: #ff4747; border-radius: 8px;"
              @click="confirmLeave"
            >
              離開
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import './ChatView.css';
</style>