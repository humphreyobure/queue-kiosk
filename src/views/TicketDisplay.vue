<template>
  <div class="min-h-screen bg-gradient-to-br from-green-500 to-green-700 p-8 flex items-center justify-center">
    <div class="text-center text-white space-y-8 animate-fade-in">
      <!-- Success Icon -->
      <div class="text-9xl animate-bounce-once">✅</div>
      
      <h1 class="text-6xl font-bold">Success!</h1>
      <p class="text-3xl opacity-90">Your queue number is:</p>

      <!-- Ticket Number -->
      <div class="bg-white text-gray-900 rounded-3xl p-16 shadow-2xl my-8">
        <p class="text-3xl font-semibold text-gray-600 mb-4">Queue Number</p>
        <p class="text-9xl font-bold text-primary font-mono tracking-wider">
          {{ queueData.queue.ticket_number }}
        </p>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
          <p class="text-2xl opacity-90">👥 People Ahead</p>
          <p class="text-5xl font-bold mt-2">{{ queueData.position - 1 }}</p>
        </div>
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
          <p class="text-2xl opacity-90">⏱️ Estimated Wait</p>
          <p class="text-5xl font-bold mt-2">{{ queueData.estimated_wait }} min</p>
        </div>
        <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
          <p class="text-2xl opacity-90">🏥 Service</p>
          <p class="text-3xl font-bold mt-2">{{ queueData.queue.service_type.name }}</p>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-16 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
        <h3 class="text-3xl font-bold mb-6">📋 What's Next?</h3>
        <div class="space-y-4 text-xl text-left">
          <p>✓ Please wait in the waiting area</p>
          <p>✓ Watch the display screen for your number</p>
          <p>✓ Listen for announcements</p>
          <p>✓ Your number will be called soon</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-6 justify-center mt-12">
        <button
          @click="printTicket"
          class="kiosk-button bg-white text-green-600 hover:bg-green-50"
        >
          🖨️ Print Ticket
        </button>
        <button
          @click="$emit('done')"
          class="kiosk-button bg-green-800 text-white hover:bg-green-900"
        >
          ✓ Done
        </button>
      </div>

      <!-- Auto-redirect countdown -->
      <p class="text-xl opacity-75 mt-8">
        Returning to home in {{ countdown }} seconds...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'

const props = defineProps({
  queueData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['done'])

const countdown = ref(30)
let countdownInterval

const printTicket = () => {
  // Simulate printing - create a printable view
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>Queue Ticket</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 40px;
          }
          .ticket {
            border: 2px dashed #333;
            padding: 40px;
            max-width: 400px;
            margin: 0 auto;
          }
          .number {
            font-size: 72px;
            font-weight: bold;
            margin: 20px 0;
            font-family: monospace;
          }
          .info {
            margin: 10px 0;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="ticket">
          <h1>🏥 Hospital Queue System</h1>
          <hr>
          <div class="number">${props.queueData.queue.ticket_number}</div>
          <hr>
          <div class="info">
            <p><strong>Service:</strong> ${props.queueData.queue.service_type.name}</p>
            <p><strong>Position:</strong> ${props.queueData.position}</p>
            <p><strong>Estimated Wait:</strong> ${props.queueData.estimated_wait} minutes</p>
            <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          </div>
          <hr>
          <p>Please wait in the waiting area.</p>
          <p>Thank you!</p>
        </div>
      </body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
}

onMounted(() => {
  // Auto-redirect after 30 seconds
  countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      emit('done')
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
})
</script>

<style scoped>
@keyframes bounce-once {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>