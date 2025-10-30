<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">
        Select Service
      </h1>
      <p class="text-2xl text-gray-600">
        Choose the department you need
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-20">
      <div class="animate-spin rounded-full h-32 w-32 border-b-4 border-primary mx-auto"></div>
      <p class="mt-6 text-2xl text-gray-600">Loading services...</p>
    </div>

    <!-- Service Cards -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
      <div
        v-for="service in services"
        :key="service.id"
        @click="selectService(service)"
        class="service-card"
      >
        <div class="flex items-center gap-6">
          <div class="text-7xl">{{ getServiceIcon(service.name) }}</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-900 mb-2">
              {{ service.name }}
            </h3>
            <p class="text-xl text-gray-600">
              ⏱️ Est. {{ service.estimated_time }} minutes
            </p>
            <p class="text-lg text-gray-500 mt-2">
              Queue: {{ service.prefix }}
            </p>
          </div>
          <div class="text-primary text-6xl">→</div>
        </div>
      </div>
    </div>

    <!-- Back Button -->
    <div class="fixed bottom-8 left-8">
      <button
        @click="$emit('back')"
        class="kiosk-button bg-gray-200 text-gray-700 hover:bg-gray-300"
      >
        ← Back
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue'
import api from '../config/api'

const emit = defineEmits(['service-selected', 'back'])

const services = ref([])
const loading = ref(true)

const getServiceIcon = (name) => {
  const icons = {
    'General Consultation': '👨‍⚕️',
    'Laboratory Tests': '🔬',
    'Pharmacy': '💊',
    'X-Ray Department': '🩻',
    'Dental Services': '🦷',
    'Emergency Services': '🚑',
  }
  return icons[name] || '🏥'
}

const selectService = (service) => {
  emit('service-selected', service)
}

const fetchServices = async () => {
  try {
    const response = await api.get('/service-types')
    services.value = response.data.service_types
  } catch (error) {
    console.error('Failed to fetch services:', error)
    alert('Failed to load services. Please try again.')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchServices()
})
</script>