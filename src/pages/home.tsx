import React, { useEffect, useState } from "react";
import classNames from "classnames";

// Components
import { Table, LineChart } from "../components";

// Helper
import { CRYPTO_URL, useWebSocket } from "../util/helper";

// Enum
import { COIN_SHORTCODE, COIN_NAME } from "../util/enum/crypto";

// Type
import { CoinData } from "../util/type/coin";

// Icons
import { DownArrow, UpArrow } from "../util/icons";

/**
 * The `Home` component fetches and displays real-time cryptocurrency data in a paginated table format.
 *
 * This component connects to a WebSocket endpoint to retrieve live data for various cryptocurrencies,
 * formats the data using enums for consistent display, and renders it in a table with pagination controls.
 * It also includes functionality for showing price trends using line charts and indicators for price changes.
 *
 * @remarks
 * - Uses `useWebSocket` hook to fetch data from the WebSocket URL specified by `CRYPTO_URL.coin`.
 *   - **Example**: `const { data: coinData, loading } = useWebSocket(CRYPTO_URL.coin);`
 * - Formats cryptocurrency data using enums `COIN_SHORTCODE` and `COIN_NAME`.
 *   - **Example**: `COIN_SHORTCODE[item.symbol as keyof typeof COIN_SHORTCODE]`
 * - Displays data in a paginated table with columns for Crypto, Price, Market Value, 24h Change, and a Line Chart.
 */
const Home = () => {
  const [page, setPage] = useState<number>(0);
  const [paginatedData, setPaginatedData] = useState<CoinData[]>([]);
  const itemsPerPage = 10;

  const { data: coinData, loading } = useWebSocket(CRYPTO_URL.coin);

  useEffect(() => {
    setPaginatedData(
      coinData.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
    );
  }, [coinData, page]);

  const columns = [
    {
      title: "Crypto",
      cell: (item: CoinData) => (
        <article className="flex items-center gap-2">
          <img
            className="w-8 h-8 rounded-full"
            src={CRYPTO_URL.icon.replace(
              // eslint-disable-next-line no-template-curly-in-string
              "${symbol}",
              COIN_SHORTCODE[item.symbol as keyof typeof COIN_SHORTCODE]
            )}
            alt={COIN_NAME[item.symbol as keyof typeof COIN_NAME]}
          />
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-row gap-1 items-baseline">
              <span className="xs:text-sm sm:text-base font-semibold text-indigo-900">
                {COIN_SHORTCODE[item.symbol as keyof typeof COIN_SHORTCODE]}
              </span>
              <span className="xs:text-sm sm:text-base font-regular text-neutral-700 font-light">
                / USDT
              </span>
            </div>
            <p className="xs:text-sm sm:text-base font-regular text-neutral-800 font-light">
              {COIN_NAME[item.symbol as keyof typeof COIN_NAME]}
            </p>
          </div>
        </article>
      ),
      width: "large",
    },
    {
      title: "Price",
      cell: (item: CoinData) => {
        const value = parseFloat(item.lastPrice);

        const formatValue = (val: number) => {
          if (val < 0.01 && val > 0) {
            return val.toFixed(7);
          }

          if (val >= 1000) {
            return val.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            });
          }

          return val.toLocaleString("en-US", {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
          });
        };

        return (
          <div className="flex flex-row justify-end items-center gap-1">
            <span className="text-indigo-900 xs:text-sm sm:text-base font-medium">
              {formatValue(value)}{" "}
            </span>
            <span className="xs:text-sm font-regular text-xs font-light text-neutral-700 ">
              USDT
            </span>
          </div>
        );
      },
      className: "text-right",
    },
    {
      title: "Market Value",
      cell: (item: CoinData) => {
        const value = Number(item.marketvalue);

        let formattedValue;
        if (value >= 1e9) {
          formattedValue = `${(value / 1e9).toFixed(2)}B`;
        } else if (value >= 1e6) {
          formattedValue = `${(value / 1e6).toFixed(2)}M`;
        } else if (value >= 1e3) {
          formattedValue = `${(value / 1e3).toFixed(2)}K`;
        } else {
          formattedValue = `${value.toFixed(2)}`;
        }

        return (
          <div className="flex flex-row justify-end items-center gap-1">
            <span className="text-indigo-900 xs:text-sm sm:text-base font-medium">
              {formattedValue}
            </span>
            <span className="xs:text-sm font-regular text-xs font-light text-neutral-700">
              USDT
            </span>
          </div>
        );
      },
      className: "text-right",
      smHidden: true,
    },
    {
      title: "24h Change",
      cell: (item: CoinData) => {
        const isPositive = parseFloat(item.priceChangePercent) > 0;

        return (
          <div className="flex flex-row justify-end items-center gap-1">
            {Number(item.priceChangePercent) !== 0 ? (
              isPositive ? (
                <UpArrow className="w-4 h-4 text-green-600" />
              ) : (
                <DownArrow className="w-4 h-4 text-red-600" />
              )
            ) : null}
            <span
              className={classNames(
                "xs:text-sm sm:text-base font-light",
                Number(item.priceChangePercent) === 0
                  ? "text-neutral-700"
                  : isPositive
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {Number(item.priceChangePercent) === 0
                ? 0
                : Math.abs(parseFloat(item.priceChangePercent)).toFixed(2)}
              %
            </span>
          </div>
        );
      },
      className: "text-right",
      smHidden: true,
    },
    {
      title: "",
      cell: (item: CoinData) => {
        return (
          <div className="flex justify-center">
            <LineChart symbol={item.symbol} />
          </div>
        );
      },
      className: "text-right",
      smHidden: true,
    },
  ];

  return (
    <Table
      data={paginatedData}
      columns={columns}
      pagination={{
        currentPage: page + 1,
        totalPage: Math.ceil(coinData.length / itemsPerPage),
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
      loading={loading}
    />
  );
};

export default Home;
