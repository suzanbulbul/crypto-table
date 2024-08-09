import React from "react";

//Components
import Table from "../components/Table.tsx";

const cryptoData = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    current_price: 26000.0,
    total_volume: 50000000000,
    market_cap_change_percentage_24h: 2.5,
    price_change_percentage_1h_in_currency: 0.5,
    price_change_percentage_24h_in_currency: 2.0,
    price_change_percentage_7d_in_currency: -1.5,
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    current_price: 1600.0,
    total_volume: 20000000000,
    market_cap_change_percentage_24h: -1.2,
    price_change_percentage_1h_in_currency: -0.3,
    price_change_percentage_24h_in_currency: -1.0,
    price_change_percentage_7d_in_currency: 5.0,
  },
];

const Home = () => {
  const columns = [
    {
      title: "Crypto",
      cell: (item: any) => (
        <div className="flex items-center items-left gap-2">
          <img className="w-7 h-7" src={item.image} alt={item.name} />

          <div className="flex flex-col">
            <div className="flex justify-between items-center gap-2 text-indigo-900">
              {item.symbol}
              <span className="text-sm text-gray-500 fomt-bold">
                / {item.symbol}
              </span>
            </div>
            <span className="text-normal text-gray-500 fomt-semibold">
              {item.name}
            </span>
          </div>
        </div>
      ),
      width: "large",
    },
    {
      title: "Price",
      cell: (item: any) => `$${item.current_price.toFixed(2)}`,
      className: "text-right",
    },
    {
      title: "Market Volume",
      cell: (item: any) => item.total_volume.toLocaleString(),
      className: "text-right",
    },
    {
      title: "24H Change",
      cell: (item: any) => (
        <span
          className={
            item.price_change_percentage_24h_in_currency > 0
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {item.price_change_percentage_24h_in_currency.toFixed(2)}%
        </span>
      ),
      className: "text-right",
    },
    {
      title: "",
      cell: (item: any) => "grafik",
      className: "text-right",
    },
  ];

  return (
    <div className="container mx-auto">
      <Table data={cryptoData} columns={columns} />
    </div>
  );
};

export default Home;
