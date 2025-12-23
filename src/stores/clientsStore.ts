import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  clientsService,
  type Client,
  type UpdateCleintDetailsPayload,
} from '@/services/clientsService'

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

  async function updateClientDetails(clientId: number, payload: UpdateCleintDetailsPayload) {
    loading.value = true
    error.value = null
    try {
      const updatedClient = await clientsService.updateClientDetails(clientId, payload)
      return updatedClient
    } catch (err: any) {
      error.value = err.message || 'Failed to update client details'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getClientEmployees(clientId: number, year: number) {
    loading.value = true
    error.value = null
    try {
      const employees = await clientsService.getClientEmployees(clientId, year)
      return employees
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch client employees'
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
    updateClientDetails,
    getClientEmployees,
  }
})
