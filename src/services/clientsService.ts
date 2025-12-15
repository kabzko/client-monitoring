import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface Client {
  id: number
  name: string
  email: string
  is_active: boolean
  assigned_consultant?: number | null
  assigned_consultant_name?: string | null
  assigned_consultant_date?: string | null
}

export interface AssignConsultantPayload {
  company_id: number
  consultant_id: number
}

export interface UnassignConsultantPayload {
  company_id: number
}

export const clientsService = {
  async getAll(): Promise<Client[]> {
    const response = await axios.get(`${API_URL}/get-available-clients/`)
    return response.data
  },

  async assignConsultant(consultantId: number, payload: AssignConsultantPayload): Promise<Client> {
    const response = await axios.post(`${API_URL}/assign-consultant/${consultantId}/`, payload)
    return response.data
  },

  async unassignConsultant(
    consultantId: number,
    payload: UnassignConsultantPayload,
  ): Promise<Client> {
    const response = await axios.post(`${API_URL}/unassign-consultant/${consultantId}/`, payload)
    return response.data
  },
}
