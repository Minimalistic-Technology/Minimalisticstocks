"use client";

const getPositionPercent = (low: number, high: number, current: number) => {
  return ((current - low) / (high - low)) * 100;
};

type Order = {
  price: number;
  qty: number;
};
const bidData: Order[] = [
  { price: 1773.5, qty: 52 },
  { price: 1773.3, qty: 7 },
  { price: 1773.2, qty: 35 },
  { price: 1773.1, qty: 103 },
  { price: 1773.0, qty: 2060 },
];

const askData: Order[] = [
  { price: 1773.7, qty: 17 },
  { price: 1774.2, qty: 92 },
  { price: 1774.3, qty: 103 },
  { price: 1774.4, qty: 94 },
  { price: 1774.5, qty: 269 },
];



export default function Overview() {

 


  const todayLow = 1720.4;
  const todayHigh = 1815.0;
  const todayCurrent = 1760;

  const low52W = 1180.2;
  const high52W = 2979.45;
  const current52W = 1900;

  const todayPos = getPositionPercent(todayLow, todayHigh, todayCurrent);
  const pos52W = getPositionPercent(low52W, high52W, current52W);

  const maxBidQty = Math.max(...bidData.map((b) => b.qty));
  const maxAskQty = Math.max(...askData.map((a) => a.qty));

  

  

  return (
    <div className="flex flex-col gap-8">
      <div className="text-sm text-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Performance</h2>

        {/* --- Today Range --- */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="font-semibold">Today's Low</p>
            <p>₹{todayLow}</p>
          </div>

          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-1 bg-green-500 relative rounded">
              <div
                className="absolute text-gray-600 top-3"
                style={{
                  left: `${todayPos}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ▲
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold">Today's High</p>
            <p>₹{todayHigh}</p>
          </div>
        </div>

        {/* --- 52W Range --- */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="font-semibold">52W Low</p>
            <p>₹{low52W}</p>
          </div>

          <div className="flex flex-col items-center flex-1 mx-4">
            <div className="w-full h-1 bg-green-500 relative rounded">
              <div
                className="absolute text-gray-600 top-3"
                style={{
                  left: `${pos52W}%`,
                  transform: "translateX(-50%)",
                }}
              >
                ▲
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="font-semibold">52W High</p>
            <p>₹{high52W}</p>
          </div>
        </div>

        {/* --- Divider --- */}
        <hr className="border-t border-dashed border-gray-300 my-4" />

        {/* --- Stats Row --- */}
        <div className="flex flex-wrap justify-between gap-y-4 text-sm">
          {[
            { label: "Open", value: "₹1,726.00" },
            { label: "Prev. Close", value: "₹1,699.40" },
            { label: "Volume", value: "1,56,67,071" },
            { label: "Total Traded Value", value: "₹2,776 Cr" },
            { label: "Upper Circuit", value: "₹2,039.20" },
            { label: "Lower Circuit", value: "₹1,359.60" },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col pr-4">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Market Depth</h2>

        {/* Buy/Sell Bar */}
        <div className="text-sm font-medium text-gray-700 flex justify-between mb-1">
          <span>Buy order quantity</span>
          <span>Sell order quantity</span>
        </div>
        <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
          <div
            className="absolute left-0 top-0 h-full bg-green-500"
            style={{ width: "32.02%" }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-red-500"
            style={{ width: "67.98%" }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-600 mb-4">
          <span>32.02%</span>
          <span>67.98%</span>
        </div>

        {/* Bid and Ask Tables */}
        <div className="grid grid-cols-2 gap-6 text-sm">
          {/* Bid */}
          <div>
            <h3 className="font-medium mb-2">Bid Price</h3>
            {bidData.map((bid, idx) => (
              <div
                key={idx}
                className="mb-1 flex justify-between items-center relative"
              >
                <span>{bid.price.toFixed(2)}</span>
                <span className="relative z-10 w-20 text-end">
                  <span className="relative z-20 text-green-600 font-medium">
                    {bid.qty}
                  </span>
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-4 bg-green-100 rounded"
                    style={{
                      width: `${(bid.qty / maxBidQty) * 100}%`,
                      zIndex: 0,
                    }}
                  />
                </span>
              </div>
            ))}
            <p className="mt-2 font-semibold">Bid Total: 3,37,454</p>
          </div>

          {/* Ask */}
          <div>
            <h3 className="font-medium mb-2">Ask Price</h3>
            {askData.map((ask, idx) => (
              <div
                key={idx}
                className="mb-1 flex justify-between items-center relative"
              >
                <span>{ask.price.toFixed(2)}</span>
                <span className="relative z-10 w-20 text-end">
                  <span className="relative z-20 text-red-600 font-medium">
                    {ask.qty}
                  </span>
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 h-4 bg-red-100 rounded"
                    style={{
                      width: `${(ask.qty / maxAskQty) * 100}%`,
                      zIndex: 0,
                    }}
                  />
                </span>
              </div>
            ))}
            <p className="mt-2 font-semibold">Ask Total: 7,16,462</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Fundamentals</h2>

        <div className="grid grid-cols-2 gap-x-6 text-sm">
          {/* Left Column */}
          <div className="flex flex-col gap-3 pr-4">
            <div className="flex justify-between">
              <span>Market Cap</span>
              <span className="font-semibold">₹44,708Cr</span>
            </div>
            <div className="flex justify-between">
              <span>P/E Ratio (TTM)</span>
              <span className="font-semibold">55.96</span>
            </div>
            <div className="flex justify-between">
              <span>P/B Ratio</span>
              <span className="font-semibold">8.47</span>
            </div>
            <div className="flex justify-between">
              <span>Industry P/E</span>
              <span className="font-semibold">47.33</span>
            </div>
            <div className="flex justify-between">
              <span>Debt to Equity</span>
              <span className="font-semibold">0.10</span>
            </div>
          </div>

          {/* Right Column with Left Dashed Border */}
          <div className="flex flex-col gap-3 pl-4 border-l border-dashed border-gray-300">
            <div className="flex justify-between">
              <span>ROE</span>
              <span className="font-semibold">16.42%</span>
            </div>
            <div className="flex justify-between">
              <span>EPS (TTM)</span>
              <span className="font-semibold">30.37</span>
            </div>
            <div className="flex justify-between">
              <span>Dividend Yield</span>
              <span className="font-semibold">0.57%</span>
            </div>
            <div className="flex justify-between">
              <span>Book Value</span>
              <span className="font-semibold">200.53</span>
            </div>
            <div className="flex justify-between">
              <span>Face Value</span>
              <span className="font-semibold">5</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-xs items-center gap-1 flex">
          <span>Understand Fundamentals</span>
          <div className="cursor-pointer hover:underline">
            <span className="text-gray-400">ⓘ</span>
          </div>
        </div>
      </div>
      
    </div>
  );
}
