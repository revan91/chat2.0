import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export function useSecret() {
  const router = useRouter()
  const secretKey = ref('')

  onMounted(() => {
    // 檢查是否有基本個人資料（若無，可退回首頁或提醒）
    const nickname = localStorage.getItem('userNickname')
    const gender = localStorage.getItem('userGender')
    if (!nickname || !gender) {
      router.push('/')
    }
  })

  const startMatch = () => {
    if (!secretKey.value.trim()) {
      alert('請輸入暗號！')
      return
    }

    // 將暗號存入 sessionStorage，並帶到 ChatView 進行 Socket 配對
    sessionStorage.setItem('secretKey', secretKey.value.trim())
    sessionStorage.setItem('preferredGender', 'any')

    router.push('/chat')
  }

  return {
    secretKey,
    startMatch
  }
}