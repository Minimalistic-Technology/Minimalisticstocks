"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../../components/header/page";
import Image from "next/image";
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
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

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

// Tab options
type TabOption = "Overview" | "News" | "Events";
type Params = { stockname: string };
type Order = { price: string; quantity: number };
type LineDataPoint = { date: string; price: number };
type EventItem = { date?: string; title: string; subtitle: string; amount?: string; link?: string };
type NewsItem = { source: string; timestamp: string; headline: string; highlight: boolean };
type FinancialChartData = { quarter: string; revenue: number; profit: number; netWorth: number };
type FundamentalsData = {
  marketCap: string;
  peRatioTTM: number;
  pbRatio: number;
  industryPE: number;
  debtToEquity: number;
  roe: number;
  epsTTM: number;
  dividendYield: number;
  bookValue: number;
  faceValue: number;
};
type AboutData = { description: string; parentOrganisation: string; nseSymbol: string; managingDirector: string };
type StockDetails = {
  priceHistory: LineDataPoint[];
  details: {
    performance: {
      todaysLow: string;
      todaysHigh: string;
      todayCurrent: string;
      low52Week: string;
      high52Week: string;
      open: string;
      prevClose: string;
      volume: string;
      totalTradedValue: string;
      upperCircuit: string;
      lowerCircuit: string;
    };
    events: EventItem[];
    news: NewsItem[];
  };
  marketDepth: {
    buyOrderQuantity: number;
    sellOrderQuantity: number;
    buyOrders: Order[];
    sellOrders: Order[];
    bidTotal: number;
    askTotal: number;
  };
  fundamentals: FundamentalsData;
  financials: { quarterly: FinancialChartData[] };
  about: AboutData;
};

