import ApexCharts from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getHistoricalData } from "../../api/HistoricalData";

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
