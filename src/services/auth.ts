import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface LoginPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user_logged: string
  company_name: string
  company_id: number
  emp_id_digits: number
}

export interface User {
  token: string
  fullname: string
  companyName: string
  companyId: number
}

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// Helper functions
const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem(USER_KEY)
  if (userStr) {
    return JSON.parse(userStr)
  }
  return null
}

const setAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

// Auth Store
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(getStoredUser())
  const token = ref<string | null>(getStoredToken())
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(payload: LoginPayload) {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(`${API_URL}/api-auth/`, payload)
      const data: LoginResponse = response.data

      // Store token and user info
      localStorage.setItem(TOKEN_KEY, data.token)
      const userData: User = {
        token: data.token,
        fullname: data.user_logged,
        companyName: data.company_name,
        companyId: data.company_id,
      }
      localStorage.setItem(USER_KEY, JSON.stringify(userData))

      // Set state
      token.value = data.token
      user.value = userData

      // Set axios header
      setAuthHeader(data.token)

      return data
    } catch (err: any) {
      error.value = err.response?.data?.error || err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setAuthHeader(null)
    user.value = null
    token.value = null
  }

  function initializeAuth() {
    const storedToken = getStoredToken()
    const storedUser = getStoredUser()
    token.value = storedToken
    user.value = storedUser
    setAuthHeader(storedToken)
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    initializeAuth,
  }
})
