import { defineStore } from 'pinia'
import { ref } from 'vue'
import { dashboardService, type DashboardStats, type RecentActivity } from '@/services/dashboardService'

export const useDashboardStore = defineStore('dashboard', () => {
  const stats = ref<DashboardStats>({
    totalClients: 0,
    totalConsultants: 0,
    activeProjects: 0
  })
  const recentActivity = ref<RecentActivity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchStats() {
    loading.value = true
    error.value = null
    try {
      stats.value = await dashboardService.getStats()
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch dashboard stats'
    } finally {
      loading.value = false
    }
  }

  async function fetchRecentActivity() {
    loading.value = true
    error.value = null
    try {
      recentActivity.value = await dashboardService.getRecentActivity()
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch recent activity'
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    recentActivity,
    loading,
    error,
    fetchStats,
    fetchRecentActivity
  }
})
