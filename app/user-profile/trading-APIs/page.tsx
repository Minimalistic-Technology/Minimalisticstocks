"use client"; // Required for client-side rendering

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to detect current route
import { ChevronRight } from "lucide-react";
import Header from "../../components/header/page"; // Unchanged import
import menuItems from "../menuItems"; // Unchanged import

export default function ChangePasswordPage() {
  const pathname = usePathname(); // Get the current route

  return (
    <div
      className="flex flex-col min-h-screen bg-white"
      style={{
        backgroundImage: `url(https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/basicDetailsBg.5f4e9d68.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-82 bg-white shadow-md ml-18 mt-18 border-2 border-[#E9E9EB] rounded-lg">
          <div className="p-6 border-b flex flex-col items-center">
            <div className="w-25 h-25 rounded-full bg-orange-600 flex items-center justify-center text-white text-5xl font-bold">
              M
            </div>
            <h2 className="mt-2 text-lg font-semibold text-gray-800">
              Mahesh Kumar
            </h2>
          </div>
          <nav className="mt-2">
            {menuItems.map((item, index) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between p-4 text-gray-700 w-full text-left hover:bg-gray-100 ${
                    index < menuItems.length - 1 ? "" : "border-b"
                  } ${pathname === item.href ? "bg-gray-100" : ""}`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="mt-18 ml-10 w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Supercharged APIs Section */}
            <div className="col-span-2 text-center mb-4">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
                Supercharged APIs
              </h2>
            </div>

            {/* Feature List in Separated Box */}
            <div className="col-span-2 border-2 rounded-lg p-6 bg-white shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <ul className="space-y-4 text-gray-700">
                  <li>✔️ Live Market Data and Feed</li>
                  <li>✔️ Order Management APIs</li>
                  <li>✔️ Portfolio APIs</li>
                </ul>
                <ul className="space-y-4 text-gray-700">
                  <li>✔️ Margin APIs</li>
                  <li>✔️ Historical data</li>
                  <li>✔️ Unmatched speed at 100 request/min</li>
                </ul>
              </div>
            </div>

            {/* Pricing Plans in Separated Box */}
            <div className="col-span-2 border-2 rounded-lg p-6 bg-white shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="border rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-1">₹417</div>
                  <div className="text-gray-600 mb-2">Per month plus taxes</div>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    <li>✓ Total annual cost ₹4999 + taxes</li>
                    <li>✓ Billed yearly</li>
                    <li>✓ Plan auto-renews every year</li>
                    <li>✓ Plan amount will be deducted from your Groww balance</li>
                  </ul>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">
                    Get started with yearly
                  </button>
                </div>

                <div className="border rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-green-600 mb-1">₹499</div>
                  <div className="text-gray-600 mb-2">Per month plus taxes</div>
                  <ul className="text-sm text-gray-700 space-y-1 mb-4">
                    <li>✓ Total annual cost ₹5988 + taxes</li>
                    <li>✓ Billed monthly</li>
                    <li>✓ Plan auto-renews every month</li>
                    <li>✓ Plan amount will be deducted from your Groww balance</li>
                  </ul>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold">
                    Get started with monthly
                  </button>
                </div>
              </div>
            </div>
            {/* End Pricing Section */}
          </div>
        </main>
      </div>
    </div>
  );
}
