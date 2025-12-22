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

    <div
      v-if="!clientsStore.loading && !clientsStore.error"
      class="lg:block bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48"
              >
                Name
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Consultant
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Imported (Employee Profile)
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                COMPANY
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                DOCS
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TRAINING
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                UTC
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                AM-1Q
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                AM-2Q
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SENT CONFIRMATION
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Original Start Date
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lockin Period
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contract Status
              </th>
              <th
                class="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STATUS
              </th>
              <th
                class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky right-0 bg-gray-50 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="client in clientsStore.clients"
              :key="client.id"
              class="group hover:bg-gray-50"
            >
              <td class="px-2 py-2 text-sm font-medium text-gray-900 w-48">
                <div class="line-clamp-3">{{ client.name }}</div>
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {{ client.assigned_consultant_name || 'Unassigned' }}
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.is_employee_profile_imported" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_company" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_docs" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_training" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_utc" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_am_1q" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.has_am_2q" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                <input type="checkbox" v-model="client.is_confirmation_sent" disabled />
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {{ client.original_start_date }}
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {{ client.lock_in_period_date }}
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {{ client.contract_status }}
              </td>
              <td class="px-2 py-2 text-center whitespace-nowrap text-sm text-gray-500">
                {{ client.status }}
              </td>
              <td
                class="px-2 py-2 whitespace-nowrap text-sm text-gray-500 sticky right-0 bg-white group-hover:bg-gray-50 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.1)]"
              >
                <button
                  @click="openUpdateClientDetailsModal(client)"
                  class="text-green-500 hover:text-green-700"
                >
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Update Client Details Modal -->
    <div
      v-if="showUpdateClientDetailsModal && selectedClient"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      @click.self="closeUpdateClientDetailsModal"
    >
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 class="text-xl font-semibold text-gray-800">Update Client Details</h2>
            <p class="text-sm text-gray-500 mt-1">
              Editing: <span class="font-medium text-gray-700">{{ selectedClient?.name }}</span>
            </p>
          </div>
          <button
            @click="closeUpdateClientDetailsModal"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Modal Body - Scrollable -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          <!-- Consultant Assignment Section -->
          <div class="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <label class="block text-sm font-semibold text-blue-800 mb-2"
              >Assigned Consultant</label
            >
            <select
              v-model="selectedClient.assigned_consultant_id"
              class="w-full px-3 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm"
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

          <!-- Checklist Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Checklist Items
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <!-- Toggle: Imported Employee Profile -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">Employee Profile</span>
                <div class="relative">
                  <input
                    type="checkbox"
                    v-model="selectedClient.is_employee_profile_imported"
                    class="sr-only peer"
                  />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: Company -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">Company</span>
                <div class="relative">
                  <input
                    type="checkbox"
                    v-model="selectedClient.has_company"
                    class="sr-only peer"
                  />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: Docs -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">Docs</span>
                <div class="relative">
                  <input type="checkbox" v-model="selectedClient.has_docs" class="sr-only peer" />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: Training -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">Training</span>
                <div class="relative">
                  <input
                    type="checkbox"
                    v-model="selectedClient.has_training"
                    class="sr-only peer"
                  />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: UTC -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">UTC</span>
                <div class="relative">
                  <input type="checkbox" v-model="selectedClient.has_utc" class="sr-only peer" />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: AM-1Q -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">AM-1Q</span>
                <div class="relative">
                  <input type="checkbox" v-model="selectedClient.has_am_1q" class="sr-only peer" />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: AM-2Q -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">AM-2Q</span>
                <div class="relative">
                  <input type="checkbox" v-model="selectedClient.has_am_2q" class="sr-only peer" />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>

              <!-- Toggle: Sent Confirmation -->
              <label
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <span class="text-sm text-gray-700">Sent Confirmation</span>
                <div class="relative">
                  <input
                    type="checkbox"
                    v-model="selectedClient.is_confirmation_sent"
                    class="sr-only peer"
                  />
                  <div
                    class="w-10 h-5 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors"
                  ></div>
                  <div
                    class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform"
                  ></div>
                </div>
              </label>
            </div>
          </div>

          <!-- Dates Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Important Dates
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1"
                  >Original Start Date</label
                >
                <input
                  v-model="selectedClient.original_start_date"
                  type="date"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Lock-in Period</label>
                <input
                  v-model="selectedClient.lock_in_period_date"
                  type="date"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Status Section -->
          <div>
            <h3 class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Status Information
            </h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Contract Status</label>
                <select
                  v-model="selectedClient.contract_status"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Select status...</option>
                  <option value="WITHIN CONTRACT">WITHIN CONTRACT</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500 mb-1">Status</label>
                <select
                  v-model="selectedClient.status"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="">Select status...</option>
                  <option value="GO-LIVE">GO-LIVE</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl"
        >
          <button
            @click="closeUpdateClientDetailsModal"
            class="px-4 py-2.5 text-gray-700 bg-white border border-gray-300 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleUpdateClientDetails"
            :disabled="clientsStore.loading"
            class="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <span
              v-if="clientsStore.loading"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Save Changes
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

const showUpdateClientDetailsModal = ref(false)
const selectedClient = ref<Client | null>(null)

onMounted(() => {
  clientsStore.fetchClients()
  consultantsStore.fetchConsultants()
})

const openUpdateClientDetailsModal = (client: Client) => {
  selectedClient.value = JSON.parse(JSON.stringify(client))
  showUpdateClientDetailsModal.value = true
}

const closeUpdateClientDetailsModal = () => {
  showUpdateClientDetailsModal.value = false
  selectedClient.value = null
}

const handleUpdateClientDetails = async () => {
  if (selectedClient.value) {
    try {
      await clientsStore.updateClientDetails(selectedClient.value.id, {
        is_employee_profile_imported: selectedClient.value.is_employee_profile_imported,
        has_company: selectedClient.value.has_company,
        has_docs: selectedClient.value.has_docs,
        has_training: selectedClient.value.has_training,
        has_utc: selectedClient.value.has_utc,
        has_am_1q: selectedClient.value.has_am_1q,
        has_am_2q: selectedClient.value.has_am_2q,
        is_confirmation_sent: selectedClient.value.is_confirmation_sent,
        original_start_date: selectedClient.value.original_start_date,
        lock_in_period_date: selectedClient.value.lock_in_period_date,
        contract_status: selectedClient.value.contract_status,
        status: selectedClient.value.status,
        assigned_consultant_id: selectedClient.value.assigned_consultant_id,
      })
      closeUpdateClientDetailsModal()
      clientsStore.fetchClients()
    } catch (err: any) {
      console.error(err)
    }
  }
}
</script>
