import { defineStore } from 'pinia'
import { ref } from 'vue'
import { clientsService, type Client, type AssignConsultantPayload, type UnassignConsultantPayload } from '@/services/clientsService'

export const useClientsStore = defineStore('clients', () => {
  const clients = ref<Client[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchClients() {
    loading.value = true
    error.value = null
    try {
      clients.value = await clientsService.getAll()
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch clients'
    } finally {
      loading.value = false
    }
  }

  async function assignConsultant(consultantId: number, payload: AssignConsultantPayload) {
    loading.value = true
    error.value = null
    try {
      const updatedClient = await clientsService.assignConsultant(consultantId, payload)
      const index = clients.value.findIndex(c => c.id === payload.company_id)
      if (index !== -1) {
        clients.value[index] = updatedClient
      }
      return updatedClient
    } catch (err: any) {
      error.value = err.message || 'Failed to assign consultant'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function unassignConsultant(consultantId: number, payload: UnassignConsultantPayload) {
    loading.value = true
    error.value = null
    try {
      const updatedClient = await clientsService.unassignConsultant(consultantId, payload)
      const index = clients.value.findIndex(c => c.id === payload.company_id)
      if (index !== -1) {
        clients.value[index] = updatedClient
      }
      return updatedClient
    } catch (err: any) {
      error.value = err.message || 'Failed to unassign consultant'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    clients,
    loading,
    error,
    fetchClients,
    assignConsultant,
    unassignConsultant
  }
})
