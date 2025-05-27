"use client";

import StockFilterSection from "app/components/topGainers/page";
import IndicesSection from "app/components/index/page";
import Header from "app/components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import StockTable from "app/components/stockTable/page";
import Link from "next/link";

const stocks = [
  {
    name: "Tata Motors",
    price: "₹699.00",
    change: "-8.70 (-1.23%)",
    changeColor: "text-red-500",
  },
  {
    name: "Samvardhana Motherson",
    price: "₹143.80",
    change: "+1.35 (+0.95%)",
    changeColor: "text-green-600",
  },
  {
    name: "Eternal (Zomato)",
    price: "₹235.25",
    change: "+3.60 (+1.55%)",
    changeColor: "text-green-600",
  },
  {
    name: "PNB",
    price: "₹98.10",
    change: "+0.42 (+0.43%)",
    changeColor: "text-green-600",
  },
  {
    name: "Canara Bank",
    price: "₹106.07",
    change: "+1.29 (+1.23%)",
    changeColor: "text-green-600",
  },
];

export default function Stocks() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"Large" | "Mid" | "Small">("Large");

  // State for Top Gainers (Large, Mid, Small caps)
  type StockItem = { _id: string; name: string; price: string; change: string; image: string };
  const [largeCapsData, setLargeCapsData] = useState<StockItem[]>([]);
  const [midCapsData, setMidCapsData] = useState<StockItem[]>([]);
  const [smallCapsData, setSmallCapsData] = useState<StockItem[]>([]);
  const [loadingLargeCaps, setLoadingLargeCaps] = useState<boolean>(true);
  const [loadingMidCaps, setLoadingMidCaps] = useState<boolean>(true);
  const [loadingSmallCaps, setLoadingSmallCaps] = useState<boolean>(true);
  const [errorLargeCaps, setErrorLargeCaps] = useState<string | null>(null);
  const [errorMidCaps, setErrorMidCaps] = useState<string | null>(null);
  const [errorSmallCaps, setErrorSmallCaps] = useState<string | null>(null);

  // State for Top Losers (Large, Mid, Small caps)
  const [largeCapsLosersData, setLargeCapsLosersData] = useState<StockItem[]>([]);
  const [midCapsLosersData, setMidCapsLosersData] = useState<StockItem[]>([]);
  const [smallCapsLosersData, setSmallCapsLosersData] = useState<StockItem[]>([]);
  const [loadingLargeCapsLosers, setLoadingLargeCapsLosers] = useState<boolean>(true);
  const [loadingMidCapsLosers, setLoadingMidCapsLosers] = useState<boolean>(true);
  const [loadingSmallCapsLosers, setLoadingSmallCapsLosers] = useState<boolean>(true);
  const [errorLargeCapsLosers, setErrorLargeCapsLosers] = useState<string | null>(null);
  const [errorMidCapsLosers, setErrorMidCapsLosers] = useState<string | null>(null);
  const [errorSmallCapsLosers, setErrorSmallCapsLosers] = useState<string | null>(null);

  type ProductTool = { name: string; icon: string };
  const [productToolsData, setProductToolsData] = useState<ProductTool[]>([]);
  const [loadingProductTools, setLoadingProductTools] = useState<boolean>(true);
  const [errorProductTools, setErrorProductTools] = useState<string | null>(null);

  type StockInNews = { _id: string; name: string; price: string; change: string; image: string };
  const [stocksInNewsData, setStocksInNewsData] = useState<StockInNews[]>([]);
  const [loadingStocksInNews, setLoadingStocksInNews] = useState<boolean>(true);
  const [errorStocksInNews, setErrorStocksInNews] = useState<string | null>(null);

  type StockInMTF = { _id: string; name: string; price: string; change: string; image: string };
  const [stocksInMTFData, setStocksInMTFData] = useState<StockInMTF[]>([]);
  const [loadingStocksInMTF, setLoadingStocksInMTF] = useState<boolean>(true);
  const [errorStocksInMTF, setErrorStocksInMTF] = useState<string | null>(null);

  type MostTraded = { _id: string; name: string; price: string; change: string; image: string };
  const [mostTradedData, setMostTradedData] = useState<MostTraded[]>([]);
  const [loadingMostTraded, setLoadingMostTraded] = useState<boolean>(true);
  const [errorMostTraded, setErrorMostTraded] = useState<string | null>(null);

  type TopSector = { name: string; count: number };
  const [topSectorsData, setTopSectorsData] = useState<TopSector[]>([]);
  const [loadingTopSectors, setLoadingTopSectors] = useState<boolean>(true);
  const [errorTopSectors, setErrorTopSectors] = useState<string | null>(null);

  // Fetch Product & Tools data
  useEffect(() => {
    const fetchProductTools = async () => {
      setLoadingProductTools(true);
      setErrorProductTools(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        setProductToolsData(data);
      } catch (error) {
        console.error("Error fetching Product & Tools data:", error);
        setErrorProductTools("Failed to load Product & Tools data. Please try again later.");
        setProductToolsData([]);
      } finally {
        setLoadingProductTools(false);
      }
    };

    fetchProductTools();
  }, []);

  // Fetch Stocks in News data
  useEffect(() => {
    const fetchStocksInNews = async () => {
      setLoadingStocksInNews(true);
      setErrorStocksInNews(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/stocks-in-news/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setStocksInNewsData(formattedData);
      } catch (error) {
        console.error("Error fetching Stocks in News data:", error);
        setErrorStocksInNews("Failed to load Stocks in News data. Please try again later.");
        setStocksInNewsData([]);
      } finally {
        setLoadingStocksInNews(false);
      }
    };

    fetchStocksInNews();
  }, []);

  // Fetch Most Traded on MTF data
  useEffect(() => {
    const fetchStocksInMTF = async () => {
      setLoadingStocksInMTF(true);
      setErrorStocksInMTF(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/getmtf");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        setStocksInMTFData(data);
      } catch (error) {
        console.error("Error fetching Most Traded on MTF data:", error);
        setErrorStocksInMTF("Failed to load Most Traded on MTF data. Please try again later.");
        setStocksInMTFData([]);
      } finally {
        setLoadingStocksInMTF(false);
      }
    };

    fetchStocksInMTF();
  }, []);

  // Fetch Top Gainers data for Large Caps
  useEffect(() => {
    const fetchLargeCaps = async () => {
      setLoadingLargeCaps(true);
      setErrorLargeCaps(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/topgainers/large");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setLargeCapsData(formattedData);
      } catch (error) {
        console.error("Error fetching Large Cap Gainers data:", error);
        setErrorLargeCaps("Failed to load Large Cap Gainers data. Please try again later.");
        setLargeCapsData([]);
      } finally {
        setLoadingLargeCaps(false);
      }
    };

    fetchLargeCaps();
  }, []);

  // Fetch Top Gainers data for Mid Caps
  useEffect(() => {
    const fetchMidCaps = async () => {
      setLoadingMidCaps(true);
      setErrorMidCaps(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/topgainers/mid");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setMidCapsData(formattedData);
      } catch (error) {
        console.error("Error fetching Mid Cap Gainers data:", error);
        setErrorMidCaps("Failed to load Mid Cap Gainers data. Please try again later.");
        setMidCapsData([]);
      } finally {
        setLoadingMidCaps(false);
      }
    };

    fetchMidCaps();
  }, []);

  // Fetch Top Gainers data for Small Caps
  useEffect(() => {
    const fetchSmallCaps = async () => {
      setLoadingSmallCaps(true);
      setErrorSmallCaps(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/topgainers/small");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setSmallCapsData(formattedData);
      } catch (error) {
        console.error("Error fetching Small Cap Gainers data:", error);
        setErrorSmallCaps("Failed to load Small Cap Gainers data. Please try again later.");
        setSmallCapsData([]);
      } finally {
        setLoadingSmallCaps(false);
      }
    };

    fetchSmallCaps();
  }, []);

  // Fetch Top Losers data for Large Caps
  useEffect(() => {
    const fetchLargeCapsLosers = async () => {
      setLoadingLargeCapsLosers(true);
      setErrorLargeCapsLosers(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/toplosers/large");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setLargeCapsLosersData(formattedData);
      } catch (error) {
        console.error("Error fetching Large Cap Losers data:", error);
        setErrorLargeCapsLosers("Failed to load Large Cap Losers data. Please try again later.");
        setLargeCapsLosersData([]);
      } finally {
        setLoadingLargeCapsLosers(false);
      }
    };

    fetchLargeCapsLosers();
  }, []);

  // Fetch Top Losers data for Mid Caps
  useEffect(() => {
    const fetchMidCapsLosers = async () => {
      setLoadingMidCapsLosers(true);
      setErrorMidCapsLosers(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/toplosers/mid");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setMidCapsLosersData(formattedData);
      } catch (error) {
        console.error("Error fetching Mid Cap Losers data:", error);
        setErrorMidCapsLosers("Failed to load Mid Cap Losers data. Please try again later.");
        setMidCapsLosersData([]);
      } finally {
        setLoadingMidCapsLosers(false);
      }
    };

    fetchMidCapsLosers();
  }, []);

  // Fetch Top Losers data for Small Caps
  useEffect(() => {
    const fetchSmallCapsLosers = async () => {
      setLoadingSmallCapsLosers(true);
      setErrorSmallCapsLosers(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/toplosers/small");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.stocks.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setSmallCapsLosersData(formattedData);
      } catch (error) {
        console.error("Error fetching Small Cap Losers data:", error);
        setErrorSmallCapsLosers("Failed to load Small Cap Losers data. Please try again later.");
        setSmallCapsLosersData([]);
      } finally {
        setLoadingSmallCapsLosers(false);
      }
    };

    fetchSmallCapsLosers();
  }, []);

  // Fetch Most Traded on Groww data
  useEffect(() => {
    const fetchMostTraded = async () => {
      setLoadingMostTraded(true);
      setErrorMostTraded(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/mosttradedongrow/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          _id: item._id,
          name: item.name,
          price: item.price,
          change: item.change,
          image: item.image,
        }));
        setMostTradedData(formattedData);
      } catch (error) {
        console.error("Error fetching Most Traded on Groww data:", error);
        setErrorMostTraded("Failed to load Most Traded on Groww data. Please try again later.");
        setMostTradedData([]);
      } finally {
        setLoadingMostTraded(false);
      }
    };

    fetchMostTraded();
  }, []);

  // Fetch Top Sectors data
  useEffect(() => {
    const fetchTopSectors = async () => {
      setLoadingTopSectors(true);
      setErrorTopSectors(null);
      try {
        const response = await fetch("http://localhost:5000/api/stocks/producttools/gettopsectors");
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
          count: item.count,
        }));
        setTopSectorsData(formattedData);
      } catch (error) {
        console.error("Error fetching Top Sectors data:", error);
        setErrorTopSectors("Failed to load Top Sectors data. Please try again later.");
        setTopSectorsData([]);
      } finally {
        setLoadingTopSectors(false);
      }
    };

    fetchTopSectors();
  }, []);

  const getTopGainersData = () => {
    if (selectedCategory === "Large") return largeCapsData;
    if (selectedCategory === "Mid") return midCapsData;
    return smallCapsData;
  };

  const getTopLosersData = () => {
    if (selectedCategory === "Large") return largeCapsLosersData;
    if (selectedCategory === "Mid") return midCapsLosersData;
    return smallCapsLosersData;
  };

  const isLoadingGainers = () => {
    if (selectedCategory === "Large") return loadingLargeCaps;
    if (selectedCategory === "Mid") return loadingMidCaps;
    return loadingSmallCaps;
  };

  const isLoadingLosers = () => {
    if (selectedCategory === "Large") return loadingLargeCapsLosers;
    if (selectedCategory === "Mid") return loadingMidCapsLosers;
    return loadingSmallCapsLosers;
  };

  const getGainersError = () => {
    if (selectedCategory === "Large") return errorLargeCaps;
    if (selectedCategory === "Mid") return errorMidCaps;
    return errorSmallCaps;
  };

  const getLosersError = () => {
    if (selectedCategory === "Large") return errorLargeCapsLosers;
    if (selectedCategory === "Mid") return errorMidCapsLosers;
    return errorSmallCapsLosers;
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-row gap-8">
        <div className="w-3/5 space-y-12">
          {/* Indices */}
          <IndicesSection />

          {/* Most Traded on Groww */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Most Traded on Groww</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {loadingMostTraded ? (
                <p>Loading Most Traded on Groww...</p>
              ) : errorMostTraded ? (
                <p className="text-red-500">{errorMostTraded}</p>
              ) : mostTradedData.length > 0 ? (
                mostTradedData.map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: { state: JSON.stringify({ stockId: item._id, name: item.name, price: item.price, change: item.change, image: item.image, source: "mostTraded" }) },
                    }}
                    key={idx}
                  >
                    <div
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
                <p>No Most Traded on Groww data available.</p>
              )}
            </div>
          </section>

          {/* Product and Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Product & Tools</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {loadingProductTools ? (
                <p>Loading Product & Tools...</p>
              ) : errorProductTools ? (
                <p className="text-red-500">{errorProductTools}</p>
              ) : productToolsData.length > 0 ? (
                productToolsData.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-12 h-12 mb-12 relative">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 break-words text-center">
                      {item.name}
                    </span>
                  </div>
                ))
              ) : (
                <p>No Product & Tools data available.</p>
              )}
            </div>
          </div>

          {/* Top Gainers */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Gainers</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            {getGainersError() && (
              <p className="text-red-500 mb-4">{getGainersError()}</p>
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
              {isLoadingGainers() ? (
                <p>Loading {selectedCategory} Cap Gainers...</p>
              ) : getTopGainersData().length > 0 ? (
                getTopGainersData().map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: { state: JSON.stringify({ stockId: item._id, name: item.name, price: item.price, change: item.change, image: item.image, source: "topGainers", category: selectedCategory.toLowerCase() }) },
                    }}
                    key={idx}
                  >
                    <div
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
                <p>No data available for {selectedCategory} Cap Gainers.</p>
              )}
            </div>
          </section>

          {/* Top Losers */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Losers</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            {getLosersError() && (
              <p className="text-red-500 mb-4">{getLosersError()}</p>
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
              {isLoadingLosers() ? (
                <p>Loading {selectedCategory} Cap Losers...</p>
              ) : getTopLosersData().length > 0 ? (
                getTopLosersData().map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: { state: JSON.stringify({ stockId: item._id, name: item.name, price: item.price, change: item.change, image: item.image, source: "topLosers", category: selectedCategory.toLowerCase() }) },
                    }}
                    key={idx}
                  >
                    <div
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
                <p>No data available for {selectedCategory} Cap Losers.</p>
              )}
            </div>
          </section>

          {/* Most Traded on MTF */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Most Traded on MTF</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {loadingStocksInMTF ? (
                <p>Loading Most Traded on MTF...</p>
              ) : errorStocksInMTF ? (
                <p className="text-red-500">{errorStocksInMTF}</p>
              ) : stocksInMTFData.length > 0 ? (
                stocksInMTFData.map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: { state: JSON.stringify({ stockId: item._id, name: item.name, price: item.price, change: item.change, image: item.image, source: "mostTradedMTF" }) },
                    }}
                    key={idx}
                  >
                    <div
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
                <p>No Most Traded on MTF data available.</p>
              )}
            </div>
          </section>

          {/* Stocks in News */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Stocks in News</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {loadingStocksInNews ? (
                <p>Loading Stocks in News...</p>
              ) : errorStocksInNews ? (
                <p className="text-red-500">{errorStocksInNews}</p>
              ) : stocksInNewsData.length > 0 ? (
                stocksInNewsData.map((item, idx) => (
                  <Link
                    href={{
                      pathname: `/buystock/${encodeURIComponent(item.name)}`,
                      query: { state: JSON.stringify({ stockId: item._id, name: item.name, price: item.price, change: item.change, image: item.image, source: "stocksInNews" }) },
                    }}
                    key={idx}
                  >
                    <div
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
                <p>No Stocks in News data available.</p>
              )}
            </div>
          </section>

          {/* Top Sectors */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Sectors</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="flex flex-wrap gap-3">
              {loadingTopSectors ? (
                <p>Loading Top Sectors...</p>
              ) : errorTopSectors ? (
                <p className="text-red-500">{errorTopSectors}</p>
              ) : topSectorsData.length > 0 ? (
                topSectorsData.map((sector, index) => (
                  <button
                    key={index}
                    className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm space-x-2 text-sm"
                  >
                    <span className="text-gray-800 font-medium">{sector.name}</span>
                    <span className="text-gray-400 font-light">|</span>
                    <span className="text-green-500 font-semibold">{sector.count}</span>
                  </button>
                ))
              ) : (
                <p>No Top Sectors data available.</p>
              )}
            </div>
          </section>

          {/* Top by Market Cap */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top by Market Cap</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="w-full max-w-4xl mx-auto">
              <StockTable />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="max-w-sm w-full bg-white rounded-xl p-6 text-center flex flex-col">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Your Investments</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                Dashboard
              </a>
            </div>

            <div className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-500">Total Returns</div>
                  <div className="text-lg font-bold">₹0</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Current Value</div>
                  <div className="text-lg font-bold">₹0</div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">All Watchlists</h2>
                <a
                  href="#"
                  className="text-green-600 text-sm font-medium hover:underline"
                >
                  View all
                </a>
              </div>

              <div className="p-4 bg-white rounded shadow transition-all duration-300 ease-in-out">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div>
                    <div className="font-semibold">My Watchlist</div>
                    <div className="text-sm text-gray-500">{stocks.length} items</div>
                  </div>
                  <div className="text-xl font-bold">{isOpen ? "▲" : "▼"}</div>
                </div>

                {isOpen && (
                  <div className="mt-4 space-y-3">
                    {stocks.map((stock, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <div className="text-gray-800 font-medium">{stock.name}</div>
                        <div className="text-right">
                          <div className="font-semibold">{stock.price}</div>
                          <div className={`text-sm ${stock.changeColor}`}>
                            {stock.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="mt-5 flex items-center text-green-600 font-semibold">
                <span className="text-xl mr-2">＋</span> Create new watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}