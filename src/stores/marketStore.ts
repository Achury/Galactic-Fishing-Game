import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchMarket } from '@/api/game';
import type { MarketItem, ApiError } from '@/types/gameTypes';

export const useMarketStore = defineStore('market', () => {
  const items = ref<MarketItem[]>([]);
  const isLoading = ref(false);
  const error = ref<ApiError | null>(null);
  const loadItems = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      items.value = await fetchMarket();
    } catch (err) {
      error.value = err as ApiError;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    items,
    isLoading,
    error,
    loadItems,
  };
});
