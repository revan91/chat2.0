import { ref } from 'vue'
const { pageTitle } = useRule();

export function useRule() {
  // 頁面相關資料或捲動控制可擴充於此
  const pageTitle = ref('使用者條款')

  return {
    pageTitle
  }
}