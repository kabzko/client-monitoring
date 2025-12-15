import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface Consultant {
  id: number
  name: string
  email: string
  phone: string
  is_active: boolean
  created_on: string
}

export interface CreateConsultantPayload {
  name: string
  email: string
  phone: string
}

export interface UpdateConsultantPayload {
  name?: string
  email?: string
  phone?: string
}

export const consultantsService = {
  async getAll(): Promise<Consultant[]> {
    const response = await axios.get(`${API_URL}/get-consultants/`)
    return response.data
  },

  async create(payload: CreateConsultantPayload): Promise<Consultant> {
    const response = await axios.post(`${API_URL}/create-consultant/`, payload)
    return response.data
  },

  async update(id: number, payload: UpdateConsultantPayload): Promise<Consultant> {
    const response = await axios.put(`${API_URL}/update-consultant/${id}/`, payload)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${API_URL}/delete-consultant/${id}/`)
  },
}
