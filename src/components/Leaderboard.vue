<template>
  <div class="card w-full">
    <div
      class="flex flex-col xs:flex-row xs:justify-between xs:items-center mb-2 xs:mb-3 sm:mb-4"
    >
      <h2 class="text-base xs:text-lg sm:text-xl font-bold text-accent">
        Leaderboard
      </h2>
      <div class="text-xxs xs:text-xs sm:text-sm text-gray-400 mt-1 xs:mt-0">
        Winner: Highest Level → Most Gold
      </div>
    </div>

    <LoadingSpinner :show="leaderboard.isLoading" />
    <ErrorDisplay
      :error="leaderboard.error"
      :on-retry="leaderboard.fetchLeaderboard"
    />

    <div v-if="!leaderboard.isLoading" class="overflow-x-auto">
      <table
        class="min-w-full divide-y divide-gray-700 text-xs xs:text-sm sm:text-base"
      >
        <thead class="bg-gray-700">
          <tr>
            <th
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 font-medium text-gray-300"
            >
              Rank
            </th>
            <th
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 font-medium text-gray-300"
            >
              Player
            </th>
            <th
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 font-medium text-gray-300"
            >
              Level
            </th>
            <th
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 font-medium text-gray-300"
            >
              Gold
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-700">
          <tr
            v-for="player in sortedPlayers"
            :key="player.rank"
            :class="{
              'bg-gradient-to-r from-yellow-400/20 to-yellow-800/10':
                player.rank === 1,
              'bg-gradient-to-r from-gray-200/20 to-gray-600/10':
                player.rank === 2,
              'bg-gradient-to-r from-amber-900/20 to-amber-800/10':
                player.rank === 3,
              'hover:bg-gray-700': player.rank > 3,
            }"
          >
            <td class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 whitespace-nowrap">
              <span
                v-if="player.rank === 1"
                class="text-lg xs:text-xl sm:text-2xl"
                >🥇</span
              >
              <span
                v-else-if="player.rank === 2"
                class="text-lg xs:text-xl sm:text-2xl"
                >🥈</span
              >
              <span
                v-else-if="player.rank === 3"
                class="text-lg xs:text-xl sm:text-2xl"
                >🥉</span
              >
              <span v-else class="text-gray-400">{{ player.rank }}</span>
            </td>
            <td
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 truncate max-w-[75px] xs:max-w-none"
            >
              {{ player.username }}
            </td>
            <td class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 text-blue-400">
              {{ player.level }}
            </td>
            <td
              class="px-1 xs:px-2 sm:px-3 py-1 xs:py-2 text-yellow-400 whitespace-nowrap"
            >
              {{ formatGold(player.gold) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useLeaderboardStore } from '@/stores/leaderboard';
import { onMounted } from 'vue';
import ErrorDisplay from './ErrorDisplay.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { formatGold } from '@/utils/formatters';

const leaderboard = useLeaderboardStore();

const sortedPlayers = computed(() => {
  return [...leaderboard.players]
    .sort((a, b) => {
      // First by level (descending), then by gold (descending)
      return b.level - a.level || b.gold - a.gold;
    })
    .map((player, index) => ({
      ...player,
      rank: index + 1,
    }));
});

onMounted(() => {
  leaderboard.fetchLeaderboard();
});
</script>
