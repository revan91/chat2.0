import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import DonateView from '../views/DonateView.vue'
import RuleView from '../views/RuleView.vue'

const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/chat', name: 'Chat', component: ChatView },
    { path: '/donate', name: 'Donate', component: DonateView },
    { path: '/rule', name: 'Rule', component: RuleView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router