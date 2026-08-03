import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

export function useChat() {
  const router = useRouter()

  const isMatching = ref(false)
  const inRoom = ref(false)
  const secretKey = ref('')
  const inputMessage = ref('')
  const messages = ref([])
  const msgCount = ref(0)
  const chatBoxRef = ref(null)
  
  const mySocketId = ref('') // 🎯 專門儲存「我自己的 Socket ID」

  // Leave Modal 狀態
  const isModalOpen = ref(false)
  const leaveVerifyText = ref('')

  const socketRef = ref(null)

  onMounted(() => {
    const nickname = localStorage.getItem('userNickname')
    const gender = localStorage.getItem('userGender')

    if (!nickname || !gender) {
      router.push('/')
      return
    }

    const socket = io()
    socketRef.value = socket

    // 連線成功時，立刻儲存自己的 Socket ID
    socket.on('connect', () => {
      mySocketId.value = socket.id
      console.log('✅ Socket 連線成功！當前我的 ID:', mySocketId.value)
    })

    socket.on('status', (msg) => appendSystemMsg(msg))

    socket.on('matched', (data) => {
      isMatching.value = true
      inRoom.value = true
      msgCount.value = 0

      const secretNotice = data.secretKey && data.secretKey !== 'default' ? `（暗號：${data.secretKey}）` : ''
      const genderSign = data.partner.gender === 'male' ? '♂ (男)' : '♀ (女)'
      
      appendSystemMsg(`🎉 配對成功${secretNotice}！對方是【${data.partner.nickname} ${genderSign}】，連線成功，可以開始聊天了！`)
    })

    socket.on('chat message', (data) => {

      msgCount.value = data.msgCount
      messages.value.push({
        type: 'chat',
        senderSocketId: data.senderSocketId,
        senderName: data.senderName,
        text: data.text
      })
      scrollToBottom()
    })

    socket.on('partner left', () => {
      inRoom.value = false
      appendSystemMsg('❌ 陌生人已離開聊天室。按下左下角「離開」按鈕可重新開始。')
    })
  })

  onUnmounted(() => {
    if (socketRef.value) socketRef.value.disconnect()
  })

  const startMatch = () => {
    const nickname = localStorage.getItem('userNickname')
    const gender = localStorage.getItem('userGender')

    isMatching.value = true
    inRoom.value = false
    messages.value = []
    msgCount.value = 0

    if (socketRef.value) {
      socketRef.value.emit('start match', { nickname, gender, secretKey: secretKey.value })
    }
    appendSystemMsg('尋找對象中，請稍候...')
  }

  const sendMessage = () => {
    if (inputMessage.value.trim() && inRoom.value && socketRef.value) {
      socketRef.value.emit('chat message', inputMessage.value)
      inputMessage.value = ''
    }
  }

  const openLeaveModal = () => {
    leaveVerifyText.value = ''
    isModalOpen.value = true
  }

  const closeLeaveModal = () => {
    isModalOpen.value = false
  }

  const confirmLeave = () => {
    if (msgCount.value >= 30 && leaveVerifyText.value.trim() !== 'Leave') {
      alert('驗證碼輸入錯誤！請輸入 Leave 才能離開。')
      return
    }

    if (socketRef.value) {
      socketRef.value.emit('leave room')
    }
    window.location.reload()
  }

  const handleReport = () => {
    const reason = prompt('請輸入檢舉或回報原因：')
    if (reason && reason.trim()) {
      alert('感謝您的回報，我們會盡快審核！')
    }
  }

  const appendSystemMsg = (text) => {
    messages.value.push({ type: 'system', text })
    scrollToBottom()
  }

  const scrollToBottom = async () => {
    await nextTick()
    if (chatBoxRef.value) {
      chatBoxRef.value.scrollTop = chatBoxRef.value.scrollHeight
    }
  }

  return {
    isMatching,
    inRoom,
    secretKey,
    inputMessage,
    messages,
    msgCount,
    chatBoxRef,
    mySocketId, // 🎯 將 mySocketId 回傳給 Vue
    isModalOpen,
    leaveVerifyText,
    startMatch,
    sendMessage,
    openLeaveModal,
    closeLeaveModal,
    confirmLeave,
    handleReport
  }
}