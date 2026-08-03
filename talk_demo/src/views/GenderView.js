import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

export function useGender() {
  const router = useRouter()
  const selectedPartnerGender = ref('')
  const matchCount = ref(null) // 🎯 儲存目前符合條件的人數 (null 代表未選擇/尚未載入)
  const socketRef = ref(null)

  onMounted(() => {
    // 檢查是否有基礎個人資料
    const nickname = localStorage.getItem('userNickname')
    const gender = localStorage.getItem('userGender')
    if (!nickname || !gender) {
      router.push('/')
      return
    }

    // 建立臨時 Socket 連線來即時查詢人數
    const socket = io('http://localhost:3001')
    socketRef.value = socket

    // 接收伺服器回傳的人數結果
    socket.on('match count updated', (data) => {
      matchCount.value = data.count
    })
  })

  onUnmounted(() => {
    // 離開頁面時斷開臨時 Socket 連線
    if (socketRef.value) {
      socketRef.value.disconnect()
    }
  })

  // 🎯 點擊性別按鈕時，更新選擇並向後端查詢符合的人數
  const selectPartnerGender = (gender) => {
    selectedPartnerGender.value = gender

    const userGender = localStorage.getItem('userGender')

    if (socketRef.value) {
      socketRef.value.emit('get match count', {
        gender: userGender,
        preferredGender: gender,
        matchType: 'gender'
      })
    }
  }

  // 開始配對：跳轉至 ChatView
  const startMatch = () => {
    if (!selectedPartnerGender.value) {
      alert('請先選擇您想要配對的對象性別！')
      return
    }

    sessionStorage.setItem('matchType', 'gender')
    sessionStorage.setItem('preferredGender', selectedPartnerGender.value)
    sessionStorage.removeItem('secretKey')

    router.push('/chat')
  }

  return {
    selectedPartnerGender,
    matchCount,
    selectPartnerGender,
    startMatch
  }
}