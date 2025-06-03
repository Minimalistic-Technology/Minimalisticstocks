// ```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

type StockItem = {
  _id: string;
  name: string;
  price: string;
  change: string;
  image: string;
};

interface StockTableProps {
  stocks: StockItem[];
}

export default function StockTable({ stocks }: StockTableProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(stocks.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginatedStocks = stocks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* Table Header */}
      <div className="grid grid-cols-4 sm:grid-cols-6 font-semibold text-gray-600 mb-2 text-sm sm:text-base">
        <span className="col-span-1 sm:col-span-2">Company</span>
        <span className="hidden sm:block"></span>
        <span className="col-span-1 sm:col-span-2">Market Price</span>
        <span className="col-span-1 sm:col-span-1">Watchlist</span>
      </div>

      {/* Table Rows */}
      {paginatedStocks.map((stock, index) => (
        <Link
          key={index}
          href={{
            pathname: `/buystock/${encodeURIComponent(stock.name)}`,
            query: {
              state: JSON.stringify({
                stockId: stock._id,
                name: stock.name,
                price: stock.price,
                change: stock.change,
                image: stock.image,
                source: "topMarket",
              }),
            },
          }}
        >
          <div className="grid grid-cols-4 sm:grid-cols-6 items-start text-sm sm:text-base py-4 border-b hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-2 col-span-2 sm:col-span-2">
              <Image
                src={stock.image}
                alt={stock.name}
                width={24}
                height={24}
              />
              <span className="font-medium truncate">{stock.name}</span>
            </div>

            <div className="hidden sm:block"></div>

            <div className="flex flex-col col-span-1 sm:col-span-2">
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

            <div className="flex justify-center col-span-1 sm:col-span-1">
              <div className="w-6 h-6 flex items-center justify-center bg-green-100 text-green-600 rounded-full cursor-pointer">
                <FaPlus size={10} />
              </div>
            </div>
          </div>
        </Link>
      ))}

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-center space-x-1 sm:space-x-2 mt-6 text-sm sm:text-base font-medium text-gray-700">
        <button
          className="px-2 py-1 hover:text-green-600 rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous Page"
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
            aria-current={num === currentPage ? "page" : undefined}
          >
            {num}
          </button>
        ))}
        <button
          className="px-2 py-1 hover:text-green-600 rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
// ```