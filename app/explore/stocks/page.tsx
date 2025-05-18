"use client";
import React from 'react';
import Header from '../../components/header/page';

const GrowwDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <Header/>

      {/* Main Content */}
      <main className="p-6 space-y-10">
        {/* Indices */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Indices</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'NIFTY', value: '24,414.40', change: '+34.80 (0.14%)' },
              { name: 'SENSEX', value: '80,746.78', change: '+105.71 (0.13%)' },
              { name: 'BANKNIFTY', value: '54,610.90', change: '+339.50 (0.63%)' },
              { name: 'MIDCAP', value: '12,265.10', change: '+89.20 (0.73%)' }
            ].map(index => (
              <div key={index.name} className="p-4 bg-white rounded shadow">
                <div className="text-sm text-gray-500">{index.name}</div>
                <div className="text-lg font-bold">{index.value}</div>
                <div className="text-green-600 text-sm">{index.change}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Investments */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-4">Most traded on Groww</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'BSE', price: '₹6,652.50', change: '+407.50 (6.53%)' },
                { name: 'Welspun Living', price: '₹134.98', change: '+14.49 (12.03%)' },
                { name: 'CCL Products India', price: '₹772.60', change: '+78.15 (11.25%)' },
                { name: 'Mazagon Dock Ship', price: '₹2,816.20', change: '-156.40 (5.26%)', red: true }
              ].map(stock => (
                <div key={stock.name} className="p-4 bg-white rounded shadow text-center">
                  <div className="text-sm font-medium">{stock.name}</div>
                  <div className="text-lg font-bold">{stock.price}</div>
                  <div className={stock.red ? 'text-red-500' : 'text-green-600'}>
                    {stock.change}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Your Investments</h2>
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
              <h2 className="text-xl font-semibold mb-4">All Watchlists</h2>
              <div className="p-4 bg-white rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Sandip's Watchlist</div>
                    <div className="text-sm text-gray-500">5 items</div>
                  </div>
                  <button className="text-green-600 font-semibold">View all</button>
                </div>
                <button className="mt-4 flex items-center text-green-600 font-semibold">
                  <span className="text-xl mr-2">＋</span>Create new watchlist
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GrowwDashboard;