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
  return (
    <div className="w-full max-w-4xl mx-auto h-[400px] p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Cochin Shipyard Stock Price</h2>
      <div className="relative h-[350px]">
        <Chart type="line" data={data} options={options} />
      </div>
    </div>
  );
}