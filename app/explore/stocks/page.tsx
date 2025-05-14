"use client";
import StockFilterSectionLosers from "app/components/topLosers/page";
import StockFilterSection from "app/components/topGainers/page";
import IndicesSection from "app/components/index/page";
import Header from "app/components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";
import { FaLink } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import StockTable from "app/components/stockTable/page";

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

const collection = [
  {
    name: "Terminal",
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/products_terminal_light.svg",
  },
  {
    name: "Events",
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/calendar_mint_light.svg",
  },
  {
    name: "Intraday",
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/intraday_mint_light.svg",
  },
  {
    name: "IPO",
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/ipo_mint_light.svg",
  },
  {
    name: "Screener",
    icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/screener_mint_light.svg",
  },
];

export default function Stocks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-row gap-8">
        <div className="w-3/5 space-y-12">
          {/* Indices */}
          <IndicesSection />

          {/* Most Traded on Groww*/}
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
              {[
                {
                  name: "BSE",
                  price: "₹7,315.50",
                  change: "+360 (5.18%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/BSELtd_11315994_21236.png",
                },
                {
                  name: "Bharat Dynamics",
                  price: "₹1,746.70",
                  change: "176.80 (11.26%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/BDL.png",
                },
                {
                  name: "Tanla Platforms",
                  price: "₹557.35",
                  change: "62.90 (12.72%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/TanlaSolutions_48102096060_24392.png",
                },
                {
                  name: "Mazagon Dock Ship",
                  price: "₹3,002.60",
                  change: "98.20 (3.38%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/MAZDOCK.png",
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

          {/* Product and Tools */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Product & Tools</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {collection.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 mb-2">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      width={64}
                      height={64}
                    />
                  </div>
                  <span className="text-sm pt-6 font-medium">{item.name}</span>
                </div>
              ))}
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

            {/* Filter Bar */}
            <StockFilterSection></StockFilterSection>
          </section>

          {/* Most Traded on MTF*/}
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
              {[
                {
                  name: "Dr Lal PAthLabs",
                  price: "₹2,779.80",
                  change: "-27.30 (0.97%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/DrLalPathlabs_70043015965_41261.png",
                },
                {
                  name: "Bharat Dynamics",
                  price: "₹1,746.70",
                  change: "176.80 (11.26%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/BDL.png",
                },
                {
                  name: "Swiggy",
                  price: "₹310.55",
                  change: "-9.75 (3.04%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/SWIGGY.png",
                },
                {
                  name: "Infosys",
                  price: "₹1,568.60",
                  change: "-58.30 (3.58%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/INFY.png",
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
              {[
                {
                  name: "Jyothy Labs",
                  price: "₹336.20",
                  change: "-14.60 (4.16%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/JyothyLab_50398716670_14775.png",
                },
                {
                  name: "Tata Motors",
                  price: "₹707.70",
                  change: "-13.10 (1.82%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/TataMotors_19446492084_560.png",
                },
                {
                  name: "NIIT",
                  price: "₹137.02",
                  change: "0.55 (0.40%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/NIIT_15700905793_2771.png",
                },
                {
                  name: "Yes Bank",
                  price: "₹20.87",
                  change: "0.46 (2.25%)",
                  image:
                    "https://assets-netstorage.groww.in/stock-assets/logos2/YESBANK(1).png",
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

            {/* Filter Bar */}
            <StockFilterSectionLosers></StockFilterSectionLosers>
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
              {[
                { name: "Energy", count: 99 },
                { name: "Healthcare", count: 235 },
                { name: "FMCG", count: 222 },
                { name: "Automobile", count: 145 },
                { name: "Tele-Communication", count: 47 },
                { name: "Media & Entertainment", count: 105 },
              ].map((sector, index) => (
                <button
                  key={index}
                  className="flex items-center border border-gray-300 rounded-md px-4 py-2 bg-white shadow-sm space-x-2 text-sm"
                >
                  <span className="text-gray-800 font-medium">
                    {sector.name}
                  </span>
                  <span className="text-gray-400 font-light">|</span>
                  <span className="text-green-500 font-semibold">
                    {sector.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

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
              <StockTable></StockTable>
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="max-w-sm w-full bg-white rounded-xl p-6 text-center  flex flex-col">
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

            {/* Investments Box */}
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

            {/* Watchlist */}
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
                    <div className="text-sm text-gray-500">
                      {stocks.length} items
                    </div>
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
                        <div className="text-gray-800 font-medium">
                          {stock.name}
                        </div>
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

                <button className="mt-5 flex items-center text-green-600 font-semibold">
                  <span className="text-xl mr-2">＋</span> Create new watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
