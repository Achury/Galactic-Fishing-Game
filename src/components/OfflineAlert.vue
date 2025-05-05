<template>
  <transition name="slide-up">
    <div
      v-if="showOfflineAlert"
      class="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 mr-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>You're offline. Some features may be limited.</span>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useNetworkStatus } from '@/utils/network';
const { showOfflineAlert } = useNetworkStatus();
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
