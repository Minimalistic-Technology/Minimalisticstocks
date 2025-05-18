"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";

const StockFilterSectionLosers = () => {
  const [selectedCategory, setSelectedCategory] = useState<"Large" | "Mid" | "Small">("Large");
  const [largeCapsData, setLargeCapsData] = useState<
    { name: string; price: string; change: string; image: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

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

  const smallCaps = [
    {
      name: "Zee Media",
      price: "₹14.80",
      change: "+0.35 (2.42%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/ZeeMedia.png",
    },
    {
      name: "RattanIndia Power",
      price: "₹7.40",
      change: "+0.10 (1.37%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/RattanIndia.png",
    },
    {
      name: "3i Infotech",
      price: "₹43.10",
      change: "-1.00 (2.27%)",
      image: "https://assets-netstorage.groww.in/stock-assets/logos2/3iInfotech.png",
    },
  ];

  // Fetch data for Large Caps (Top Gainers)
  useEffect(() => {
    const fetchLargeCaps = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/gettopgainers");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        const formattedData = data.map((item: any) => ({
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));

        setLargeCapsData(formattedData);
      } catch (error) {
        console.error("Error fetching Large Cap Gainers data:", error);
        setError("Failed to load Large Cap Gainers data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchLargeCaps();
  }, []);

  const getData = () => {
    if (selectedCategory === "Large") return largeCapsData;
    if (selectedCategory === "Mid") return midCaps;
    return smallCaps;
  };

  const handleImageError = (imageSrc: string) => {
    setImageErrors((prev) => ({ ...prev, [imageSrc]: true }));
  };

  return (
    <section className="px-4 sm:px-0">
      {/* Display error message if any */}
      {error && selectedCategory === "Large" && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

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

      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {loading && selectedCategory === "Large" ? (
          <p>Loading Large Cap Gainers...</p>
        ) : getData().length > 0 ? (
          getData().map((item, idx) => (
            <div
              key={idx}
              className="min-w-[120px] sm:min-w-[150px] w-[120px] sm:w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[10px] sm:text-[11px] relative"
            >
              {imageErrors[item.image] ? (
                <div className="absolute top-2 left-2">
                  <FaImage size={24} className="text-gray-400" />
                </div>
              ) : (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={24}
                  height={24}
                  className="absolute top-2 left-2"
                  onError={() => handleImageError(item.image)}
                />
              )}
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
          <p>No data available for {selectedCategory} Cap Stocks.</p>
        )}
      </div>
    </section>
  );
};

export default StockFilterSectionLosers;
