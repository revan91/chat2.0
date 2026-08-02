import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 👈 就是漏掉了這一行！
// 1. 匯入 Bootstrap 的 CSS 樣式
import 'bootstrap/dist/css/bootstrap.min.css'

// 2. 匯入 Bootstrap 的 JavaScript 功能（如 Modal, Dropdown, Tooltip 等）
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
const app = createApp(App)
app.use(router) // 註冊路由
app.mount('#app')