"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Stock = {
  name: string;
  price: string;
  change: string;
  image: string;
};

const StockFilterSectionLosers = () => {
  const [selectedCategory, setSelectedCategory] = useState<"Large" | "Mid" | "Small">("Large");
  const [losersData, setLosersData] = useState<Stock[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchLosers = async () => {
      try {
        // Uncomment the following fetch logic once the API is fixed
        const response = await fetch("http://localhost:5000/api/stocks/producttools/gettopgainers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        // Format the data and filter for losers (negative change)
        const formattedData = data.map((item: any) => ({
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));

        // Filter for stocks with negative change (losers)
        const losers = formattedData.filter((item: Stock) =>
          item.change.startsWith("-")
        );

        setLosersData(losers);
      } catch (error) {
        console.error("Error fetching Top Losers data:", error);
        setError("Failed to load Top Losers data. Please try again later.");
      }
    };

    fetchLosers();
  }, []);

  // Categorize stocks based on price
  const categorizeStocks = (stocks: Stock[]) => {
    const largeCaps = stocks.filter((stock) => {
      const price = parseFloat(stock.price.replace("₹", "").replace(",", ""));
      return price >= 1000;
    });

    const midCaps = stocks.filter((stock) => {
      const price = parseFloat(stock.price.replace("₹", "").replace(",", ""));
      return price >= 500 && price < 1000;
    });

    const smallCaps = stocks.filter((stock) => {
      const price = parseFloat(stock.price.replace("₹", "").replace(",", ""));
      return price < 500;
    });

    return { largeCaps, midCaps, smallCaps };
  };

  // Get data based on selected category
  const getData = () => {
    const { largeCaps, midCaps, smallCaps } = categorizeStocks(losersData);
    if (selectedCategory === "Large") return largeCaps;
    if (selectedCategory === "Mid") return midCaps;
    return smallCaps;
  };

  return (
    <section>
      {/* Display error message if any */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex items-center space-x-4 mb-6">
        <div className="w-px h-6 bg-gray-300"></div>
        {["Large", "Mid", "Small"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as "Large" | "Mid" | "Small")}
            className={`px-4 py-1 rounded-full text-sm border transition-all duration-200
              ${
                selectedCategory === cat
                  ? "bg-lime-100 text-green-700 font-semibold border-lime-300"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {losersData.length > 0 ? (
          getData().map((item, idx) => (
            <div
              key={idx}
              className="w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={24}
                height={24}
                className="absolute top-2 left-2"
              />
              <div className="mt-8 font-medium">{item.name}</div>
              <div className="text-xs mt-1 text-black">{item.price}</div>
              <div
                className={`text-xs mt-1 ${
                  item.change.startsWith("-") ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.change}
              </div>
            </div>
          ))
        ) : (
          <p>Loading Top Losers...</p>
        )}
      </div>
    </section>
  );
};

export default StockFilterSectionLosers;