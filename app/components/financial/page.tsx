import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type ChartData = {
  period: string;
  value: number;
};

const revenueYearly: ChartData[] = [
  { period: "2020", value: 3723 },
  { period: "2021", value: 4033 },
  { period: "2022", value: 4393 },
  { period: "2023", value: 4428 },
  { period: "2024", value: 5003 },
];

const profitYearly: ChartData[] = [
  { period: "2020", value: 450 },
  { period: "2021", value: 520 },
  { period: "2022", value: 610 },
  { period: "2023", value: 590 },
  { period: "2024", value: 670 },
];

const networthYearly: ChartData[] = [
  { period: "2020", value: 3723 },
  { period: "2021", value: 4033 },
  { period: "2022", value: 4393 },
  { period: "2023", value: 4428 },
  { period: "2024", value: 5003 },
];

type Metric = "Revenue" | "Profit" | "Net Worth";
type Timeframe = "Quarterly" | "Yearly";

export default function FinancialChart() {
  const [metric, setMetric] = useState<Metric>("Revenue");
  const [timeframe, setTimeframe] = useState<Timeframe>("Quarterly");
  const [profitQuarterly, setProfitQuarterly] = useState<ChartData[]>([]);
  const [revenueQuarterly, setRevenueQuarterly] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingRevenue, setLoadingRevenue] = useState<boolean>(true);
  const [errorRevenue, setErrorRevenue] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfitQuarterly = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/buystocks/financialprofitget");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          period: item.period,
          value: item.value,
        }));
        setProfitQuarterly(formattedData);
      } catch (error) {
        console.error("Error fetching Profit Quarterly data:", error);
        setError("Failed to load Profit Quarterly data. Using default data.");
        setProfitQuarterly([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfitQuarterly();
  }, []);

  useEffect(() => {
    const fetchRevenueQuarterly = async () => {
      setLoadingRevenue(true);
      setErrorRevenue(null);
      try {
        const response = await fetch("http://localhost:5000/api/buystocks/financialget");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          period: item.period,
          value: item.value,
        }));
        setRevenueQuarterly(formattedData);
      } catch (error) {
        console.error("Error fetching Revenue Quarterly data:", error);
        setErrorRevenue("Failed to load Revenue Quarterly data. Using default data.");
        setRevenueQuarterly([]);
      } finally {
        setLoadingRevenue(false);
      }
    };
    fetchRevenueQuarterly();
  }, []);

  const handleMetricChange = (m: Metric) => {
    setMetric(m);
    if (m === "Net Worth") setTimeframe("Yearly");
  };

  const handleTimeframeChange = (t: Timeframe) => {
    if (metric === "Net Worth" && t === "Quarterly") return;
    setTimeframe(t);
  };

  let data: ChartData[] = revenueQuarterly;
  if (metric === "Revenue" && timeframe === "Yearly") data = revenueYearly;
  if (metric === "Profit" && timeframe === "Quarterly") data = profitQuarterly;
  if (metric === "Profit" && timeframe === "Yearly") data = profitYearly;
  if (metric === "Net Worth") data = networthYearly;

  return (
    <div className="max-w-full md:max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-center md:text-left">
        Financials
      </h2>
      <p className="text-gray-600 text-xs md:text-sm text-right italic mb-2">
        *All values are in Rs Cr.
      </p>

      {/* Tabs */}
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

      {/* Chart */}
      <div className="w-full h-64 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <XAxis dataKey="period" tick={{ fill: "#666", fontSize: 12 }} />
            <YAxis tick={{ fill: "#666", fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="value" fill="#00b386" barSize={20}>
              <LabelList dataKey="value" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Row */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Timeframe Toggle */}
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

        {/* See Details */}
        <button className="text-green-600 text-sm font-semibold hover:underline">
          See Details
        </button>
      </div>
    </div>
  );
}
