import { useState, useEffect } from "react";

//Type
import { CoinData } from "../type/coin";
import { useQueryClient } from "@tanstack/react-query";

const useWebSocket = (url: string) => {
  const queryClient = useQueryClient();
  const [data, setData] = useState<CoinData[]>([]);
  const [sparklineData, setSparklineData] = useState<number[]>([]);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {};

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const data = message.data;

      const formattedData: CoinData = {
        symbol: data.s,
        lastPrice: data.c,
        priceChange: data.p,
        priceChangePercent: data.P,
        highPrice: data.h,
        lowPrice: data.l,
      };

      queryClient.setQueryData(
        ["queryData", formattedData.symbol],
        formattedData
      );

      const newSparklineData = [
        ...sparklineData,
        parseFloat(formattedData.lastPrice),
      ];
      if (newSparklineData.length > 24) {
        newSparklineData.shift();
      }
      setSparklineData(newSparklineData);

      setData((prevData) => {
        const index = prevData.findIndex(
          (item) => item.symbol === formattedData.symbol
        );
        if (index !== -1) {
          const updatedData = [...prevData];
          updatedData[index] = formattedData;
          return updatedData;
        }
        return [...prevData, formattedData];
      });
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {};

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url, sparklineData, queryClient]);

  return { data, sparklineData };
};

export default useWebSocket;
