"use client";

import React from "react";

const indicesData = [
  {
    name: "Nifty",
    lasttraded: "24,008.00",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "Sensex",
    lasttraded: "79,454.47",
    daychange: "-294.40(1.21%)",
  },
  {
    name: "BANKNIFTY",
    lasttraded: "53,732.00",
    daychange: "+150.25(0.65%)",
  },
  {
    name: "MIDCPNIFTY",
    lasttraded: "12,040.30",
    daychange: "+89.20(0.35%)",
  },
];

const IndicesSection = () => {
  return (
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
        {indicesData.map((fund, i) => (
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
  );
};

export default IndicesSection;
