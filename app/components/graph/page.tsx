'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
  TooltipItem,
  LineController,
  PointElement,
  LineElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  LineController,
  PointElement,
  LineElement
);

type LineDataPoint = {
  x: Date | string | number;
  y: number;
};

const lineDataPoints: LineDataPoint[] = [
  { x: new Date('2025-05-16T09:15:00'), y: 1820 },
  { x: new Date('2025-05-16T09:30:00'), y: 1880 },
  { x: new Date('2025-05-16T10:00:00'), y: 1990 },
  { x: new Date('2025-05-16T10:30:00'), y: 2040 },
  { x: new Date('2025-05-16T11:00:00'), y: 2020 },
  { x: new Date('2025-05-16T12:00:00'), y: 2042.9 },
  { x: new Date('2025-05-16T12:30:00'), y: 2055 },
  { x: new Date('2025-05-16T13:00:00'), y: 2068 },
  { x: new Date('2025-05-16T13:30:00'), y: 2060 },
  { x: new Date('2025-05-16T14:00:00'), y: 2045 },
  { x: new Date('2025-05-16T14:30:00'), y: 2050 },
  { x: new Date('2025-05-16T15:00:00'), y: 2048 },
  { x: new Date('2025-05-16T15:30:00'), y: 2035 },
];

const data: ChartData<'line', LineDataPoint[], string> = {
  datasets: [
    {
      label: 'Cochin Shipyard - Close Price',
      data: lineDataPoints,
      borderColor: '#00b386', 
      backgroundColor: 'rgba(0, 179, 134, 0.3)', 
      pointBackgroundColor: '#00b386',
      pointBorderColor: '#00b386', 
      fill: false,
      tension: 0.2,
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2, 
    },
  ],
};

const options: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'minute',
        tooltipFormat: 'HH:mm',
        displayFormats: {
          minute: 'HH:mm',
        },
       
        stepSize: 1, 
      } as any,
      ticks: {
        color: '#333',
        source: 'auto',
        autoSkip: false, 
        maxRotation: 45,
        minRotation: 45,
        font: {
          size: 10, 
        },
      },
      grid: { display: false },
      title: { display: true, text: 'Time', color: '#666' },
    },
    y: {
      beginAtZero: false,
      suggestedMin: 1750,
      suggestedMax: 2100,
      ticks: { color: '#333' },
      grid: { display: false },
      title: { display: true, text: 'Price (₹)', color: '#666' },
    },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<'line'>) => `Price: ₹${context.parsed.y}`,
      },
    },
    legend: { display: false },
  },
};

export default function StockChart() {
  const [lineDataPoints, setLineDataPoints] = useState<LineDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLineData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/buystocks/linearget");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        const formattedData: LineDataPoint[] = data.map((item: any) => ({
          x: new Date(item.x),
          y: item.y,
        }));

        setLineDataPoints(formattedData);
      } catch (error) {
        console.error("Error fetching Line data:", error);
        setError("Failed to load stock price data. Please try again later.");
        setLineDataPoints([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLineData();
  }, []);

  const data: ChartData<'line', LineDataPoint[], string> = {
    datasets: [
      {
        label: 'Cochin Shipyard - Close Price',
        data: lineDataPoints,
        borderColor: '#00b386',
        backgroundColor: 'rgba(0, 179, 134, 0.3)',
        pointBackgroundColor: '#00b386',
        pointBorderColor: '#00b386',
        fill: false,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-auto p-2 sm:p-4 bg-white rounded shadow">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center sm:text-left">
        Cochin Shipyard Stock Price
      </h2>
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full">
        {loading ? (
          <p className="text-center text-gray-500">Loading stock price data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : lineDataPoints.length > 0 ? (
          <div className="relative w-full h-full">
            <Chart type="line" data={data} options={options} />
          </div>
        ) : (
          <p className="text-center text-gray-500">No stock price data available.</p>
        )}
      </div>
    </div>
  );
}
