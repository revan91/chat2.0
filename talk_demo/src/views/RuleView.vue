
<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import { useRule } from "./RuleView";
</script>
<template>
  <div class="rule-page-wrapper d-flex justify-content-center align-items-center position-relative">
    <!-- 側邊欄元件 (共用) -->
    <Sidebar />

    <!-- 中間主卡片區塊 -->
    <div class="main-card-container d-flex flex-column position-relative">
      
      <!-- 頂部 Navbar 元件 -->
      <Navbar />

      <!-- 中間內容區域 (可垂直滾動) -->
      <div class="content-area flex-grow-1 p-3">
        <main class="rule-container mx-auto d-flex flex-column gap-3 py-2">
          
          <!-- 頂部重點提示卡片 -->
          <div class="rule-card header-card text-center py-4">
            <h2 class="fw-bold mb-2">開始使用前<br>請同意並確實遵守</h2>
            <h1 class="highlight-title fw-bold mb-0">有聊 havetalk {{ pageTitle }}</h1>
          </div>

          <!-- 卡片 1 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">1. 同意條款</h3>
            <p class="mb-0">歡迎使用「有聊 havetalk」（以下簡稱「本服務」）。本使用條款（以下簡稱「本條款」）規範本服務與用戶之間的權利與義務關係。當您開始註冊、登入或使用本服務時，即表示您已閱讀、理解並同意受本條款及相關法律規定之約束。如您不同意本條款，請立即停止使用本服務。</p>
          </div>

          <!-- 卡片 2 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">2. 未成年人使用</h3>
            <p class="mb-0">若您為未成年人，應在法定監護人（或法定代理人）陪同下閱讀、理解本條款，並在徵得法定監護人同意後方得使用本服務。</p>
          </div>

          <!-- 卡片 3 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">3. 條款之修改與變更</h3>
            <p class="mb-0">本服務有權隨時修改或變更本條款。修改後的條款將公布於官方網站或應用程式內。重大變更將提前進行公告，變更後若您繼續使用本服務，即視為您已接受並同意該修改。請隨時參閱最新版本之使用條款。</p>
          </div>

          <!-- 卡片 4 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">4. 智慧財產權與內容授權</h3>
            <ul class="rule-list p-0 m-0 d-flex flex-column gap-2">
              <li><strong>用戶內容歸屬：</strong> 用戶在本服務上發布、傳送之文字、圖片、音訊或其他內容，其智慧財產權仍歸屬於用戶或原權利人所有。</li>
              <li><strong>服務授權：</strong> 為使本服務得順利營運（包括訊息傳輸、資料儲存與備份），用戶同意授予本服務全球性、非獨佔、免權利金之權利，於營運及優化本服務之必要範圍內使用該內容。</li>
            </ul>
          </div>

          <!-- 卡片 5 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">5. 禁止行為</h3>
            <p class="mb-0">用戶承諾於使用本服務時，絕不進行以下行為：</p>
            <ul class="rule-bullet-list m-0 d-flex flex-column gap-2">
              <li>發布未經授權之商業廣告、垃圾訊息或進行非法的多層次傳銷（如金字塔式傳銷）。</li>
              <li>未經許可，使用自動化程式（如爬蟲、機器人、蜘蛛）收集用戶資料或登入本服務。</li>
              <li>上傳或散布惡意程式碼、病毒或進行毀損服務運作之攻擊（如 DoS/DDoS 攻擊）。</li>
              <li>霸凌、恐嚇、騷擾、騷擾性跟蹤或侵害他人人格權。</li>
              <li>發布仇恨言論、暴力煽動、極端色情、血腥腥煽或其他違反公序良俗之內容。</li>
              <li>從事信用卡詐欺、銀行帳戶詐欺或其他違法行為。</li>
              <li>協助、鼓吹或教唆他人進行任何違反本協議或法令之行為。</li>
            </ul>
            <p class="warning-text mb-0 mt-2">如用戶違反上述承諾，本服務有權不經通知直接採取警告、限制功能、暫停或永久終止帳號之處分，情節嚴重者將移送司法機關處理，並依法追討損失。</p>
          </div>

          <!-- 卡片 6 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">6. 免責聲明</h3>
            <ul class="rule-list p-0 m-0 d-flex flex-column gap-2">
              <li>本服務按「現狀（As-Is）」提供。我們將盡力維護系統穩定，但無法保證服務永不中斷、無錯誤或免受外力入侵（如駭客攻擊）。</li>
              <li>在法律允許的最大範圍內，對於因系統維護、網路中斷、第三方不當行為或不可抗力事件所造成之損害，本服務不負賠償責任。</li>
            </ul>
          </div>

          <!-- 卡片 7 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">7. 隱私權保護</h3>
            <p class="mb-0">我們重視您的個人隱私。本服務收集、處理及利用您的個人資料均遵循《隱私權政策》。請參閱我們的《隱私權政策》以了解更多細節。</p>
          </div>

          <!-- 卡片 8 -->
          <div class="rule-card d-flex flex-column gap-2">
            <h3 class="fw-bold mb-0">8. 準據法與管轄法院</h3>
            <p class="mb-0">本條款之解釋、效力及因本條款所生之爭議，均以中華民國法律為準據法。因本服務或本條款所生之訴訟，雙方同意以臺灣臺北地方法院為第一審管轄法院。</p>
          </div>

        </main>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import "./RuleView.css";
</style>