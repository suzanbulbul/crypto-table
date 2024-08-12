// Constants
import { COINS } from "../constants/coins";

export const coin = `${
  process.env.REACT_APP_WEBSOCKET_URL
}/stream?streams=${COINS.map((coin) => `${coin.code}usdt@ticker`).join("/")}`;

export const icon =
  // eslint-disable-next-line no-template-curly-in-string, no-useless-concat
  `${process.env.REACT_APP_ICON_URL}/symbol/svg/` + "${symbol}.svg";
