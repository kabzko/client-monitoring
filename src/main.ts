import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './style.css'
import { useAuthStore } from '@/services/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialize auth (set token in axios headers if exists)
const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
