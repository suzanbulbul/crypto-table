import axios from "axios";

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
