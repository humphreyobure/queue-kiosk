<template>
  <div class="kiosk-app">
    <!-- Step 1: Welcome -->
    <WelcomeScreen
      v-if="currentStep === 'welcome'"
      @start="currentStep = 'services'"
    />

    <!-- Step 2: Service Selection -->
    <ServiceSelection
      v-else-if="currentStep === 'services'"
      @service-selected="handleServiceSelected"
      @back="currentStep = 'welcome'"
    />

    <!-- Step 3: Patient Info -->
    <PatientInfoForm
      v-else-if="currentStep === 'info'"
      :selected-service="selectedService"
      @queue-created="handleQueueCreated"
      @back="currentStep = 'services'"
    />

    <!-- Step 4: Ticket Display -->
    <TicketDisplay
      v-else-if="currentStep === 'ticket'"
      :queue-data="queueData"
      @done="resetKiosk"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import WelcomeScreen from './views/WelcomeScreen.vue'
import ServiceSelection from './views/ServiceSelection.vue'
import PatientInfoForm from './views/PatientInfoForm.vue'
import TicketDisplay from './views/TicketDisplay.vue'

// State management
const currentStep = ref('welcome') // 'welcome' | 'services' | 'info' | 'ticket'
const selectedService = ref(null)
const queueData = ref(null)

const handleServiceSelected = (service) => {
  selectedService.value = service
  currentStep.value = 'info'
}

const handleQueueCreated = (data) => {
  queueData.value = data
  currentStep.value = 'ticket'
}

const resetKiosk = () => {
  currentStep.value = 'welcome'
  selectedService.value = null
  queueData.value = null
}
</script>

<style>
.kiosk-app {
  min-height: 100vh;
}
</style>