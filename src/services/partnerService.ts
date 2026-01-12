import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'

export interface PartnerClient {
  id: number
  name: string
  assigned_consultant_id: number
  assigned_consultant_name: string
  status: string
}

export interface PartnerClientsQueryParams {
  partner_type: string
  search?: string
  assigned_consultant_id?: number
}

export const partnerService = {
  async getPartnerClients(params: PartnerClientsQueryParams): Promise<PartnerClient[]> {
    const queryParams = new URLSearchParams()
    
    // Partner type is required
    queryParams.append('partner_type', params.partner_type)
    
    if (params.search) {
      queryParams.append('search', params.search)
    }
    if (params.assigned_consultant_id) {
      queryParams.append('assigned_consultant_id', params.assigned_consultant_id.toString())
    }
    
    const url = `${API_URL}/get-available-clients/public/?${queryParams.toString()}`
    const response = await axios.get(url)
    return response.data
  },
}
