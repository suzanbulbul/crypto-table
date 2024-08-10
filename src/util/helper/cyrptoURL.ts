// Constants
import { COINS } from "../constants/coins";

export const coin = `wss://stream.binance.com:9443/stream?streams=${COINS.map(
  (coin) => `${coin}usdt@ticker`
).join("/")}`;

export const icon = "https://cdn.bilira.co/symbol/svg/${symbol}.svg";
