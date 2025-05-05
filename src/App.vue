<template>
  <div class="min-h-screen bg-gray-900 p-6">
    <OfflineAlert />
    <h1 class="text-3xl font-bold text-blue-400 mb-8">Bloque Challenge</h1>

    <div class="grid md:grid-cols-2 gap-6 items-start">
      <MarketSystem class="h-min" />
      <LeaderboardPanel />
    </div>
  </div>
</template>

<script setup lang="ts">
import MarketSystem from '@/components/MarketSystem.vue';
import LeaderboardPanel from '@/components/Leaderboard.vue';
import OfflineAlert from './components/OfflineAlert.vue';
</script>
