// HomeView.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useHome() {
  const router = useRouter()

  const selectedGender = ref(localStorage.getItem('userGender') || '')
  const nickname = ref(localStorage.getItem('userNickname') || '')

  const selectGender = (gender) => {
    selectedGender.value = gender
  }

  // 共用驗證與儲存邏輯
  const validateAndSave = () => {
    if (!selectedGender.value) {
      alert('請選擇您的性別！')
      return false
    }

    if (!nickname.value.trim()) {
      alert('請輸入您的暱稱！')
      return false
    }

    localStorage.setItem('userGender', selectedGender.value)
    localStorage.setItem('userNickname', nickname.value.trim())
    return true
  }

  // 點擊「下一步」按鈕：跳轉至一般聊天室
  const handleNext = () => {
    if (validateAndSave()) {
      console.log('👉 開始尋找一般配對...', nickname.value, selectedGender.value)
      router.push('/gender') // 跳轉至 gender.vue 頁面
    }
  }

  // 點擊「密語配對」按鈕：跳轉至 secret.vue 頁面
  const handleSecret = () => {
    if (validateAndSave()) {
      console.log('🔐 開始尋找密語配對...', nickname.value, selectedGender.value)
      router.push('/secret')
    }
  }

  return {
    selectedGender,
    nickname,
    selectGender,
    handleNext,
    handleSecret // 🎯 傳出 handleSecret 函數
  }
}