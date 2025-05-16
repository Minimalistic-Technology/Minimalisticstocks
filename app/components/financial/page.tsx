import React, { useState } from "react";
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

const revenueQuarterly: ChartData[] = [
  { period: "Q1 2024", value: 850 },
  { period: "Q2 2024", value: 920 },
  { period: "Q3 2024", value: 980 },
  { period: "Q4 2024", value: 1030 },
];

const profitQuarterly: ChartData[] = [
  { period: "Q1 2024", value: 120 },
  { period: "Q2 2024", value: 150 },
  { period: "Q3 2024", value: 180 },
  { period: "Q4 2024", value: 200 },
];

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
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">Financials</h2>
      {/* "*All values are in Rs Cr. ..." text */}
      <p className="text-gray-600 text-sm text-right italic">*All values are in Rs Cr.</p>

      {/* Tabs */}
      <div className="flex space-x-8 border-b mb-4">
        {(["Revenue", "Profit", "Net Worth"] as Metric[]).map((m) => (
          <button
            key={m}
            onClick={() => handleMetricChange(m)}
            className={`pb-2 font-medium ${
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
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <XAxis dataKey="period" tick={{ fill: "#666" }} />
          <YAxis tick={{ fill: "#666" }} />
          <Tooltip />
          <Bar dataKey="value" fill="#00b386" barSize={10}>
            <LabelList dataKey="value" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Bottom Row with Timeframe toggle on left and See Details on right */}
      <div className="mt-4 flex justify-between items-center">
        <div>
          {/* Timeframe Toggle */}
          <div className="flex space-x-4 mb-1">
            {(["Quarterly", "Yearly"] as Timeframe[]).map((t) => {
              const isDisabled = metric === "Net Worth" && t === "Quarterly";
              return (
                <button
                  key={t}
                  onClick={() => handleTimeframeChange(t)}
                  disabled={isDisabled}
                  className={`px-4 py-1 rounded-full font-medium border ${
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
        </div>

        {/* See Details on right side */}
        <button className="text-green-600 font-semibold hover:underline">
          See Details
        </button>
      </div>
    </div>
  );
}
