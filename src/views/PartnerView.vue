<template>
  <div class="p-4 md:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-xl md:text-2xl font-bold text-gray-800">{{ partnerName }} Clients</h1>
        <p class="text-sm text-gray-500 mt-1">View all clients associated with {{ partnerName }}</p>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Search Field -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by company name..."
              class="w-full px-3 py-2 pl-9 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <svg
              class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Consultant Filter -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Consultant</label>
          <select
            v-model="filterConsultant"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          >
            <option value="">All Consultants</option>
            <option
              v-for="consultant in consultantsStore.consultants"
              :key="consultant.id"
              :value="consultant.id"
            >
              {{ consultant.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- Clear Filters Button -->
      <div class="mt-4 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Showing <span class="font-semibold">{{ partnerStore.clients.length }}</span> client{{
            partnerStore.clients.length !== 1 ? 's' : ''
          }}
        </p>
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="partnerStore.loading" class="flex items-center justify-center py-12">
      <div
        class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="partnerStore.error"
      class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm"
    >
      {{ partnerStore.error }}
    </div>

    <!-- Clients Table -->
    <div
      v-if="!partnerStore.loading && !partnerStore.error"
      class="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Consultant
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr
              v-for="client in partnerStore.clients"
              :key="client.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ client.name }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ client.assigned_consultant_name || 'Unassigned' }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  v-if="client.status"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="{
                    'bg-green-100 text-green-800': client.status === 'GO-LIVE',
                    'bg-gray-100 text-gray-800': client.status !== 'GO-LIVE',
                  }"
                >
                  {{ client.status }}
                </span>
                <span v-else class="text-gray-400 italic">No status</span>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div
          v-if="partnerStore.clients.length === 0"
          class="text-center py-12"
        >
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          <p class="mt-1 text-sm text-gray-500">
            There are currently no clients associated with {{ partnerName }}.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePartnerStore } from '@/stores/partnerStore'
import { useConsultantsStore } from '@/stores/consultantsStore'

const route = useRoute()
const router = useRouter()
const partnerStore = usePartnerStore()
const consultantsStore = useConsultantsStore()

// Filter states
const searchQuery = ref('')
const filterConsultant = ref('')

// Valid partners list
const validPartners = ['Globe', 'RCBC', 'SME', 'TAI']

// Get partner from route params and validate
const partnerParam = computed(() => route.params.partner as string)
const partnerName = computed(() => {
  const partner = partnerParam.value
  // Capitalize first letter and make case-insensitive match
  const formattedPartner = partner.charAt(0).toUpperCase() + partner.slice(1).toLowerCase()
  
  // Check if it's a valid partner (case-insensitive)
  const validPartner = validPartners.find(
    p => p.toLowerCase() === formattedPartner.toLowerCase()
  )
  
  return validPartner || partner
})

// Check if partner is valid
const isValidPartner = computed(() => {
  return validPartners.some(
    p => p.toLowerCase() === partnerParam.value.toLowerCase()
  )
})

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return !!(
    searchQuery.value.trim() ||
    filterConsultant.value
  )
})

// Clear all filters
const clearFilters = () => {
  searchQuery.value = ''
  filterConsultant.value = ''
}

// Fetch clients with current filters
const fetchClientsWithFilters = () => {
  const params: any = {
    partner_type: partnerName.value
  }
  
  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim()
  }
  if (filterConsultant.value) {
    params.assigned_consultant_id = Number(filterConsultant.value)
  }
  
  partnerStore.fetchPartnerClients(params)
}

// Watch for filter changes and refetch
watch(
  [searchQuery, filterConsultant],
  () => {
    fetchClientsWithFilters()
  },
  { deep: true }
)

// Watch for route parameter changes (when switching between partners)
watch(
  () => route.params.partner,
  (newPartner, oldPartner) => {
    if (newPartner !== oldPartner) {
      // Redirect to dashboard if invalid partner
      if (!isValidPartner.value) {
        router.push('/dashboard')
        return
      }
      
      // Clear filters when switching partners
      searchQuery.value = ''
      filterConsultant.value = ''
      
      // Fetch clients for the new partner
      fetchClientsWithFilters()
    }
  }
)

onMounted(async () => {
  // Redirect to dashboard if invalid partner
  if (!isValidPartner.value) {
    router.push('/dashboard')
    return
  }

  // Fetch consultants for the filter dropdown
  await consultantsStore.fetchConsultants()
  
  // Fetch clients for this partner
  fetchClientsWithFilters()
})

// Clean up when component is unmounted
onUnmounted(() => {
  partnerStore.clearClients()
})
</script>
