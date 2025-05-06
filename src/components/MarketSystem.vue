<template>
  <div class="card w-full">
    <div class="flex justify-between items-center mb-2 xs:mb-3 sm:mb-4">
      <h2 class="text-base xs:text-lg sm:text-xl font-bold text-accent">
        Market
      </h2>
    </div>

    <LoadingSpinner :show="market.isLoading" />
    <ErrorDisplay :error="market.error" :on-retry="market.loadItems" />

    <div v-if="!market.isLoading" class="grid gap-2 xs:gap-3 sm:gap-4">
      <div
        v-for="item in market.items"
        :key="item.id"
        class="bg-gray-700 p-2 xs:p-3 sm:p-4 rounded-lg hover:shadow-md transition border border-gray-600"
      >
        <h3
          class="font-bold text-blue-400 text-xs xs:text-sm sm:text-base line-clamp-1"
        >
          {{ item.name }}
        </h3>
        <p
          class="text-gray-300 my-1 xs:my-2 text-xxs xs:text-xs sm:text-sm line-clamp-2"
        >
          {{ item.description }}
        </p>
        <div class="flex justify-between items-center mt-1 xs:mt-2 sm:mt-4">
          <span
            class="font-medium text-yellow-400 text-xxs xs:text-xs sm:text-sm"
            >{{ formatGold(item.cost) }} gold</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMarketStore } from '@/stores/marketStore';
import { onMounted } from 'vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorDisplay from '@/components/ErrorDisplay.vue';
import { formatGold } from '@/utils/formatters';

const market = useMarketStore();

onMounted(() => {
  market.loadItems().catch((err) => {
    console.error('Market loading failed:', err);
  });
});
</script>
