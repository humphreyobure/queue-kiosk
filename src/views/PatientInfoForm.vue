<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <div class="text-7xl mb-4">{{ getServiceIcon(selectedService.name) }}</div>
      <h1 class="text-5xl font-bold text-gray-900 mb-2">
        {{ selectedService.name }}
      </h1>
      <p class="text-2xl text-gray-600">
        Please provide your information (optional)
      </p>
    </div>

    <!-- Form -->
    <div class="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl p-12">
      <div class="space-y-8">
        <!-- Name Input -->
        <div>
          <label class="block text-2xl font-semibold text-gray-700 mb-3">
            Your Name
          </label>
          <input
            v-model="patientName"
            type="text"
            placeholder="Enter your name (optional)"
            class="w-full px-6 py-6 text-2xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            @keyup.enter="submit"
          />
        </div>

        <!-- Phone Input -->
        <div>
          <label class="block text-2xl font-semibold text-gray-700 mb-3">
            Phone Number
          </label>
          <input
            v-model="phone"
            type="tel"
            placeholder="0712345678 (optional)"
            class="w-full px-6 py-6 text-2xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            @keyup.enter="submit"
          />
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-6 pt-6">
          <button
            @click="skipInfo"
            class="flex-1 kiosk-button bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Skip →
          </button>
          <button
            @click="submit"
            :disabled="submitting"
            class="flex-1 kiosk-button bg-primary text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {{ submitting ? 'Please wait...' : 'Continue →' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Info Text -->
    <p class="text-center text-xl text-gray-500 mt-8">
      💡 Providing your info helps us serve you better
    </p>

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
import { ref, defineProps, defineEmits } from 'vue'
import api from '../config/api'

const props = defineProps({
  selectedService: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['queue-created', 'back'])

const patientName = ref('')
const phone = ref('')
const submitting = ref(false)

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

const skipInfo = () => {
  createQueue()
}

const submit = () => {
  createQueue()
}

const createQueue = async () => {
  submitting.value = true

  try {
    const response = await api.post('/queues', {
      service_type_id: props.selectedService.id,
      patient_name: patientName.value || null,
      phone: phone.value || null,
    })

    emit('queue-created', {
      queue: response.data.queue,
      position: response.data.position,
      estimated_wait: response.data.estimated_wait,
    })
  } catch (error) {
    console.error('Failed to create queue:', error)
    alert('Failed to create queue. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>