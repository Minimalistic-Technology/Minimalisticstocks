"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type IndexAPIResponseItem = {
  _id: string;
  name?: string;
  value?: number;
  oneDayChange?: number;
  oneDayChangePercent?: number;
  __v?: number;
};

type FormattedIndexData = {
  id: string;
  name: string;
  price: string;
  change: string;
  image: string;
};

const IndicesSection: React.FC = () => {
  const [indicesData, setIndicesData] = useState<FormattedIndexData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchIndices = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the list of indices
        const res = await fetch("http://localhost:5000/api/topstocks/index");
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data: IndexAPIResponseItem[] = await res.json();

        // Filter out items without _id or name
        const filtered = data.filter((item) => item._id && item.name);

        // Deduplicate by name (keep the first occurrence)
        const uniqueIndicesMap = new Map<string, IndexAPIResponseItem>();
        filtered.forEach((item) => {
          if (!uniqueIndicesMap.has(item.name!)) {
            uniqueIndicesMap.set(item.name!, item);
          }
        });
        const uniqueIndices = Array.from(uniqueIndicesMap.values());

        // Fetch detailed data for each index to get value, oneDayChange, and oneDayChangePercent
        const detailedIndices = await Promise.all(
          uniqueIndices.map(async (item) => {
            try {
              const detailRes = await fetch(`http://localhost:5000/api/topstocks/index/${item._id}`);
              if (!detailRes.ok) {
                throw new Error(`HTTP error! Status: ${detailRes.status}`);
              }
              const detailData: IndexAPIResponseItem = await detailRes.json();
              return {
                ...item,
                value: detailData.value ?? 0,
                oneDayChange: detailData.oneDayChange ?? 0,
                oneDayChangePercent: detailData.oneDayChangePercent ?? 0,
              };
            } catch (err) {
              console.error(`Failed to fetch details for index ${item._id}`, err);
              return {
                ...item,
                value: 0,
                oneDayChange: 0,
                oneDayChangePercent: 0,
              };
            }
          })
        );

        const formattedData: FormattedIndexData[] = detailedIndices.map((item) => ({
          id: item._id,
          name: item.name!.toUpperCase(),
          price: `₹${item.value!.toLocaleString()}`,
          change: `${item.oneDayChange} (${item.oneDayChangePercent}%)`,
          image: "https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/nifty_50.c9cd0d8a.svg", // Placeholder image
        }));

        setIndicesData(formattedData);
      } catch (err) {
        console.error("Failed to fetch indices", err);
        setError("Failed to load indices. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIndices();
  }, []);

  const handleIndexClick = (index: FormattedIndexData) => {
    const state = {
      stockId: index.id,
      name: index.name,
      price: index.price,
      change: index.change,
      image: index.image,
      source: "index",
    };
    router.push(`/buystock/${encodeURIComponent(index.name)}?state=${encodeURIComponent(JSON.stringify(state))}`);
  };

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

      <div className="flex space-x-3 overflow-x-auto">
        {loading ? (
          <p>Loading Indices...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : indicesData.length > 0 ? (
          indicesData.map((fund, i) => (
            <div
              key={i}
              onClick={() => handleIndexClick(fund)}
              className="w-[200px] h-[74px] rounded-lg border border-gray-200 p-2 bg-white flex-shrink-0 cursor-pointer hover:shadow-md transition-shadow flex items-center justify-center"
            >
              <p className="font-medium text-[13px] text-gray-800 truncate">
                {fund.name}
              </p>
            </div>
          ))
        ) : (
          <p>No indices available.</p>
        )}
      </div>
    </section>
  );
};

export default IndicesSection;