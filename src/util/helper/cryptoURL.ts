// Constants
import { COINS } from "../constants/coins";

/**
 * WebSocket URL for Binance streams, constructed based on the coins defined in the COINS array.
 * This URL is used to receive real-time ticker data for multiple cryptocurrencies.
 *
 * @example
 * // Assuming COINS array contains { code: "btc" } and { code: "eth" }
 * // The resulting URL will be:
 * // "wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker"
 */

export const coin = `${
  process.env.REACT_APP_WEBSOCKET_URL
}/stream?streams=${COINS.map((coin) => `${coin.code}usdt@ticker`).join("/")}`;

/**
 * URL template for cryptocurrency icons.
 * This template can be used to construct the URL for a specific cryptocurrency icon by replacing the
 * ${symbol} placeholder with the appropriate cryptocurrency symbol.
 *
 * @example
 * // For a symbol "btc", the resulting URL will be:
 * // "https://cdn.bilira.co/symbol/svg/btc.svg"
 */

export const icon =
  // eslint-disable-next-line no-template-curly-in-string, no-useless-concat
  `${process.env.REACT_APP_ICON_URL}/symbol/svg/` + "${symbol}.svg";
