"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaImage } from "react-icons/fa";

const StockFilterSection = () => {
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
          image: item.image || "/placeholder.png", // Added fallback image
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
    <section className="px-4 sm:px-6 lg:px-8">
      {/* Display error message if any */}
      {error && selectedCategory === "Large" && (
        <p className="text-red-500 text-center text-xs sm:text-sm mb-4">{error}</p>
      )}

      {/* Category Buttons */}
      <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-4 sm:mb-6">
        <div className="hidden xs:block w-px h-6 bg-gray-300"></div>
        {["Large", "Mid", "Small"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat as "Large" | "Mid" | "Small")}
            className={`px-3 xs:px-4 py-1.5 text-xs sm:text-sm rounded-full border transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-lime-100 text-green-700 font-semibold border-green-300"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {cat} Cap
          </button>
        ))}
      </div>

      {/* Stock Cards */}
      <div className="flex space-x-3 sm:space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory relative">
        {loading && selectedCategory === "Large" ? (
          <p className="text-center text-gray-500 text-xs sm:text-sm w-full py-4">
            Loading Large Cap Gainers...
          </p>
        ) : getData().length > 0 ? (
          getData().map((item, idx) => (
            <div
              key={idx}
              className="w-[130px] xs:w-[140px] sm:w-[150px] h-[130px] xs:h-[140px] sm:h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[10px] xs:text-[11px] sm:text-[12px] relative flex-shrink-0 snap-start"
            >
              {imageErrors[item.image] ? (
                <div className="absolute top-2 left-2">
                  <FaImage size={16} className="text-gray-400 sm:w-6 sm:h-6" />
                </div>
              ) : (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={16}
                  height={16}
                  className="absolute top-2 left-2 sm:w-6 sm:h-6"
                  onError={() => handleImageError(item.image)}
                />
              )}
              <div className="mt-6 xs:mt-7 sm:mt-8 font-medium truncate">{item.name}</div>
              <div className="text-[10px] xs:text-xs sm:text-sm mt-1 text-black truncate">
                {item.price}
              </div>
              <div
                className={`text-[10px] xs:text-xs sm:text-sm mt-1 truncate ${
                  item.change.startsWith("-") ? "text-red-500" : "text-green-600"
                }`}
              >
                {item.change}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-xs sm:text-sm w-full py-4">
            No data available for {selectedCategory} Cap Stocks.
          </p>
        )}
      </div>
    </section>
  );
};

export default StockFilterSection;