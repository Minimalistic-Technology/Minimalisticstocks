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
  daychangePercent: string;
  changeColor: string;
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

        const formattedData: FormattedIndexData[] = filtered.map((item) => {
          const isNegative = item.oneDayChange! < 0;
          return {
            name: item.name!.toUpperCase(),
            lasttraded: `₹${item.value!.toLocaleString()}`,
            daychange: `${item.oneDayChange!}`,
            daychangePercent: `(${item.oneDayChangePercent}%)`,
            changeColor: isNegative ? "text-red-500" : "text-green-500",
          };
        });

        setIndicesData(formattedData);
      } catch (err) {
        console.error("Failed to fetch indices", err);
      }
    };

    fetchIndices();
  }, []);

  return (
    <section className="py-6 pl-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Indices
        </h2>
        <a
          href="#"
          className="text-green-600 text-sm sm:text-base font-medium hover:underline"
        >
          ALL INDICES
        </a>
      </div>

      <div className="flex space-x-3">
        {indicesData.length > 0 ? (
          indicesData.map((fund, i) => (
            <div
              key={i}
              className="w-[200px] h-[74px] rounded-lg border border-gray-200 p-2 bg-white flex-shrink-0"
            >
              <p className="font-medium text-[13px] text-gray-800 truncate">
                {fund.name}
              </p>
              <div className="flex justify-between items-center text-[11px] mt-1">
                <p className="text-gray-800 font-medium truncate">
                  {fund.lasttraded}
                </p>
                <div className="flex items-center space-x-1">
                  <p className="text-gray-800 font-medium">{fund.daychange}</p>
                  <p className={`font-medium ${fund.changeColor}`}>
                    {fund.daychangePercent}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading Indices...</p>
        )}
      </div>
    </section>
  );
};

export default IndicesSection;
