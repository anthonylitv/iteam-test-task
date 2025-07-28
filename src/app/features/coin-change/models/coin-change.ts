export interface CoinChangeResult {
  totalCoins: number;
  breakdown: {
    coin: number;
    count: number;
  }[];
}
