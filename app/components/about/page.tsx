import React, { useState } from "react";

type InfoProps = {
  parentOrg: string;
  managingDirector: string;
  nseSymbol: string;
  description: string;
};

export default function CompanyInfoCard({
  parentOrg,
  managingDirector,
  nseSymbol,
  description,
}: InfoProps) {
  const [expanded, setExpanded] = useState(false);
  const limit = 120;

  const isLongText = description.length > limit;
  const visibleText = expanded
    ? description
    : description.slice(0, limit) + (isLongText ? "..." : "");

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-semibold mb-6">About {parentOrg}</h2>

      {/* Description with Read More */}
      <p className="text-gray-800">
        {visibleText}
        {isLongText && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-2 text-green-600 font-semibold hover:underline focus:outline-none"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>
      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-6 pr-4">
          <div className="grid grid-cols-[160px_1fr] gap-2">
            <p className="text-gray-700 font-semibold">Parent Organisation</p>
            <span className="text-black font-medium">{parentOrg}</span>
          </div>
          <div className="grid grid-cols-[160px_1fr] gap-2">
            <p className="text-gray-700 font-semibold">Managing Director</p>
            <span className="text-black font-medium">{managingDirector}</span>
          </div>
        </div>

        {/* Dashed Vertical Divider */}
        <div className="border border-dashed border-gray-300 my-4" />

        {/* Right Column */}
        <div className="grid grid-cols-[160px_1fr] gap-2  ">
          <p className="text-gray-600 font-semibold">NSE Symbol</p>
          <p className="text-green-600 text-2xl font-bold">{nseSymbol}</p>
        </div>
      </div>
    </div>
  );
}
