import axios, { AxiosError } from 'axios';
import type { Player, MarketItem, ApiError } from '@/types/gameTypes';

const api = axios.create({
  baseURL: 'https://api-game.bloque.app/game',
  timeout: 5000,
});

async function fetchWithCacheFallback<T>(
  url: string,
  axiosConfig = {}
): Promise<T> {
  try {
    // First try the network request with axios
    const response = await api.get<T>(url, axiosConfig);

    // If successful, cache the response
    if (response.status === 200) {
      const cache = await caches.open('api-cache');
      const cacheResponse = new Response(JSON.stringify(response.data), {
        headers: { 'Content-Type': 'application/json' },
      });
      await cache.put(url, cacheResponse);
    }

    return response.data;
  } catch (error) {
    console.log('Network request failed, trying cache...', error);

    // If network fails, try the cache
    const cache = await caches.match(url);
    if (cache) {
      console.log('Serving from cache');
      return await cache.json();
    }
    // If no cache available, rethrow the original error
    throw error;
  }
}

function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      message: axiosError.response?.data?.message || axiosError.message,
      code: axiosError.response?.status,
      timestamp: new Date().toISOString(),
    };
  }
  return {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    timestamp: new Date().toISOString(),
  };
}

export const fetchLeaderboard = async (): Promise<Player[]> => {
  try {
    const { players } = await fetchWithCacheFallback<{ players: Player[] }>(
      '/leaderboard'
    );

    return players
      .sort((a: Player, b: Player) => b.level - a.level || b.gold - a.gold)
      .map((player: Player, index: number) => ({
        ...player,
        rank: index + 1,
      }));
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchMarket = async (): Promise<MarketItem[]> => {
  try {
    const { items } = await fetchWithCacheFallback<{ items: MarketItem[] }>(
      '/market'
    );
    return items.sort((a: MarketItem, b: MarketItem) => a.cost - b.cost);
  } catch (error) {
    throw handleApiError(error);
  }
};
