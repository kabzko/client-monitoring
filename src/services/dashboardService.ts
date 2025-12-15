import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface DashboardStats {
  totalClients: number
  totalConsultants: number
  activeProjects: number
}

export interface RecentActivity {
  id: number
  type: string
  message: string
  timestamp: string
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await axios.get(`${API_URL}/dashboard/stats`)
    return response.data
  },

  async getRecentActivity(): Promise<RecentActivity[]> {
    const response = await axios.get(`${API_URL}/dashboard/activity`)
    return response.data
  },
}
