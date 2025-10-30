<template>
  <div class="h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
    <div class="text-center text-white space-y-8 animate-fade-in">
      <div class="text-9xl">🏥</div>
      <h1 class="text-7xl font-bold">Welcome</h1>
      <p class="text-3xl opacity-90">Hospital Queue Management</p>
      
      <button
        @click="$emit('start')"
        class="kiosk-button bg-white text-blue-600 hover:bg-blue-50 mt-12 text-4xl px-20 py-10"
      >
        👉 Tap to Check In
      </button>

      <div class="mt-16 space-y-3 opacity-75">
        <p class="text-xl">🕐 Fast & Easy</p>
        <p class="text-xl">📱 Get Your Queue Number</p>
        <p class="text-xl">⏱️ See Estimated Wait Time</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['start'])
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>