export type AssetType = 'stock' | 'bond' | 'etf' | 'crypto' | 'cash' | 'other';

export interface Investment {
  id: string;
  assetType: AssetType;
  symbol: string;
  quantity: number;
  purchasePrice: number;
  datePurchased: string; // ISO date
}

export interface PerformancePoint {
  date: string; // ISO date
  value: number; // index value normalized to 100
}

export interface PortfolioMetrics {
  performance: PerformancePoint[];
  benchmark: PerformancePoint[];
  allocation: Array<{ assetType: AssetType; percent: number }>; // sum ~100
}

