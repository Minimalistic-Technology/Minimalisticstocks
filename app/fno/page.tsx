"use client";

import Header from "../components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";

const collections = [
  {
    name: "Nifty 50",
    icon: "/images/highreturn.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "SIP",
    icon: "/images/highreturn.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "Tax Saving",
    icon: "/images/tax.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "Large Cap",
    icon: "/images/highreturn.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "Mid Cap",
    icon: "/images/highreturn.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "Small Cap",
    icon: "/images/highreturn.png",
    lasttraded: "23,981.55",
    daychange: "-294.40(1.21%)",
  },
];

const stockData = [
  {
    name: "Reliance",
    icon: "/images/highreturn.png",
    price: "2,760.10",
    change: "+25.20(1.05%)",
    volume: "57,45,05,272",
  },
  {
    name: "TCS",
    icon: "/images/highreturn.png",
    price: "3,420.50",
    change: "-18.50(0.54%)",
    volume: "12,45,23,892",
  },
  {
    name: "Infosys",
    icon: "/images/highreturn.png",
    price: "1,460.00",
    change: "+10.00(0.69%)",
    volume: "9,23,45,111",
  },
  {
    name: "HDFC Bank",
    icon: "/images/highreturn.png",
    price: "1,580.65",
    change: "+5.30(0.34%)",
    volume: "18,30,22,101",
  },
  {
    name: "ITC",
    icon: "/images/highreturn.png",
    price: "415.90",
    change: "-2.75(0.66%)",
    volume: "22,45,80,300",
  },
];

export default function FNOPAGE() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1 Day");

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-row gap-8">
        <div className="w-3/5 space-y-12">
          {/* Indices */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Indices</h2>
              <a
                href="#"
                className="text-green-600 text-sm font-medium hover:underline"
              >
                All Indices
              </a>
            </div>
            <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
              {[
                {
                  name: "Nifty",
                  lasttraded: "23,981.55",
                  daychange: "-294.40(1.21%)",
                },
                {
                  name: "Nippon",
                  lasttraded: "23,981.55",
                  daychange: "-294.40(1.21%)",
                },
                {
                  name: "Sensex",
                  lasttraded: "23,981.55",
                  daychange: "+150.25(0.65%)",
                },
                {
                  name: "SBI",
                  lasttraded: "23,981.55",
                  daychange: "+89.20(0.35%)",
                },
              ].map((fund, i) => (
                <div
                  key={i}
                  className="min-w-[200px] rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition"
                >
                  <p className="font-medium">{fund.name}</p>
                  <p className="text-black text-sm">{fund.lasttraded}</p>
                  <p
                    className={`text-sm ${
                      fund.daychange.startsWith("-")
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {fund.daychange}
                  </p>
                </div>
              ))}
            </div>
          </section>

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
              {collections.map((item, i) => (
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
              ))}
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
              {stockData.map((stock, index) => (
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
              ))}
            </div>
          </section>

          {/* Top Traded Index Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Index Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {[
                {
                  name: "NIFTY 29 May Fut",
                  price: "₹24,092.00",
                  change: "-179.90 (-0.74%)",
                  image: "/images/nifty.png",
                },{
                  name: "NIFTY 29 May Fut",
                  price: "₹24,092.00",
                  change: "-179.90 (-0.74%)",
                  image: "/images/nifty.png",
                },{
                  name: "NIFTY 29 May Fut",
                  price: "₹24,092.00",
                  change: "-179.90 (-0.74%)",
                  image: "/images/nifty.png",
                },{
                  name: "NIFTY 29 May Fut",
                  price: "₹24,092.00",
                  change: "-179.90 (-0.74%)",
                  image: "/images/nifty.png",
                },
                
              ].map((item, idx) => (
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
              ))}
            </div>
          </section>

          {/* Top Traded Stock Futures */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Top Traded Stock Futures</h2>
            </div>
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
              {[
                {
                  name: "Tata Motors 29 May Fut",
                  price: "₹709.90",
                  change: "+26.90 (+3.94%)",
                  image: "/images/tatamotors.png",
                },{
                  name: "Tata Motors 29 May Fut",
                  price: "₹709.90",
                  change: "+26.90 (+3.94%)",
                  image: "/images/tatamotors.png",
                },{
                  name: "Tata Motors 29 May Fut",
                  price: "₹709.90",
                  change: "+26.90 (+3.94%)",
                  image: "/images/tatamotors.png",
                },{
                  name: "Tata Motors 29 May Fut",
                  price: "₹709.90",
                  change: "+26.90 (+3.94%)",
                  image: "/images/tatamotors.png",
                },
               
              ].map((item, idx) => (
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
              ))}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="max-w-sm w-full bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm max-h-100">
          <div className="flex items-center justify-center mb-6">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-400">
              <Image
                src="/images/highreturn.png"
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
