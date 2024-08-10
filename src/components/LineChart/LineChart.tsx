import { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { getHistoricalData } from "../../api/HistoricalData";

interface KlineData {
  x: number;
  y: number;
}

const LineChart = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<KlineData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const historicalData = await getHistoricalData(symbol);
      setData(historicalData);
    };

    fetchData();
  }, [symbol]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      sparkline: {
        enabled: true,
      },
    },
    colors: [data[0]?.y > data[data.length - 1]?.y ? "#FF4560" : "#00E396"],
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
      data: data,
    },
  ];

  return (
    <ApexCharts options={options} series={series} type="line" height={50} />
  );
};

export default LineChart;
