import { Injectable } from '@angular/core';
import { CoinChangeResult } from '../models/coin-change';

@Injectable()
export class CoinChangeService {
  public calculateGreedy(amount: number, coins: number[]): CoinChangeResult {
    const breakdown: { coin: number; count: number }[] = [];
    let remaining = amount;

    for (const coin of coins) {
      if (coin <= 0) continue;

      const count = Math.floor(remaining / coin);
      if (count > 0) {
        breakdown.push({ coin, count });
        remaining -= coin * count;
      }
    }

    const totalCoins = breakdown.reduce((sum, item) => sum + item.count, 0);

    return {
      totalCoins,
      breakdown,
    };
  }
}
