"use client";

import Image from "next/image";
import { useState } from "react";

const StockFilterSectionLosers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Large");

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

  const getData = () => {
    if (selectedCategory === "Large") return largeCaps;
    if (selectedCategory === "Mid") return midCaps;
    return smallCaps;
  };

  return (
    <section>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-px h-6 bg-gray-300"></div>
        {["Large", "Mid", "Small"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
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
        {getData().map((item, idx) => (
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
                item.change.startsWith("-") ? "text-red-500" : "text-green-600"
              }`}
            >
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockFilterSectionLosers;
