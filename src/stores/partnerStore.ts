import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  partnerService,
  type PartnerClient,
  type PartnerClientsQueryParams,
} from '@/services/partnerService'

export const usePartnerStore = defineStore('partner', () => {
  const clients = ref<PartnerClient[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchPartnerClients(params: PartnerClientsQueryParams) {
    loading.value = true
    error.value = null
    try {
      clients.value = await partnerService.getPartnerClients(params)
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch partner clients'
    } finally {
      loading.value = false
    }
  }

  function clearClients() {
    clients.value = []
    error.value = null
  }

  return {
    clients,
    loading,
    error,
    fetchPartnerClients,
    clearClients,
  }
})
