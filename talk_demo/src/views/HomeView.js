// src/views/HomeView.js
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useHome() {
  const router = useRouter()

  const selectedGender = ref(localStorage.getItem('userGender') || '')
  const nickname = ref(localStorage.getItem('userNickname') || '')

  const selectGender = (gender) => {
    selectedGender.value = gender
  }

  // 點擊下一步時檢查[cite: 5]
  const handleNext = () => {
    // 1. 檢查性別[cite: 5]
    if (!selectedGender.value) {
      alert('請選擇您的性別！')
      return
    }

    // 2. 檢查暱稱[cite: 5]
    if (!nickname.value.trim()) {
      alert('請輸入您的暱稱！')
      return
    }

    console.log('👉 開始尋找配對...', nickname.value, selectedGender.value)

    // 儲存性別與暱稱[cite: 5]
    localStorage.setItem('userGender', selectedGender.value)
    localStorage.setItem('userNickname', nickname.value.trim())

    // 跳轉至聊天室[cite: 5]
    router.push('/chat')
  }

  return {
    selectedGender,
    nickname,
    selectGender,
    handleNext
  }
}