"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const StockFilterSectionLosers = () => {
  const [selectedCategory, setSelectedCategory] = useState<"Large" | "Mid" | "Small">("Large");
  const [smallCapsData, setSmallCapsData] = useState<
    { name: string; price: string; change: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const largeCaps = [
    {
      name: "BSE",
      price: "₹7,315.50",
      change: "+360 (5.18%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/BSELtd_11315994_21236.png",
    },
    {
      name: "Bharat Dynamics",
      price: "₹1,746.70",
      change: "176.80 (11.26%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/BDL.png",
    },
    {
      name: "Tanla Platforms",
      price: "₹557.35",
      change: "62.90 (12.72%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/TanlaSolutions_48102096060_24392.png",
    },
    {
      name: "Mazagon Dock Ship",
      price: "₹3,002.60",
      change: "98.20 (3.38%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/MAZDOCK.png",
    },
  ];

  const midCaps = [
    {
      name: "Coforge",
      price: "₹5,112.00",
      change: "+112.50 (2.25%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/Coforge.png",
    },
    {
      name: "Persistent",
      price: "₹4,215.30",
      change: "-78.20 (1.82%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/Persistent.png",
    },
    {
      name: "Honeywell",
      price: "₹38,123.00",
      change: "+210.00 (0.55%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/Honeywell.png",
    },
  ];

  // Fetch smallCaps data from the API
  useEffect(() => {
    const fetchSmallCaps = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/toplooserssmallget");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        // Format the data to match the expected structure
        const formattedData = data.map((item: any) => ({
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));

        // Filter for stocks with negative change (losers)
        const losers = formattedData.filter((item: { change: string }) =>
          item.change.startsWith("-")
        );

        setSmallCapsData(losers);
      } catch (error) {
        console.error("Error fetching Small Cap Losers data:", error);
        setError("Failed to load Small Cap Losers data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSmallCaps();
  }, []);

  const getData = () => {
    if (selectedCategory === "Large") return largeCaps;
    if (selectedCategory === "Mid") return midCaps;
    return smallCapsData;
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
                  ? "bg-lime-100 text-green-700 font-semibold border-green-300"
                  : "bg-white text-gray-700"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Responsive container */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide
                      sm:grid sm:grid-cols-2 sm:gap-4 sm:space-x-0
                      md:grid md:grid-cols-3
                      lg:grid lg:grid-cols-4">
        {loading && selectedCategory === "Small" ? (
          <p>Loading Small Cap Losers...</p>
        ) : getData().length > 0 ? (
          getData().map((item, idx) => (
            <div
              key={idx}
              className="w-[150px] sm:w-full h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative"
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
          <p>No data available for {selectedCategory} Cap Losers.</p>
        )}
      </div>
    </section>
  );
};

export default StockFilterSectionLosers;
