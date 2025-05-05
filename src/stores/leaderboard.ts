import { defineStore } from 'pinia';
import { ref } from 'vue';
import { fetchLeaderboard } from '@/api/game';
import type { Player, ApiError } from '@/types/gameTypes';

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const players = ref<Player[]>([]);
  const isLoading = ref(false);
  const error = ref<ApiError | null>(null);

  const fetchLeaderboardData = async (): Promise<void> => {
    isLoading.value = true;
    error.value = null;
    try {
      players.value = await fetchLeaderboard();
    } catch (err) {
      error.value = err as ApiError;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    players,
    isLoading,
    error,
    fetchLeaderboard: fetchLeaderboardData,
  };
});
