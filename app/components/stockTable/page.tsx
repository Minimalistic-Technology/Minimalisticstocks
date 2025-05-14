"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";


type Stock = {
  name: string;
  icon: string;
  price: string;
  change: string;
};

const stockData: Stock[] = [
  {
    name: "Reliance Industries",
    icon: "/reliance.svg",
    price: "1,415.70",
    change: "-20.80 (1.45%)",
  },
  {
    name: "Infosys Ltd.",
    icon: "/infosys.svg",
    price: "1,325.40",
    change: "+15.20 (1.16%)",
  },
  {
    name: "TCS",
    icon: "/tcs.svg",
    price: "3,400.00",
    change: "-12.30 (0.36%)",
  },
  {
    name: "HDFC Bank",
    icon: "/hdfc.svg",
    price: "1,200.55",
    change: "+10.50 (0.89%)",
  },
  {
    name: "ICICI Bank",
    icon: "/icici.svg",
    price: "1,050.25",
    change: "-8.40 (0.79%)",
  },
  {
    name: "Wipro",
    icon: "/wipro.svg",
    price: "580.20",
    change: "+5.15 (0.89%)",
  },
  {
    name: "L&T",
    icon: "/lt.svg",
    price: "2,005.65",
    change: "-14.20 (0.71%)",
  },
  {
    name: "Adani Enterprises",
    icon: "/adani.svg",
    price: "2,950.75",
    change: "+20.00 (0.68%)",
  },
];

export default function StockTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(stockData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedStocks = stockData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Table Header */}
      <div className="grid grid-cols-4 font-semibold text-gray-600 mb-2 text-sm">
        <span>Company</span>
        <span></span>
        <span>Market Price</span>
        <span>Watchlist</span>
      </div>

      {/* Table Rows */}
      {paginatedStocks.map((stock, index) => (
        <div
          key={index}
          className="grid grid-cols-4 items-start text-sm py-4 border-b"
        >
          <div className="flex items-center space-x-2 col-span-1">
            <Image src={stock.icon} alt={stock.name} width={24} height={24} />
            <span className="font-medium">{stock.name}</span>
          </div>

          <div></div>

          <div className="flex flex-col">
            <span className="text-black font-semibold">₹{stock.price}</span>
            <span
              className={`text-xs mt-1 ${
                stock.change.startsWith("-")
                  ? "text-red-500"
                  : "text-green-600"
              }`}
            >
              {stock.change}
            </span>
          </div>

          <div className="flex justify-center">
            <div className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded-full cursor-pointer">
              <FaPlus size={10} />
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 mt-6 text-sm font-medium text-gray-700">
        <button
          className="px-2 py-1 hover:text-green-600"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            onClick={() => handlePageChange(num)}
            className={`px-2 py-1 rounded ${
              num === currentPage
                ? "bg-green-100 text-green-700 font-semibold"
                : "hover:bg-green-50"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          className="px-2 py-1 hover:text-green-600"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