// Tabs Component
function Tabs({ activeTab, setActiveTab }: { activeTab: TabOption; setActiveTab: (tab: TabOption) => void }) {
  const tabs: TabOption[] = ["Overview", "News", "Events"];

  return (
    <div className="flex space-x-6 border-b border-gray-300 mb-6 px-4 sm:px-0 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-lg font-medium whitespace-nowrap ${
            activeTab === tab
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// FinancialChart Component
function FinancialChart({ financials }: { financials: { quarterly: FinancialChartData[] } }) {
  type Metric = "Revenue" | "Profit" | "Net Worth";
  type Timeframe = "Quarterly" | "Yearly";

  const revenueYearly = [
    { period: "2020", value: 3723 },
    { period: "2021", value: 4033 },
    { period: "2022", value: 4393 },
    { period: "2023", value: 4428 },
    { period: "2024", value: 5003 },
  ];

  const profitYearly = [
    { period: "2020", value: 450 },
    { period: "2021", value: 520 },
    { period: "2022", value: 610 },
    { period: "2023", value: 590 },
    { period: "2024", value: 670 },
  ];

  const networthYearly = [
    { period: "2020", value: 3723 },
    { period: "2021", value: 4033 },
    { period: "2022", value: 4393 },
    { period: "2023", value: 4428 },
    { period: "2024", value: 5003 },
  ];

  const [metric, setMetric] = useState<Metric>("Revenue");
  const [timeframe, setTimeframe] = useState<Timeframe>("Quarterly");

  const handleMetricChange = (m: Metric) => {
    setMetric(m);
    if (m === "Net Worth") setTimeframe("Yearly");
  };

  const handleTimeframeChange = (t: Timeframe) => {
    if (metric === "Net Worth" && t === "Quarterly") return;
    setTimeframe(t);
  };

  let data: { period: string; value: number }[] = financials.quarterly.map((item) => ({
    period: item.quarter,
    value: item.revenue,
  }));
  if (metric === "Revenue" && timeframe === "Yearly") data = revenueYearly;
  if (metric === "Profit" && timeframe === "Quarterly")
    data = financials.quarterly.map((item) => ({ period: item.quarter, value: item.profit }));
  if (metric === "Profit" && timeframe === "Yearly") data = profitYearly;
  if (metric === "Net Worth" && timeframe === "Quarterly")
    data = financials.quarterly.map((item) => ({ period: item.quarter, value: item.netWorth }));
  if (metric === "Net Worth" && timeframe === "Yearly") data = networthYearly;

  return (
    <div className="max-w-full md:max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-center md:text-left">
        Financials
      </h2>
      <p className="text-gray-600 text-xs md:text-sm text-right italic">
        *All values are in Rs Cr.
      </p>

      <div className="flex flex-wrap justify-center md:justify-start space-x-2 sm:space-x-4 border-b mb-4">
        {(["Revenue", "Profit", "Net Worth"] as Metric[]).map((m) => (
          <button
            key={m}
            onClick={() => handleMetricChange(m)}
            className={`pb-2 text-sm md:text-base font-medium ${
              metric === m
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="w-full h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis dataKey="period" tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis tick={{ fill: "#666", fontSize: 12 }} />
            <RechartsTooltip />
            <Bar dataKey="value" fill="#00b386" barSize={20}>
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex space-x-2 sm:space-x-4">
          {(["Quarterly", "Yearly"] as Timeframe[]).map((t) => {
            const isDisabled = metric === "Net Worth" && t === "Quarterly";
            return (
              <button
                key={t}
                onClick={() => handleTimeframeChange(t)}
                disabled={isDisabled}
                className={`px-4 py-1 rounded-full text-sm font-medium border ${
                  timeframe === t
                    ? "text-green-600 bg-green-100 border-green-600"
                    : "text-gray-600 border-gray-300"
                } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <button className="text-green-600 text-sm font-semibold hover:underline">
          See Details
        </button>
      </div>
    </div>
  );
}

// CompanyInfoCard Component
function CompanyInfoCard({ about }: { about: AboutData }) {
  const [expanded, setExpanded] = useState(false);
  const limit = 120;

  const isLongText = about.description.length > limit;
  const visibleText = expanded
    ? about.description
    : about.description.slice(0, limit) + (isLongText ? "..." : "");

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-6">About {about.parentOrganisation}</h2>

        <p className="text-gray-800">
          {visibleText}
          {isLongText && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="ml-2 text-green-600 font-semibold hover:underline focus:outline-none"
            >
              {expanded ? "Read Less" : "Read More"}
            </button>
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 items-start">
          <div className="space-y-6 pr-4">
            <div className="grid grid-cols-[160px_1fr] gap-2">
              <p className="text-gray-700 font-semibold">Parent Organisation</p>
              <span className="text-black font-medium">{about.parentOrganisation}</span>
            </div>
            <div className="grid grid-cols-[160px_1fr] gap-2">
              <p className="text-gray-700 font-semibold">Managing Director</p>
              <span className="text-black font-medium">{about.managingDirector}</span>
            </div>
          </div>

          <div className="border border-dashed border-gray-300 sm:border-l sm:border-t-0 my-4 sm:my-0" />

          <div className="grid grid-cols-[160px_1fr] gap-2">
            <p className="text-gray-600 font-semibold">NSE Symbol</p>
            <p className="text-green-600 text-2xl font-bold">{about.nseSymbol}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Overview Component
function Overview({ details, marketDepth, fundamentals }: { details: StockDetails["details"]; marketDepth: StockDetails["marketDepth"]; fundamentals: FundamentalsData }) {
  const todayLow = parseFloat(details.performance.todaysLow.replace("₹", ""));
  const todayHigh = parseFloat(details.performance.todaysHigh.replace("₹", ""));
  const todayCurrent = parseFloat(details.performance.todayCurrent.replace("₹", ""));

  const low52W = parseFloat(details.performance.low52Week.replace("₹", ""));
  const high52W = parseFloat(details.performance.high52Week.replace("₹", ""));
  const current52W = todayCurrent;

  const getPositionPercent = (low: number, high: number, current: number) => {
    return ((current - low) / (high - low)) * 100;
  };

  const todayPos = getPositionPercent(todayLow, todayHigh, todayCurrent);
  const pos52W = getPositionPercent(low52W, high52W, current52W);

  const stats = [
    { label: "Market Cap", value: fundamentals.marketCap },
    { label: "P/E Ratio (TTM)", value: fundamentals.peRatioTTM.toString() },
    { label: "P/B Ratio", value: fundamentals.pbRatio.toString() },
    { label: "Industry P/E", value: fundamentals.industryPE.toString() },
    { label: "Debt to Equity", value: fundamentals.debtToEquity.toString() },
    { label: "Open", value: details.performance.open },
    { label: "Prev Close", value: details.performance.prevClose },
    { label: "Volume", value: details.performance.volume },
    { label: "Avg. Traded Price", value: details.performance.totalTradedValue },
    { label: "Upper Circuit", value: details.performance.upperCircuit },
    { label: "Lower Circuit", value: details.performance.lowerCircuit },
  ];

  const maxBidQty = Math.max(...marketDepth.buyOrders.map((b) => b.quantity));
  const maxAskQty = Math.max(...marketDepth.sellOrders.map((a) => a.quantity));

  const buyPercentage = (marketDepth.buyOrderQuantity / (marketDepth.buyOrderQuantity + marketDepth.sellOrderQuantity)) * 100;
  const sellPercentage = (marketDepth.sellOrderQuantity / (marketDepth.buyOrderQuantity + marketDepth.sellOrderQuantity)) * 100;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-sm text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Performance</h2>

        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="font-semibold">Today's Low</p>
            <p>{details.performance.todaysLow}</p>
          </div>

          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-1 bg-green-500 relative rounded">
              <div
                className="absolute text-gray-600 top-3"
                style={{
                  left: `${todayPos}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ▲
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold">Today's High</p>
            <p>{details.performance.todaysHigh}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="font-semibold">52W Low</p>
            <p>{details.performance.low52Week}</p>
          </div>

          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-1 bg-green-500 relative rounded">
              <div
                className="absolute text-gray-600 top-3"
                style={{
                  left: `${pos52W}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ▲
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold">52W High</p>
            <p>{details.performance.high52Week}</p>
          </div>
        </div>

        <hr className="border-t border-dashed border-gray-300 my-4" />

        <div className="flex flex-wrap justify-between gap-y-4 text-sm">
          {stats.map((item, idx) => (
            <div key={idx} className="flex flex-col pr-4">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Market Depth</h2>

        <div className="text-sm font-medium text-gray-700 flex justify-between mb-1">
          <span>Buy order quantity</span>
          <span>Sell order quantity</span>
        </div>
        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
          <div
            className="absolute left-0 top-0 h-full bg-green-500"
            style={{ width: `${buyPercentage}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-red-500"
            style={{ width: `${sellPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mb-4">
          <span>{buyPercentage.toFixed(2)}%</span>
          <span>{sellPercentage.toFixed(2)}%</span>
        </div>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h3 className="font-medium mb-2">Bid Price</h3>
            {marketDepth.buyOrders.map((bid, idx) => (
              <div
                key={idx}
                className="mb-3 flex justify-between items-center relative hover:bg-green-50 cursor-pointer px-2 py-1 rounded-lg"
              >
                <span>{bid.price}</span>
                <span className="relative z-10 w-24 text-end">
                  <span className="relative z-20 text-green-600 font-medium">
                    {bid.quantity}
                  </span>
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-5 bg-green-100 rounded"
                    style={{
                      width: `${(bid.quantity / maxBidQty) * 100}%`,
                      zIndex: 0,
                    }}
                  />
                </span>
              </div>
            ))}
            <p className="mt-2 font-semibold">Bid Total: {marketDepth.bidTotal.toLocaleString()}</p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Ask Price</h3>
            {marketDepth.sellOrders.map((ask, idx) => (
              <div
                key={idx}
                className="mb-3 flex justify-between items-center relative hover:bg-green-50 cursor-pointer px-2 py-1 rounded-lg"
              >
                <span>{ask.price}</span>
                <span className="relative z-10 w-20 text-end">
                  <span className="relative z-20 text-red-600 font-medium">
                    {ask.quantity}
                  </span>
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-4 bg-red-100 rounded"
                    style={{
                      width: `${(ask.quantity / maxAskQty) * 100}%`,
                      zIndex: 0,
                    }}
                  />
                </span>
              </div>
            ))}
            <p className="mt-2 font-semibold">Ask Total: {marketDepth.askTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white rounded-xl shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Fundamentals</h2>

        <div className="grid grid-cols-2 gap-x-6 text-sm">
          <div className="flex flex-col gap-3 pr-4">
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span className="font-semibold">{fundamentals.marketCap}</span>
            </div>
            <div className="flex justify-between">
              <span>P/E Ratio (TTM)</span>
              <span className="font-semibold">{fundamentals.peRatioTTM}</span>
            </div>
            <div className="flex justify-between">
              <span>P/B Ratio</span>
              <span className="font-semibold">{fundamentals.pbRatio}</span>
            </div>
            <div className="flex justify-between">
              <span>Industry P/E</span>
              <span className="font-semibold">{fundamentals.industryPE}</span>
            </div>
            <div className="flex justify-between">
              <span>Debt to Equity</span>
              <span className="font-semibold">{fundamentals.debtToEquity}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-gray-300">
            <div className="flex justify-between">
              <span>ROE</span>
              <span className="font-semibold">{fundamentals.roe}%</span>
            </div>
            <div className="flex justify-between">
              <span>EPS (TTM)</span>
              <span className="font-semibold">{fundamentals.epsTTM}</span>
            </div>
            <div className="flex justify-between">
              <span>Dividend Yield</span>
              <span className="font-semibold">{fundamentals.dividendYield}%</span>
            </div>
            <div className="flex justify-between">
              <span>Book Value</span>
              <span className="font-semibold">{fundamentals.bookValue}</span>
            </div>
            <div className="flex justify-between">
              <span>Face Value</span>
              <span className="font-semibold">{fundamentals.faceValue}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs items-center gap-1 flex">
          <span>Understand Fundamentals</span>
          <div className="cursor-pointer hover:underline">
            <span className="text-gray-400">ⓘ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// NewsSection Component
function NewsSection({ news }: { news: NewsItem[] }) {
  // Ensure news data is stable and consistent between server and client
  const stableNews = Array.isArray(news) ? news : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4">
        {stableNews.length > 0 ? (
          stableNews.map(({ source, timestamp, headline }, idx) => (
            <div
              key={`${source}-${timestamp}-${idx}`}
              className="p-4 rounded transition-all duration-300 hover:bg-green-50 cursor-pointer"
            >
              <div className="text-sm text-gray-500 mb-1">
                <strong>{source}</strong> · {timestamp}
              </div>
              <p className="text-sm text-gray-800">{headline}</p>
            </div>
          ))
        ) : (
          <p>No news data available.</p>
        )}
      </div>
    </div>
  );
}

// StockChart Component
function StockChart({ stockName, priceHistory }: { stockName: string; priceHistory?: LineDataPoint[] }) {
  // Defensive check for priceHistory
  const stablePriceHistory = Array.isArray(priceHistory) ? priceHistory : [];

  // Determine the appropriate time unit based on the data range
  const getTimeUnit = (data: LineDataPoint[]) => {
    if (data.length < 2) return 'day'; // Default to day if not enough data
    const dates = data.map((point) => new Date(point.date).getTime());
    const minDate = Math.min(...dates);
    const maxDate = Math.max(...dates);
    const timeSpan = maxDate - minDate; // in milliseconds

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = 7 * oneDay;
    const oneMonth = 30 * oneDay;

    if (timeSpan > oneMonth) {
      return 'day';
    } else if (timeSpan > oneWeek) {
      return 'hour';
    } else {
      return 'minute';
    }
  };

  const timeUnit = getTimeUnit(stablePriceHistory);

  const data: ChartData<'line', { x: Date; y: number }[], string> = {
    datasets: [
      {
        label: `${stockName} - Close Price`,
        data: stablePriceHistory.map((point) => ({ x: new Date(point.date), y: point.price })),
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

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeUnit,
          tooltipFormat: timeUnit === 'day' ? 'MMM dd, yyyy' : timeUnit === 'hour' ? 'MMM dd, HH:mm' : 'HH:mm',
          displayFormats: {
            minute: 'HH:mm',
            hour: 'HH:mm',
            day: 'MMM dd',
          },
        },
        ticks: {
          color: '#333',
          source: 'auto',
          autoSkip: true,
          maxTicksLimit: 10,
          maxRotation: 45,
          minRotation: 45,
          font: { size: 10 },
        },
        grid: { display: false },
        title: { display: true, text: 'Time', color: '#666' },
      },
      y: {
        beginAtZero: false,
        suggestedMin: stablePriceHistory.length > 0 ? Math.min(...stablePriceHistory.map((p) => p.price)) - 10 : 0,
        suggestedMax: stablePriceHistory.length > 0 ? Math.max(...stablePriceHistory.map((p) => p.price)) + 10 : 100,
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

  return (
    <div className="w-full max-w-4xl mx-auto h-auto p-2 sm:p-4 bg-white rounded shadow">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-center sm:text-left">
        {stockName} Stock Price
      </h2>
      <div className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full">
        {stablePriceHistory.length > 0 ? (
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

// EventsSection Component
function EventsSection({ events }: { events: EventItem[] }) {
  // Ensure events is an array
  const stableEvents = Array.isArray(events) ? events : [];

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">2025</h2>

      {stableEvents.length > 0 ? (
        stableEvents.map((event, idx) => {
          // Skip rendering if date is undefined or not a string
          if (!event.date || typeof event.date !== 'string') {
            return null;
          }

          const [day, month] = event.date.split(" ");
          return (
            <div
              key={`${event.title}-${event.date}-${idx}`}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-md p-4 hover:shadow-sm space-y-4 sm:space-y-0"
            >
              <div className="flex items-center space-x-4">
                <div className="text-center w-12 h-12 border rounded-md border-gray-300 flex flex-col justify-center">
                  <span className="text-lg font-semibold">{day || 'N/A'}</span>
                  <span className="text-xs text-gray-500">{month || 'N/A'}</span>
                </div>
                <div className="text-left">
                  <p className="text-gray-900 font-medium">{event.title}</p>
                  <p className="text-sm text-gray-500">{event.subtitle}</p>
                </div>
              </div>

              {event.amount && (
                <div className="text-right">
                  <p className="text-gray-900 font-semibold">{event.amount}</p>
                  <p className="text-xs text-gray-500">per share</p>
                </div>
              )}
              {event.link && (
                <a
                  href="#"
                  className="text-sm text-gray-600 font-semibold underline underline-offset-2 hover:text-black"
                >
                  {event.link} →
                </a>
              )}
            </div>
          );
        }).filter(Boolean) // Remove null entries
      ) : (
        <p>No events data available.</p>
      )}

      <div className="text-green-600 font-semibold hover:underline cursor-pointer">View more</div>

      <div className="flex items-center gap-3 border border-gray-200 rounded-md p-4">
        <div className="w-10 h-10 relative">
          <Image src="https://img.icons8.com/?size=48&id=ZfQHCnh6ImEM&format=png" alt="Events calendar icon" fill className="object-contain" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">Events calendar</p>
          <p className="text-sm text-gray-600">View upcoming events in other stocks</p>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function Footer() {
  const linksGroup = [
    {
      title: 'STOCK MARKET INDICES',
      items: ['S&P BSE SENSEX', 'S&P BSE 100', 'NIFTY 100', 'NIFTY 50', 'NIFTY MIDCAP 100', 'NIFTY BANK', 'NIFTY NEXT 50'],
    },
    {
      title: 'POPULAR MUTUAL FUNDS',
      items: [
        'QUANT SMALL CAP FUND',
        'ICICI PRUDENTIAL COMMODITIES FUND',
        'NIPPON INDIA SMALL CAP FUND',
        'PARAG PARIKH FLEXI CAP FUND',
        'GROWW NIFTY TOTAL MARKET INDEX FUND',
        'SBI SMALL MIDCAP FUND',
        'TATA DIGITAL INDIA FUND',
        'AXIS SMALL CAP FUND',
        'ICICI PRUDENTIAL TECHNOLOGY FUND',
        'HDFC INDEX FUND SENSEX PLAN',
        'HDFC SMALL CAP FUND',
        'AXIS EQUITY FUND',
        'CANARA ROBECO SMALL CAP FUND',
        'TATA SMALL CAP FUND',
        'UTI NIFTY FUND',
      ],
    },
    {
      title: 'MUTUAL FUNDS COMPANIES',
      items: [
        'GROWWMF',
        'SBI',
        'AXIS',
        'HDFC',
        'UTI',
        'NIPPON INDIA',
        'ICICI PRUDENTIAL',
        'TATA',
        'KOTAK',
        'DSP',
        'CANARA ROBECO',
        'SUNDARAM',
        'MIRAE ASSET',
        'IDFC',
        'FRANKLIN TEMPLETON',
        'PPFAS',
        'MOTILAL OSWAL',
        'INVESCO',
        'EDELWEISS',
        'ADITYA BIRLA SUN LIFE',
        'LIC',
        'HSBC',
        'NAVI',
        'QUANTUM',
        'UNION',
        'ITI',
        'MAHINDRA MANULIFE',
        '360 ONE',
        'BOI',
        'TAURUS',
        'JM FINANCIAL',
        'PGIM',
        'SHRIRAM',
        'BARODA BNP PARIBAS',
        'QUANT',
        'WHITEOAK CAPITAL',
        'TRUST',
        'SAMCO',
        'NJ',
      ],
    },
    {
      title: 'TOOLS',
      items: [
        'BROKERAGE CALCULATOR',
        'MARGIN CALCULATOR',
        'SIP CALCULATOR',
        'SWP CALCULATOR',
        'SUKANYA SAMRIDDHI YOJANA CALCULATOR',
        'MUTUAL FUND RETURNS CALCULATOR',
        'FD CALCULATOR',
        'RD CALCULATOR',
        'EMI CALCULATOR',
        'PPF CALCULATOR',
        'EPF CALCULATOR',
        'NPS CALCULATOR',
        'GRATUITY CALCULATOR',
      ],
    },
  ];

  
  return (
    <footer className="bg-gray-100 text-sm text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold">Groww</h2>
            <p className="mt-2">Vaishnavi Tech Park, South Tower, 3rd Floor</p>
            <p>Sarjapur Main Road, Bellandur</p>
            <p>Bengaluru - 560103</p>
            <p>Karnataka</p>
            <a href="#" className="text-blue-600">Contact Us</a>
            <div className="flex space-x-3 mt-4 text-xl">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTelegramPlane />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ul className="space-y-1">
              <li>Stocks</li>
              <li>Futures & Options</li>
              <li>MTF</li>
              <li>IPO</li>
              <li>Mutual Funds</li>
              <li>NFO</li>
              <li>ETF</li>
              <li>Algo Trading</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Groww</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Media & Press</li>
              <li>Careers</li>
              <li>Help and Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>AMC Mutual Funds</li>
              <li>Calculators</li>
              <li>Glossary</li>
              <li>Open Demat Account</li>
              <li>Groww Digest</li>
              <li>Sitemap</li>
              <li>Income Tax Calculator</li>
              <li>FII DII</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center border-t mt-10 pt-4 text-sm gap-4">
          <p className="flex-1 min-w-[250px]">
            © 2016-2025 Groww. All rights reserved, Built with <span className="text-red-500">❤</span> in India
          </p>
          <div className="flex space-x-3 text-2xl">
            <FaApple />
            <FaGooglePlay />
          </div>
        </div>

        <div className="mt-8 space-y-6 text-sm">
          {linksGroup.map((group, idx) => (
            <div key={idx}>
              <p className="font-semibold mb-1">{group.title}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span key={i} className="text-green-600 hover:underline cursor-pointer">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t pt-4 text-gray-500 flex flex-wrap gap-2">
            <span className="font-semibold">OTHERS:</span>
            <span>NSE</span>|
            <span>BSE</span>|
            <span>Terms and Conditions</span>|
            <span>Policies and Procedures</span>|
            <span>Regulatory & Other Info</span>|
            <span>Privacy Policy</span>|
            <span>Disclosure</span>|
            <span>Bug Bounty</span>|
            <span>Download Forms</span>|
            <span>Investor Charter and Grievance</span>|
            <span>SMART ODR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main BuyStock Component
export default function BuyStock() {
  const [activeTab, setActiveTab] = useState<TabOption>("Overview");
  const params = useParams() as Params;
  const searchParams = useSearchParams();
  const stockName = decodeURIComponent(params.stockname);
  const router = useRouter();

  const state = searchParams.get("state");
  const { stockId, name, price, change, image, source, category } = state 
    ? JSON.parse(state) 
    : { stockId: null, name: stockName, price: "", change: "", image: "", source: "", category: "" };

  const [selectedStock, setSelectedStock] = useState<StockDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!stockId || !source) {
      setError("No stock ID or source provided.");
      setLoading(false);
      return;
    }

    const fetchStockDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        let apiUrl = "";
        const validCategories = ["large", "mid", "small"];
        const validSources = ["stocksInNews", "mostTraded", "topGainers", "topLosers", "mostTradedMTF"];
        
        if (!validSources.includes(source)) {
          throw new Error("Invalid source provided.");
        }

        const effectiveCategory = validCategories.includes(category) ? category : "large";

        if (source === "stocksInNews") {
          apiUrl = `http://localhost:5000/api/stocks/producttools/stocks-in-news/${stockId}`;
        } else if (source === "mostTraded") {
          apiUrl = `http://localhost:5000/api/stocks/producttools/mosttradedongrow/${stockId}`;
        } else if (source === "topGainers") {
          apiUrl = `http://localhost:5000/api/stocks/producttools/topgainers/${effectiveCategory}/${stockId}`;
        } else if (source === "topLosers") {
          apiUrl = `http://localhost:5000/api/stocks/producttools/toplosers/${effectiveCategory}/${stockId}`;
        } else if (source === "mostTradedMTF") {
          apiUrl = `http://localhost:5000/api/stocks/producttools/mtf/${stockId}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        // Handle the case where the API might return an array for mostTradedMTF
        let stockData;
        if (source === "mostTradedMTF" && Array.isArray(data)) {
          stockData = data.find((item: any) => item._id === stockId || item.stockId === stockId);
          if (!stockData) {
            throw new Error(`Stock with ID ${stockId} not found in MTF data.`);
          }
        } else {
          stockData = data;
        }

        // Normalize the API response to match the StockDetails type
        const normalizedData: StockDetails = {
          priceHistory: stockData.priceHistory ?? [], // Fallback to empty array if undefined
          details: {
            performance: stockData.details?.performance ?? {
              todaysLow: stockData.todaysLow ?? "₹0",
              todaysHigh: stockData.todaysHigh ?? "₹0",
              todayCurrent: stockData.todayCurrent ?? "₹0",
              low52Week: stockData.low52Week ?? "₹0",
              high52Week: stockData.high52Week ?? "₹0",
              open: stockData.open ?? "₹0",
              prevClose: stockData.prevClose ?? "₹0",
              volume: stockData.volume ?? "0",
              totalTradedValue: stockData.totalTradedValue ?? "₹0",
              upperCircuit: stockData.upperCircuit ?? "₹0",
              lowerCircuit: stockData.lowerCircuit ?? "₹0",
            },
            events: stockData.details?.events ?? [],
            news: stockData.details?.news ?? [],
          },
          marketDepth: stockData.marketDepth ?? {
            buyOrderQuantity: stockData.buyOrderQuantity ?? 0,
            sellOrderQuantity: stockData.sellOrderQuantity ?? 0,
            buyOrders: stockData.buyOrders ?? [],
            sellOrders: stockData.sellOrders ?? [],
            bidTotal: stockData.bidTotal ?? 0,
            askTotal: stockData.askTotal ?? 0,
          },
          fundamentals: stockData.fundamentals ?? {
            marketCap: stockData.marketCap ?? "₹0",
            peRatioTTM: stockData.peRatioTTM ?? 0,
            pbRatio: stockData.pbRatio ?? 0,
            industryPE: stockData.industryPE ?? 0,
            debtToEquity: stockData.debtToEquity ?? 0,
            roe: stockData.roe ?? 0,
            epsTTM: stockData.epsTTM ?? 0,
            dividendYield: stockData.dividendYield ?? 0,
            bookValue: stockData.bookValue ?? 0,
            faceValue: stockData.faceValue ?? 0,
          },
          financials: stockData.financials ?? { quarterly: stockData.quarterly ?? [] },
          about: stockData.about ?? {
            description: stockData.description ?? "",
            parentOrganisation: stockData.parentOrganisation ?? "",
            nseSymbol: stockData.nseSymbol ?? "",
            managingDirector: stockData.managingDirector ?? "",
          },
        };

        setSelectedStock(normalizedData);
      } catch (error) {
        console.error(`Error fetching details for stock ID ${stockId} from ${source}:`, error);
        setError(`Failed to load details for the selected stock. Please try again later.`);
        setSelectedStock(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStockDetails();
  }, [stockId, source, category]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!selectedStock) return <div className="text-center py-10">No stock data available.</div>;

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-4/5 space-y-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4 mb-6">
              <Image src={image} alt={name} width={40} height={40} className="rounded-full" />
              <div>
                <h1 className="text-2xl font-semibold">{name}</h1>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium">{price}</p>
                  <p className={`text-sm ${change.startsWith("-") ? "text-red-500" : "text-green-600"}`}>
                    {change}
                  </p>
                </div>
              </div>
            </div>
            <StockChart stockName={name} priceHistory={selectedStock.priceHistory} />
          </div>
          <div className="p-6 rounded-lg shadow-sm bg-white">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Overview" && (
              <Overview
                details={selectedStock.details}
                marketDepth={selectedStock.marketDepth}
                fundamentals={selectedStock.fundamentals}
              />
            )}
            {activeTab === "News" && <NewsSection news={selectedStock.details.news} />}
            {activeTab === "Events" && <EventsSection events={selectedStock.details.events} />}
          </div>
          <FinancialChart financials={selectedStock.financials} />
          <CompanyInfoCard about={selectedStock.about} />
        </div>

        <div className="w-full lg:w-1/5 bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm h-fit">
          <div className="flex items-center justify-center mb-6">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-400">
              <Image
                src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/default.b40891fd.svg"
                alt="Unlock Stocks"
                width={50}
                height={50}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Looking to invest in Stocks?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create your dmat account in 2 minutes.
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-lg transition-all">
            UNLOCK STOCKS
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}