<template>
  <div
    v-if="error"
    class="p-4 mb-4 text-red-700 bg-red-100 rounded-lg flex justify-between items-center"
  >
    <div>
      <p class="font-medium">{{ error.message }}</p>
      <p v-if="error.code" class="text-xs mt-1">Error code: {{ error.code }}</p>
    </div>
    <button
      @click="onRetry"
      class="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Retry
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ApiError } from '@/types/gameTypes';

defineProps<{
  error: ApiError | null;
  onRetry: () => void;
}>();
</script>
