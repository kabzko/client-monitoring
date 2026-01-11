<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Mobile Overlay -->
    <div 
      v-if="sidebarOpen" 
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <aside 
      :class="[
        'fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <!-- Logo -->
      <div class="p-4 md:p-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span class="text-base md:text-lg font-semibold text-gray-800">Client Monitoring</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 overflow-y-auto">
        <ul class="space-y-1">
          <li>
            <RouterLink
              to="/dashboard"
              @click="sidebarOpen = false"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">Dashboard</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/clients"
              @click="sidebarOpen = false"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span class="font-medium">Clients</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/consultants"
              @click="sidebarOpen = false"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
              active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="font-medium">Consultants</span>
            </RouterLink>
          </li>

          <!-- Partners Section -->
          <li class="pt-4">
            <button
              @click="partnersOpen = !partnersOpen"
              class="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
            >
              <div class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">Partners</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 transition-transform duration-200"
                :class="{ 'rotate-180': partnersOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Partner Links -->
            <ul v-show="partnersOpen" class="mt-1 space-y-1 pl-4">
              <li v-for="partner in partners" :key="partner.value">
                <RouterLink
                  :to="`/partner/${partner.value.toLowerCase()}`"
                  @click="sidebarOpen = false"
                  class="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
                  active-class="bg-blue-50 text-blue-600 hover:bg-blue-50 hover:text-blue-600"
                >
                  <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                  <span>{{ partner.label }}</span>
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- User Section -->
      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center gap-3 px-2 md:px-4 py-2">
          <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-700 truncate">{{ authStore.user?.fullname || 'User' }}</p>
            <p class="text-xs text-gray-500 truncate">{{ authStore.user?.companyName || '' }}</p>
          </div>
          <button @click="handleLogout" class="text-gray-400 hover:text-gray-600 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Mobile Header -->
      <header class="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <button 
          @click="sidebarOpen = true"
          class="text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="font-semibold text-gray-800">Client Monitoring</span>
      </header>

      <!-- Content Area -->
      <main class="flex-1 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/services/auth'

const router = useRouter()
const authStore = useAuthStore()
const sidebarOpen = ref(false)
const partnersOpen = ref(false)

const partners = [
  { label: 'Globe', value: 'Globe' },
  { label: 'RCBC', value: 'RCBC' },
  { label: 'SME', value: 'SME' },
  { label: 'TAI', value: 'TAI' }
]

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
