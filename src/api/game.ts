import axios, { AxiosError } from 'axios';
import type { Player, MarketItem, ApiError } from '@/types/gameTypes';

const api = axios.create({
  baseURL: 'https://api-game.bloque.app/game',
  timeout: 5000,
});

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
    const { data } = await api.get<{ players: Player[] }>('/leaderboard');

    return data.players
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
    const { data } = await api.get<{ items: MarketItem[] }>('/market');
    return data.items.sort((a: MarketItem, b: MarketItem) => a.cost - b.cost);
  } catch (error) {
    throw handleApiError(error);
  }
};
