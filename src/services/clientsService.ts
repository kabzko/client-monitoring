import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface Client {
  id: number
  name: string
  is_employee_profile_imported: boolean
  has_company: boolean
  has_docs: boolean
  has_training: boolean
  has_utc: boolean
  has_am_1q: boolean
  has_am_2q: boolean
  is_confirmation_sent: boolean
  original_start_date: string
  lock_in_period_date: string
  contract_status: string
  status: string
  assigned_consultant_id: number
  assigned_consultant_name: string
}

export interface UpdateCleintDetailsPayload {
  is_employee_profile_imported: boolean
  has_company: boolean
  has_docs: boolean
  has_training: boolean
  has_utc: boolean
  has_am_1q: boolean
  has_am_2q: boolean
  is_confirmation_sent: boolean
  original_start_date: string
  lock_in_period_date: string
  contract_status: string
  status: string
  assigned_consultant_id: number
}

export interface ClientEmployee {
  id: number
  date: string
  number_of_employees: number
}

export const clientsService = {
  async getAll(): Promise<Client[]> {
    const response = await axios.get(`${API_URL}/get-available-clients/`)
    return response.data
  },

  async updateClientDetails(
    clientId: number,
    payload: UpdateCleintDetailsPayload,
  ): Promise<Client> {
    const response = await axios.put(`${API_URL}/update-client-details/${clientId}/`, payload)
    return response.data
  },

  async getClientEmployees(clientId: number, year: number): Promise<ClientEmployee[]> {
    const response = await axios.get(`${API_URL}/get-client-employees/${clientId}/${year}/`)
    return response.data
  },
}
