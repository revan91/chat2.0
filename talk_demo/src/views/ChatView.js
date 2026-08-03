import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

export function useChat() {
  const router = useRouter()

  const isMatching = ref(true) // 進入此頁面即開始配對
  const inRoom = ref(false)
  const inputMessage = ref('')
  const messages = ref([])
  const msgCount = ref(0)
  const chatBoxRef = ref(null)
  
  const mySocketId = ref('')

  // Modal 狀態
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

    // 取得配對條件
    const matchType = sessionStorage.getItem('matchType') || 'gender'
    const secretKey = sessionStorage.getItem('secretKey') || ''
    const preferredGender = sessionStorage.getItem('preferredGender') || 'any'

    const socket = io()
    socketRef.value = socket

    socket.on('connect', () => {
      mySocketId.value = socket.id
      console.log('✅ Socket 連線成功！當前 ID:', mySocketId.value)

      // 發送使用者資訊、性別偏好與暗號給後端進行配對
      socket.emit('start match', {
        nickname,
        gender,
        matchType,
        secretKey,
        preferredGender
      })

      const statusText = matchType === 'secret' 
        ? `尋找密語【${secretKey}】對象中，請稍候...` 
        : '尋找對象中，請稍候...'

      appendSystemMsg(statusText)
    })

    socket.on('matched', (data) => {
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
      appendSystemMsg('❌ 陌生人已離開聊天室。按下左下角「離開」按鈕可返回。')
    })
  })

  onUnmounted(() => {
    if (socketRef.value) socketRef.value.disconnect()
    // 清除單次配對條件
    sessionStorage.removeItem('matchType')
    sessionStorage.removeItem('secretKey')
    sessionStorage.removeItem('preferredGender')
  })

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
    router.push('/')
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
    inputMessage,
    messages,
    msgCount,
    chatBoxRef,
    mySocketId,
    isModalOpen,
    leaveVerifyText,
    sendMessage,
    openLeaveModal,
    closeLeaveModal,
    confirmLeave,
    handleReport
  }
}