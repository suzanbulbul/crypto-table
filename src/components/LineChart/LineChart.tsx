import ApexCharts from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getHistoricalData } from "../../api/HistoricalData";

/**
 * Represents historical data for the line chart.
 *
 * @typedef {Object} HistoricalDataProps
 * @property {number} x - The x-axis value (timestamp).
 * @property {number} y - The y-axis value (price or value).
 */

/**
 * LineChart component renders a sparkline chart for the given cryptocurrency symbol.
 *
 * This component uses `react-apexcharts` to render a small line chart displaying the historical
 * data of a cryptocurrency. The chart adapts its color based on whether the price has increased or
 * decreased over the period.
 *
 * @param {Object} props - The component props.
 * @param {string} props.symbol - The cryptocurrency symbol to fetch historical data for.
 * @param {number} [props.height=32] - The height of the chart in pixels. Defaults to 32.
 * @param {number} [props.width=64] - The width of the chart in pixels. Defaults to 64.
 *
 * @returns {JSX.Element} The rendered LineChart component.
 */

interface HistoricalDataProps {
  x: number;
  y: number;
}

const LineChart = ({
  symbol,
  height = 32,
  width = 64,
}: {
  symbol: string;
  height?: number;
  width?: number;
}) => {
  const { data } = useQuery<HistoricalDataProps[]>({
    queryKey: ["historical-data", symbol],
    queryFn: async () => {
      try {
        const response = await getHistoricalData(symbol);
        return response;
      } catch (error) {
        throw new Error("Failed to fetch historical data");
      }
    },
    enabled: !!symbol,
  });

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    colors: [
      data && data[0]?.y > data[data.length - 1]?.y ? "#dc2625" : "#17a34a",
    ],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    tooltip: {
      enabled: false,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: data || [],
    },
  ];

  return (
    <ApexCharts
      options={options}
      series={series}
      type="line"
      height={height}
      width={width}
    />
  );
};

export default LineChart;
