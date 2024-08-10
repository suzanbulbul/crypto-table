import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

// Type
import { CoinData } from "../type/coin";

// Constants
import { COINS } from "../constants/coins";

const useWebSocket = (url: string) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<CoinData[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
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
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event.reason);
    };

    return () => {
      socket.close();
    };
  }, [url, queryClient]);

  return { data };
};

export default useWebSocket;
