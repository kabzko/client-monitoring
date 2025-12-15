<template>
  <div class="p-4 md:p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">Clients</h1>
    </div>

    <!-- Loading State -->
    <div v-if="clientsStore.loading" class="flex items-center justify-center py-12">
      <div
        class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="clientsStore.error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm"
    >
      {{ clientsStore.error }}
    </div>

    <!-- Mobile Cards View -->
    <div v-else class="block lg:hidden space-y-4">
      <div
        v-for="client in clientsStore.clients"
        :key="client.id"
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h3 class="font-medium text-gray-900">{{ client.name }}</h3>
            <p class="text-sm text-gray-500">{{ client.email }}</p>
          </div>
          <span
            :class="client.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'"
            class="px-2 py-1 text-xs font-medium rounded-full"
          >
            {{ client.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-gray-100">
          <span class="text-sm text-gray-500">
            {{ client.assigned_consultant_name || 'Unassigned' }}
          </span>
          <button
            v-if="client.assigned_consultant"
            @click="openUnassignModal(client)"
            class="text-sm text-orange-500 hover:text-orange-700 font-medium"
          >
            Unassign
          </button>
          <button
            v-else
            @click="openAssignModal(client)"
            class="text-sm text-green-500 hover:text-green-700 font-medium"
          >
            Assign
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div
      v-if="!clientsStore.loading && !clientsStore.error"
      class="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Consultant
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="client in clientsStore.clients" :key="client.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ client.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ client.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ client.assigned_consultant_name || 'Unassigned' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  v-if="client.assigned_consultant_name"
                  @click="openUnassignModal(client)"
                  class="text-orange-500 hover:text-orange-700"
                >
                  Unassign
                </button>
                <button
                  v-else
                  @click="openAssignModal(client)"
                  class="text-green-500 hover:text-green-700"
                >
                  Assign
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Assign Modal -->
    <div
      v-if="showAssignModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">Assign Consultant</h2>
        <p class="text-sm text-gray-600 mb-4">
          Assign a consultant to <span class="font-medium">{{ selectedClient?.name }}</span>
        </p>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Select Consultant</label>
          <select
            v-model="selectedConsultantId"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          >
            <option value="">Choose a consultant...</option>
            <option
              v-for="consultant in consultantsStore.consultants"
              :key="consultant.id"
              :value="consultant.id"
            >
              {{ consultant.name }} - {{ consultant.phone }}
            </option>
          </select>
        </div>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            @click="closeAssignModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-center"
          >
            Cancel
          </button>
          <button
            @click="handleAssign"
            :disabled="!selectedConsultantId || clientsStore.loading"
            class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span
              v-if="clientsStore.loading"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"
            ></span>
            Assign
          </button>
        </div>
      </div>
    </div>

    <!-- Unassign Modal -->
    <div
      v-if="showUnassignModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">Unassign Consultant</h2>
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to unassign the consultant from
          <span class="font-medium">{{ selectedClient?.name }}</span
          >?
        </p>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button
            @click="closeUnassignModal"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-center"
          >
            Cancel
          </button>
          <button
            @click="handleUnassign"
            :disabled="clientsStore.loading"
            class="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span
              v-if="clientsStore.loading"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"
            ></span>
            Unassign
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientsStore } from '@/stores/clientsStore'
import { useConsultantsStore } from '@/stores/consultantsStore'
import type { Client } from '@/services/clientsService'

const clientsStore = useClientsStore()
const consultantsStore = useConsultantsStore()

const showAssignModal = ref(false)
const showUnassignModal = ref(false)
const selectedClient = ref<Client | null>(null)
const selectedConsultantId = ref<number | string>('')

onMounted(() => {
  clientsStore.fetchClients()
  consultantsStore.fetchConsultants()
})

const openAssignModal = (client: Client) => {
  selectedClient.value = client
  selectedConsultantId.value = ''
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedClient.value = null
  selectedConsultantId.value = ''
}

const handleAssign = async () => {
  if (selectedClient.value && selectedConsultantId.value) {
    try {
      await clientsStore.assignConsultant(Number(selectedConsultantId.value), {
        company_id: selectedClient.value.id,
        consultant_id: Number(selectedConsultantId.value),
      })
      closeAssignModal()
      clientsStore.fetchClients()
    } catch (err) {
      // Error handled by store
    }
  }
}

const openUnassignModal = (client: Client) => {
  selectedClient.value = client
  showUnassignModal.value = true
}

const closeUnassignModal = () => {
  showUnassignModal.value = false
  selectedClient.value = null
}

const handleUnassign = async () => {
  if (selectedClient.value && selectedClient.value.assigned_consultant) {
    try {
      await clientsStore.unassignConsultant(selectedClient.value.assigned_consultant, {
        company_id: selectedClient.value.id,
      })
      closeUnassignModal()
      clientsStore.fetchClients()
    } catch (err) {
      // Error handled by store
    }
  }
}
</script>
