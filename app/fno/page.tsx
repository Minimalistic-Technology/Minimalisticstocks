"use client";

import IndicesSection from "../components/index/page";
import Header from "../components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useState, useEffect } from "react";

export default function FNOPAGE() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1 Day");
  const [topIndexFutures, setTopIndexFutures] = useState<
    { name: string; price: string; change: string; image: string }[]
  >([]);
  const [topStockFutures, setTopStockFutures] = useState<
    { name: string; price: string; change: string; image: string }[]
  >([]);
  const [stockData, setStockData] = useState<
    {
      name: string;
      icon: string;
      price: string;
      change: string;
      volume: string;
    }[]
  >([]);
  const [collections, setCollections] = useState<
    {
      name: string;
      icon: string;
      lasttraded: string;
      daychange: string;
    }[]
  >([]);

  // Fetch Top Traded data
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stocks/gett");
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        console.error("Error fetching Top Traded:", error);
      }
    };

    fetchCollections();
  }, []);

  // Fetch Top Traded Index Futures data
  useEffect(() => {
    const fetchTopIndexFutures = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stocks/getTopIndexFutures"
        );
        const data = await response.json();
        setTopIndexFutures(data);
      } catch (error) {
        console.error("Error fetching Top Index Futures:", error);
      }
    };

    fetchTopIndexFutures();
  }, []);

  // Fetch Top Traded Stock Futures data
  useEffect(() => {
    const fetchTopStockFutures = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/stocks/getTopStockFutures"
        );
        const data = await response.json();
        setTopStockFutures(data);
      } catch (error) {
        console.error("Error fetching Top Stock Futures:", error);
      }
    };

    fetchTopStockFutures();
  }, []);

  // Fetch F&O Stocks data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/stocks/get");
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error("Error fetching F&O Stocks:", error);
      }
    };

    fetchStockData();
  }, []);

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
              <h2 className="text-2xl font-bold">Top traded</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                See More
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {collections.length > 0 ? (
                collections.map((item, i) => (
                  <div
                    key={i}
                    className="p-4 border rounded-xl bg-white text-center shadow-md"
                  >
                    <p className="text-sm font-semibold mb-2">{item.name}</p>
                    <div className="w-full h-20 flex items-center justify-center mb-2">
                      <Image
                        src={item.icon}
                        alt={item.name}
                        width={60}
                        height={60}
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
                ))
              ) : (
                <p>Loading Top Traded...</p>
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
              <button className="px-4 py-1 rounded-full bg-gray-100 text-sm">
                Gainers
              </button>
              <button className="px-4 py-1 rounded-full bg-white border text-sm">
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
              {stockData.length > 0 ? (
                stockData.map((stock, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-4 items-center text-sm py-2 border-b"
                  >
                    <div className="flex items-center space-x-2">
                      <Image
                        src={stock.icon}
                        alt={stock.name}
                        width={24}
                        height={24}
                      />
                      <span>{stock.name}</span>
                    </div>
                    <span>₹{stock.price}</span>
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
                ))
              ) : (
                <p>Loading F&O Stocks...</p>
              )}
            </div>
          </section>

          {/* Top Traded Index Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Index Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {topIndexFutures.length > 0 ? (
                topIndexFutures.map((item, idx) => (
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
                        item.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading Top Index Futures...</p>
              )}
            </div>
          </section>

          {/* Top Traded Stock Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Stock Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {topStockFutures.length > 0 ? (
                topStockFutures.map((item, idx) => (
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
                        item.change.startsWith("-")
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {item.change}
                    </div>
                  </div>
                ))
              ) : (
                <p>Loading Top Stock Futures...</p>
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