import React, { useState } from "react";

//Components
import { Table } from "../components";

//Helper
import { CRYPTO_URL, useWebSocket } from "../util/helper";

//Enum
import { COIN_SHORTCODE, COIN_NAME } from "../util/enum/crypto";

//Type
import { CoinData } from "../util/type/coin";

const Home = () => {
  const [page, setPage] = useState<number>(0);

  const { data: coinData, sparklineData } = useWebSocket(CRYPTO_URL.coin);
  

  const columns = [
    {
      title: "Name",
      cell: (item: CoinData) => (
        <div className="flex items-center gap-2">
          <img
            className="w-7 h-7 rounded-full"
            src={CRYPTO_URL.icon.replace(
              "${symbol}",
              COIN_SHORTCODE[item.symbol as keyof typeof COIN_SHORTCODE]
            )}
            alt={COIN_NAME[item.symbol as keyof typeof COIN_NAME]}
          />
          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2 text-indigo-900">
              {COIN_SHORTCODE[item.symbol as keyof typeof COIN_SHORTCODE]}
              <span className="text-sm text-gray-500 font-bold">/ USDT</span>
            </div>
            <span className="text-normal text-gray-500 font-semibold">
              {COIN_NAME[item.symbol as keyof typeof COIN_NAME]}
            </span>
          </div>
        </div>
      ),
      width: "large",
    },
    {
      title: "Price",
      cell: (item: CoinData) => `$${parseFloat(item.lastPrice).toFixed(2)}`,
      className: "text-right",
    },
    {
      title: "Market Cap",
      cell: (item: CoinData) =>
        `$${(parseFloat(item.lastPrice) * 1000000).toFixed(2)}`,
      className: "text-right",
    },
    {
      title: "24H Change",
      cell: (item: CoinData) => (
        <span
          className={
            parseFloat(item.priceChangePercent) > 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {parseFloat(item.priceChange).toFixed(2)} (
          {parseFloat(item.priceChangePercent).toFixed(2)}%)
        </span>
      ),
      className: "text-right",
    },
    {
      title: "Sparkline",
      cell: (item: CoinData) => {
        return <div className="sparkline">Grafik</div>;
      },
      className: "text-right",
    },
  ];

  return (
    <div className="container mx-auto">
      <Table
        data={coinData}
        columns={columns}
        pagination={{
          currentPage: page + 1,
          totalPage: 10,
          onNextPage: async () => {
            setPage(page + 1);
          },
          onPrevPage: async () => {
            setPage(page - 1);
          },
          setPage: () => {
            return;
          },
        }}
      />
    </div>
  );
};

export default Home;
