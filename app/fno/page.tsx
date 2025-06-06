"use client";

import IndicesSection from "../components/index/page";
import Header from "../components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function FNOPAGE() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1 Day");
  const [filter, setFilter] = useState<"Gainers" | "Losers">("Gainers");
  const [topIndexFutures, setTopIndexFutures] = useState<
    { _id: string; name: string; price: string; change: string; image: string }[]
  >([]);
  const [topStockFutures, setTopStockFutures] = useState<
    { _id: string; name: string; price: string; change: string; image: string }[]
  >([]);
  const [stockData, setStockData] = useState<
    {
      _id?: string;
      name: string;
      icon: string;
      price: string;
      change: string;
      volume: string;
    }[]
  >([]);
  const [collections, setCollections] = useState<
    {
      _id?: string;
      name: string;
      icon: string;
      lasttraded: string;
      daychange: string;
    }[]
  >([]);
  const [loadingTopIndexFutures, setLoadingTopIndexFutures] = useState<boolean>(true);
  const [loadingTopStockFutures, setLoadingTopStockFutures] = useState<boolean>(true);
  const [loadingStockData, setLoadingStockData] = useState<boolean>(true);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true);
  const [errorTopIndexFutures, setErrorTopIndexFutures] = useState<string | null>(null);
  const [errorTopStockFutures, setErrorTopStockFutures] = useState<string | null>(null);
  const [errorStockData, setErrorStockData] = useState<string | null>(null);
  const [errorCollections, setErrorCollections] = useState<string | null>(null);

  // Default image URL for fallback
  const defaultImage = "https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/default.b40891fd.svg";

  // Utility function to validate image URLs
  const validateImageUrl = (url: string | undefined): string => {
    if (!url) {
      console.warn("Image URL is undefined or empty, using default image");
      return defaultImage;
    }
    // Check if URL is valid (starts with http:// or https:// and ends with image extension)
    const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/i;
    if (imageRegex.test(url)) {
      return url;
    }
    console.warn(`Invalid image URL: ${url}, using default image`);
    return defaultImage;
  };

  // Utility function to format price (ensure it starts with ₹)
  const formatPrice = (price: string | number | undefined): string => {
    if (!price) return "₹0.00";
    const priceStr = price.toString();
    return priceStr.startsWith("₹") ? priceStr : `₹${priceStr}`;
  };

  // Utility function to format change (ensure it has the format "value (percent%)")
  const formatChange = (change: string | undefined): string => {
    if (!change) return "+0.00 (+0.00%)";
    const changeRegex = /^[+-]?\d+\.\d+\s*\([-+]?\d+\.\d+%\)$/;
    if (changeRegex.test(change)) return change;
    return `${change} (+0.00%)`;
  };

  // Fetch Top Traded data
  useEffect(() => {
    const fetchCollections = async () => {
      setLoadingCollections(true);
      setErrorCollections(null);
      try {
        const response = await fetch("http://localhost:5000/api/topstocks/toptraded/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => {
          const imageUrl = validateImageUrl(item.icon || item.image || item.img); // Check multiple possible field names
          console.log(`Top Traded - Item: ${item.name}, Image URL: ${imageUrl}`);
          return {
            _id: item._id || "",
            name: item.name || "Unknown",
            icon: imageUrl,
            lasttraded: formatPrice(item.lasttraded || item.price),
            daychange: formatChange(item.daychange || item.change),
          };
        });
        setCollections(formattedData);
      } catch (error) {
        console.error("Error fetching Top Traded:", error);
        setErrorCollections("Failed to load Top Traded data. Please try again later.");
        setCollections([]);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);

  // Fetch Top Traded Index Futures data
  useEffect(() => {
    const fetchTopIndexFutures = async () => {
      setLoadingTopIndexFutures(true);
      setErrorTopIndexFutures(null);
      try {
        const response = await fetch("http://localhost:5000/api/topstocks/topindex");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => {
          const imageUrl = validateImageUrl(item.image || item.icon || item.img); // Check multiple possible field names
          console.log(`Index Futures - Item: ${item.name}, Image URL: ${imageUrl}`);
          return {
            _id: item._id || "",
            name: item.name || "Unknown",
            price: formatPrice(item.price),
            change: formatChange(item.change),
            image: imageUrl,
          };
        });
        setTopIndexFutures(formattedData);
      } catch (error) {
        console.error("Error fetching Top Index Futures:", error);
        setErrorTopIndexFutures("Failed to load Top Index Futures data. Please try again later.");
        setTopIndexFutures([]);
      } finally {
        setLoadingTopIndexFutures(false);
      }
    };

    fetchTopIndexFutures();
  }, []);

  // Fetch Top Traded Stock Futures data
  useEffect(() => {
    const fetchTopStockFutures = async () => {
      setLoadingTopStockFutures(true);
      setErrorTopStockFutures(null);
      try {
        const response = await fetch("http://localhost:5000/api/topstocks/top-stocks");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => {
          const imageUrl = validateImageUrl(item.image || item.icon || item.img); // Check multiple possible field names
          console.log(`Stock Futures - Item: ${item.name}, Image URL: ${imageUrl}`);
          return {
            _id: item._id || "",
            name: item.name || "Unknown",
            price: formatPrice(item.price),
            change: formatChange(item.change),
            image: imageUrl,
          };
        });
        setTopStockFutures(formattedData);
      } catch (error) {
        console.error("Error fetching Top Stock Futures:", error);
        setErrorTopStockFutures("Failed to load Top Stock Futures data. Please try again later.");
        setTopStockFutures([]);
      } finally {
        setLoadingTopStockFutures(false);
      }
    };

    fetchTopStockFutures();
  }, []);

  // Fetch F&O Stocks data based on filter
  useEffect(() => {
    const fetchStockData = async () => {
      setLoadingStockData(true);
      setErrorStockData(null);
      try {
        const apiUrl =
          filter === "Gainers"
            ? "http://localhost:5000/api/topstocks/fno/"
            : "http://localhost:5000/api/topstocks/fnoloosers";
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => {
          const imageUrl = validateImageUrl(item.icon || item.image || item.img); // Check multiple possible field names
          console.log(`F&O Stocks - Item: ${item.name}, Image URL: ${imageUrl}`);
          return {
            _id: item._id || "",
            name: item.name || "Unknown",
            icon: imageUrl,
            price: formatPrice(item.price),
            change: formatChange(item.change),
            volume: item.volume || "0",
          };
        });
        setStockData(formattedData);
      } catch (error) {
        console.error(`Error fetching F&O Stocks (${filter}):`, error);
        setErrorStockData(`Failed to load ${filter} data. Please try again later.`);
        setStockData([]);
      } finally {
        setLoadingStockData(false);
      }
    };

    fetchStockData();
  }, [filter]);

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-row gap-8">
        <div className="w-3/5 space-y-12">
          {/* Indices */}
          <IndicesSection />

          {/* Top Traded */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loadingCollections ? (
                <p>Loading Top Traded...</p>
              ) : errorCollections ? (
                <p className="text-red-500">{errorCollections}</p>
              ) : collections.length > 0 ? (
                collections.map((item, i) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: {
                        state: JSON.stringify({
                          stockId: item._id || "",
                          name: item.name,
                          price: item.lasttraded,
                          change: item.daychange,
                          image: item.icon,
                          source: "toptraded",
                        }),
                      },
                    }}
                    key={item._id || i}
                  >
                    <div className="p-4 border rounded-xl bg-white text-center shadow-md hover:bg-gray-50 cursor-pointer">
                      <p className="text-sm font-semibold mb-2">{item.name}</p>
                      <div className="w-full h-20 flex items-center justify-center mb-2">
                        <Image
                          src={item.icon}
                          alt={item.name}
                          width={60}
                          height={60}
                          onError={() => console.error(`Failed to load image for ${item.name}: ${item.icon}`)}
                        />
                      </div>
                      <p className="text-sm text-black mb-2">{item.lasttraded}</p>
                      <div className="flex justify-center items-center text-sm">
                        <p
                          className={`${
                            item.daychange.startsWith("-")
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.daychange}
                        </p>
                        <div className="ml-2 p-1 rounded-full bg-white shadow text-gray-400">
                          <FaLink size={12} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No Top Traded data available.</p>
              )}
            </div>
          </section>

          {/* F&O Stocks */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">F&O Stocks</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>

            {/* Filter Bar */}
            <div className="flex items-center space-x-4 mb-6">
              <button className="flex items-center border px-4 py-1 rounded-full">
                {selectedTimeframe}
                <FiChevronDown className="ml-2" />
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <button
                onClick={() => setFilter("Gainers")}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === "Gainers"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                Gainers
              </button>
              <button
                onClick={() => setFilter("Losers")}
                className={`px-4 py-1 rounded-full text-sm ${
                  filter === "Losers"
                    ? "bg-green-500 text-white"
                    : "bg-white border text-gray-900"
                }`}
              >
                Losers
              </button>
            </div>

            {/* Stock Table */}
            <div>
              <div className="grid grid-cols-4 font-semibold text-gray-600 mb-2 text-sm">
                <span>Stocks</span>
                <span>Price</span>
                <span>1D Change</span>
                <span>Volume</span>
              </div>
              {loadingStockData ? (
                <p>Loading F&O Stocks...</p>
              ) : errorStockData ? (
                <p className="text-red-500">{errorStockData}</p>
              ) : stockData.length > 0 ? (
                stockData.map((stock, index) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(stock.name)}`,
                      query: {
                        state: JSON.stringify({
                          stockId: stock._id || "",
                          name: stock.name,
                          price: stock.price,
                          change: stock.change,
                          image: stock.icon,
                          source: filter === "Gainers" ? "fno" : "fnoloosers",
                        }),
                      },
                    }}
                    key={index}
                  >
                    <div className="grid grid-cols-4 items-center text-sm py-2 border-b hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <Image
                          src={stock.icon}
                          alt={stock.name}
                          width={24}
                          height={24}
                          onError={() => console.error(`Failed to load image for ${stock.name}: ${stock.icon}`)}
                        />
                        <span>{stock.name}</span>
                      </div>
                      <span>{stock.price}</span>
                      <span
                        className={
                          stock.change.startsWith("-")
                            ? "text-red-500"
                            : "text-green-600"
                        }
                      >
                        {stock.change}
                      </span>
                      <span>{stock.volume}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No F&O Stocks data available.</p>
              )}
            </div>
          </section>

          {/* Top Traded Index Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Index Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {loadingTopIndexFutures ? (
                <p>Loading Top Index Futures...</p>
              ) : errorTopIndexFutures ? (
                <p className="text-red-500">{errorTopIndexFutures}</p>
              ) : topIndexFutures.length > 0 ? (
                topIndexFutures.map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: {
                        state: JSON.stringify({
                          stockId: item._id,
                          name: item.name,
                          price: item.price,
                          change: item.change,
                          image: item.image,
                          source: "topIndexFutures",
                        }),
                      },
                    }}
                    key={idx}
                  >
                    <div className="w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="absolute top-2 left-2"
                        onError={() => console.error(`Failed to load image for ${item.name}: ${item.image}`)}
                      />
                      <div className="mt-8 font-medium">{item.name}</div>
                      <div className="text-xs mt-1 text-black">{item.price}</div>
                      <div
                        className={`text-xs mt-1 ${
                          item.change.startsWith("-")
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.change}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No Top Index Futures data available.</p>
              )}
            </div>
          </section>

          {/* Top Traded Stock Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Stock Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {loadingTopStockFutures ? (
                <p>Loading Top Stock Futures...</p>
              ) : errorTopStockFutures ? (
                <p className="text-red-500">{errorTopStockFutures}</p>
              ) : topStockFutures.length > 0 ? (
                topStockFutures.map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: {
                        state: JSON.stringify({
                          stockId: item._id,
                          name: item.name,
                          price: item.price,
                          change: item.change,
                          image: item.image,
                          source: "topStockFutures",
                        }),
                      },
                    }}
                    key={idx}
                  >
                    <div className="w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="absolute top-2 left-2"
                        onError={() => console.error(`Failed to load image for ${item.name}: ${item.image}`)}
                      />
                      <div className="mt-8 font-medium">{item.name}</div>
                      <div className="text-xs mt-1 text-black">{item.price}</div>
                      <div
                        className={`text-xs mt-1 ${
                          item.change.startsWith("-")
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {item.change}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No Top Stock Futures data available.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="max-w-sm w-full bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm max-h-100">
          <div className="flex items-center justify-center mb-6">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-400">
              <Image
                src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/fno-unlock.280e01a7.svg"
                alt="Unlock F&O"
                width={50}
                height={50}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Unlock Futures & Options
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Start trading Futures and Options
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-lg transition-all">
            PROCEED TO UNLOCK
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}