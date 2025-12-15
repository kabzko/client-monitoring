<template>
  <div class="p-4 md:p-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-xl md:text-2xl font-bold text-gray-800">Consultants</h1>
      <button 
        @click="openAddModal"
        class="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 w-full sm:w-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add Consultant
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="consultantsStore.loading && !consultantsStore.consultants.length" class="flex items-center justify-center py-12">
      <div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="consultantsStore.error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-sm">
      {{ consultantsStore.error }}
    </div>

    <!-- Mobile Cards View -->
    <div v-else class="block lg:hidden space-y-4">
      <div 
        v-for="consultant in consultantsStore.consultants" 
        :key="consultant.id" 
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
      >
        <div class="flex items-start justify-between mb-2">
          <div>
            <h3 class="font-medium text-gray-900">{{ consultant.name }}</h3>
            <p class="text-sm text-gray-500">{{ consultant.email }}</p>
          </div>
          <span :class="consultant.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'" class="px-2 py-1 text-xs font-medium rounded-full">
            {{ consultant.is_active ? 'Active' : 'Inactive' }}
          </span>
        </div>
        <p class="text-sm text-gray-500 mb-3">{{ consultant.phone }}</p>
        <div class="flex items-center justify-end gap-4 pt-3 border-t border-gray-100">
          <button @click="openEditModal(consultant)" class="text-sm text-blue-500 hover:text-blue-700 font-medium">Edit</button>
          <button @click="openDeleteModal(consultant)" class="text-sm text-red-500 hover:text-red-700 font-medium">Delete</button>
        </div>
      </div>
    </div>

    <!-- Desktop Table View -->
    <div v-if="!consultantsStore.loading && !consultantsStore.error" class="hidden lg:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="consultant in consultantsStore.consultants" :key="consultant.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ consultant.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ consultant.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ consultant.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="consultant.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'" class="px-2 py-1 text-xs font-medium rounded-full">
                  {{ consultant.is_active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button @click="openEditModal(consultant)" class="text-blue-500 hover:text-blue-700 mr-3">Edit</button>
                <button @click="openDeleteModal(consultant)" class="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">
          {{ isEditing ? 'Edit Consultant' : 'Add Consultant' }}
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              v-model="formData.name" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              placeholder="Enter name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              v-model="formData.email" 
              type="email" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input 
              v-model="formData.phone" 
              type="text" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
              placeholder="Enter phone"
            />
          </div>

          <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3 pt-4">
            <button 
              type="button"
              @click="closeFormModal" 
              class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-center"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="consultantsStore.loading"
              class="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <span v-if="consultantsStore.loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></span>
              {{ isEditing ? 'Update' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-4 md:p-6">
        <h2 class="text-lg md:text-xl font-semibold text-gray-800 mb-4">Delete Consultant</h2>
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to delete <span class="font-medium">{{ selectedConsultant?.name }}</span>? This action cannot be undone.
        </p>

        <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
          <button 
            @click="closeDeleteModal" 
            class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium text-center"
          >
            Cancel
          </button>
          <button 
            @click="handleDelete" 
            :disabled="consultantsStore.loading"
            class="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span v-if="consultantsStore.loading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></span>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useConsultantsStore } from '@/stores/consultantsStore'
import type { Consultant } from '@/services/consultantsService'

const consultantsStore = useConsultantsStore()

const showFormModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)
const selectedConsultant = ref<Consultant | null>(null)

const formData = reactive({
  name: '',
  email: '',
  phone: ''
})

onMounted(() => {
  consultantsStore.fetchConsultants()
})

const resetForm = () => {
  formData.name = ''
  formData.email = ''
  formData.phone = ''
}

const openAddModal = () => {
  isEditing.value = false
  resetForm()
  showFormModal.value = true
}

const openEditModal = (consultant: Consultant) => {
  isEditing.value = true
  selectedConsultant.value = consultant
  formData.name = consultant.name
  formData.email = consultant.email
  formData.phone = consultant.phone
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  selectedConsultant.value = null
  resetForm()
}

const handleSubmit = async () => {
  try {
    if (isEditing.value && selectedConsultant.value) {
      await consultantsStore.updateConsultant(selectedConsultant.value.id, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      })
    } else {
      await consultantsStore.createConsultant({
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      })
    }
    closeFormModal()
  } catch (err) {
    // Error handled by store
  }
}

const openDeleteModal = (consultant: Consultant) => {
  selectedConsultant.value = consultant
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  selectedConsultant.value = null
}

const handleDelete = async () => {
  if (selectedConsultant.value) {
    try {
      await consultantsStore.deleteConsultant(selectedConsultant.value.id)
      closeDeleteModal()
    } catch (err) {
      // Error handled by store
    }
  }
}
</script>
