"use client";

import React, { useEffect, useState } from "react";

type IndexAPIResponseItem = {
  _id: string;
  name?: string;
  value?: number;
  oneDayChange?: number;
  oneDayChangePoint?: number;
  oneDayChangePercent?: number;
  __v: number;
};

type FormattedIndexData = {
  name: string;
  lasttraded: string;
  daychange: string;
};

const IndicesSection: React.FC = () => {
  const [indicesData, setIndicesData] = useState<FormattedIndexData[]>([]);

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/stocks/getIndices");
        const data: IndexAPIResponseItem[] = await res.json();

        const filtered = data.filter(
          (item) =>
            item.name &&
            item.value !== undefined &&
            item.oneDayChange !== undefined &&
            item.oneDayChangePercent !== undefined
        );

        const formattedData: FormattedIndexData[] = filtered.map((item) => ({
          name: item.name!.toUpperCase(),
          lasttraded: `₹${item.value!.toLocaleString()}`,
          daychange: `${item.oneDayChange! < 0 ? "-" : ""}${item.oneDayChange} (${item.oneDayChangePercent}%)`,
        }));

        setIndicesData(formattedData);
      } catch (err) {
        console.error("Failed to fetch indices", err);
      }
    };

    fetchIndices();
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold">Indices</h2>
        <a
          href="#"
          className="text-green-600 text-sm sm:text-base font-medium hover:underline"
        >
          All Indices
        </a>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#a0aec0 transparent" }}
      >
        {indicesData.map((fund, i) => (
          <div
            key={i}
            className="min-w-[180px] sm:min-w-[220px] rounded-xl border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition duration-200 ease-in-out flex-shrink-0"
          >
            <p className="font-semibold text-sm sm:text-base truncate">{fund.name}</p>
            <div className="flex justify-between items-center text-sm mt-2">
              <p className="text-gray-800 font-medium truncate">{fund.lasttraded}</p>
              <p
                className={`font-semibold ${
                  fund.daychange.startsWith("-")
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {fund.daychange}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IndicesSection;
