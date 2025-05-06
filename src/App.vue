<
<template>
  <div class="min-h-screen bg-gray-900 p-2 xs:p-3 sm:p-4 md:p-6">
    <OfflineAlert />
    <h1
      class="text-xl xs:text-2xl sm:text-3xl font-bold text-blue-400 mb-4 sm:mb-6 md:mb-8"
    >
      Bloque Challenge
    </h1>

    <div
      class="flex flex-col space-y-3 xs:space-y-4 sm:space-y-6 md:grid md:grid-cols-2 md:gap-4 lg:gap-6 items-start"
    >
      <MarketSystem class="w-full" />
      <LeaderboardPanel class="w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarketSystem from '@/components/MarketSystem.vue';
import LeaderboardPanel from '@/components/Leaderboard.vue';
import OfflineAlert from './components/OfflineAlert.vue';
</script>
