import { ref } from 'vue'

export function useDonate() {
  const bankCode = ref('396')
  const accountNumber = ref('908098930')
  const isCopied = ref(false)

  // 一鍵複製帳號功能
  const copyAccount = async () => {
    // 移除連字號並複製
    const textToCopy = accountNumber.value.replace(/-/g, '')

    try {
      await navigator.clipboard.writeText(textToCopy)
      isCopied.value = true

      // 2 秒後恢復複製按鈕原狀
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (err) {
      alert('複製失敗，請手動複製帳號！')
    }
  }

  return {
    bankCode,
    accountNumber,
    isCopied,
    copyAccount
  }
}