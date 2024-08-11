/**
 * Represents the data structure for cryptocurrency information.
 */
export type CoinData = {
  /** The symbol of the cryptocurrency (e.g., "BTCUSDT"). */
  symbol: string;
  /** The last traded price of the cryptocurrency. */
  lastPrice: string;
  /** The percentage change in price. */
  priceChangePercent: string;
  /** The market value of the cryptocurrency. */
  marketvalue: string;
};
