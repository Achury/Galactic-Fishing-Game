export interface MarketItem {
  id: string;
  name: string;
  type: 'fishing_rod' | 'poison_leveling' | 'poison_delay' | 'poison_recovery';
  description: string;
  cost: number;
}
export interface ApiError {
  message: string;
  code?: number;
  timestamp?: string;
}
export interface Player {
  rank: number;
  username: string;
  level: number;
  xp: number;
  gold: number;
}

export type GameApiError = ApiError | null;
