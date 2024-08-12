import axios from "axios";

/**
 * Fetches historical data for a given cryptocurrency symbol from the Binance API.
 *
 * This function retrieves hourly historical price data for the specified cryptocurrency symbol
 * and transforms it into a format suitable for charting.
 *
 * @param {string} symbol - The cryptocurrency symbol (e.g., "BTCUSDT") for which historical data is to be fetched.
 * @returns {Promise<Array<{ x: number, y: number }>>} A promise that resolves to an array of objects containing
 *          `x` (timestamp in milliseconds) and `y` (closing price) for each data point.
 *
 * @throws {Error} Throws an error if the request to the Binance API fails.
 *
 * @example
 * ```typescript
 * const historicalData = await getHistoricalData('BTCUSDT');
 * console.log(historicalData);
 * ```
 */
export const getHistoricalData = async (
  symbol: string
): Promise<Array<{ x: number; y: number }>> => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_HISTORY_URL}/api/v3/klines?symbol=${symbol}&interval=1h&limit=24`
    );
    const data: [number, string, string, string, string, string][] =
      response.data;

    return data.map(([timestamp, , , , close]) => ({
      x: new Date(timestamp).getTime(),
      y: parseFloat(close),
    }));
  } catch (error) {
    console.error("Error fetching historical data:", error);
    return [];
  }
};
