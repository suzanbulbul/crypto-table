import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Type
import { CoinData } from "../type/coin";

// Constants
import { COINS } from "../constants/coins";

const useWebSocket = (url: string) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
      setLoading(true);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const data = message.data;

      const formattedData: CoinData = {
        symbol: data.s,
        lastPrice: data.c,
        priceChangePercent: data.P,
        marketvalue: data.v,
      };

      queryClient.setQueryData(
        ["queryData", formattedData.symbol],
        formattedData
      );

      setData((prevData) => {
        const updatedData = [...prevData];
        const index = updatedData.findIndex(
          (item) => item.symbol === formattedData.symbol
        );

        if (index !== -1) {
          updatedData[index] = formattedData;
        } else {
          updatedData.push(formattedData);
        }

        const sortedData = COINS.map((coin) =>
          updatedData.find(
            (data) => data.symbol === `${coin.code.toUpperCase()}USDT`
          )
        ).filter((data) => data !== undefined) as CoinData[];

        return sortedData;
      });

      setLoading(false);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      setLoading(false);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event.reason);
      setLoading(false);
    };

    return () => {
      socket.close();
    };
  }, [url, queryClient]);

  return { data, loading };
};

export default useWebSocket;
