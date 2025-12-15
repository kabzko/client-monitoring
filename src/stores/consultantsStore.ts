import { defineStore } from 'pinia'
import { ref } from 'vue'
import { consultantsService, type Consultant, type CreateConsultantPayload, type UpdateConsultantPayload } from '@/services/consultantsService'

export const useConsultantsStore = defineStore('consultants', () => {
  const consultants = ref<Consultant[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchConsultants() {
    loading.value = true
    error.value = null
    try {
      consultants.value = await consultantsService.getAll()
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch consultants'
    } finally {
      loading.value = false
    }
  }

  async function createConsultant(payload: CreateConsultantPayload) {
    loading.value = true
    error.value = null
    try {
      const newConsultant = await consultantsService.create(payload)
      consultants.value.push(newConsultant)
      return newConsultant
    } catch (err: any) {
      error.value = err.message || 'Failed to create consultant'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateConsultant(id: number, payload: UpdateConsultantPayload) {
    loading.value = true
    error.value = null
    try {
      const updatedConsultant = await consultantsService.update(id, payload)
      const index = consultants.value.findIndex(c => c.id === id)
      if (index !== -1) {
        consultants.value[index] = updatedConsultant
      }
      return updatedConsultant
    } catch (err: any) {
      error.value = err.message || 'Failed to update consultant'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteConsultant(id: number) {
    loading.value = true
    error.value = null
    try {
      await consultantsService.delete(id)
      consultants.value = consultants.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Failed to delete consultant'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    consultants,
    loading,
    error,
    fetchConsultants,
    createConsultant,
    updateConsultant,
    deleteConsultant
  }
})
