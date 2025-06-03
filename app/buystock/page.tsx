"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Tabs from "../components/Tabs/page";
import Overview from "../components/Overview/page";
import NewsSection from "app/components/news/page";
import Header from "../components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image"; 
import StockChart from "app/components/graph/page";
import EventsSection from "app/components/event/page";

// Tab options
type TabOption = "Overview" | "News" | "Events";
type Params = { stockname: string };
type Order = {
  price: number;
  qty: number;
};

export default function BuyStock() {
  const [activeTab, setActiveTab] = useState<TabOption>("Overview");
  const params = useParams() as Params;
  const stockName = decodeURIComponent(params.stockname);

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
        {/* Left column (Tabs + content) */}
        <div className="w-full lg:w-4/5 space-y-12">
          <div>
            <StockChart />
          </div>
          <div className="p-6 rounded-lg shadow-sm bg-white">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "Overview" && <Overview />}
            {activeTab === "News" && <NewsSection />}
            {activeTab === "Events" && <EventsSection />}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-full lg:w-1/5 bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm h-fit">
          <div className="flex items-center justify-center mb-6">
            <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-400">
              <Image
                src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/default.b40891fd.svg"
                alt="Unlock F&O"
                width={50}
                height={50}
              />
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Looking to invest in Stocks?
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Create your dmat account in 2 minutes.
          </p>

          <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-lg transition-all">
            UNLOCK STOCKS
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
