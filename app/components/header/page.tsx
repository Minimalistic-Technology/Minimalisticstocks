"use client";

import { useState } from "react";
import { Bell, Wallet, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const tabs = [
    { label: "Stocks", href: "/dashboard" },
    { label: "F&O", href: "/fno" },
    { label: "Mutual Funds", href: "/mutual" },
  ];

  return (
    <header className="w-full shadow bg-white">
      {/* Top Row */}
      <div className="px-4 md:px-8 py-3 flex flex-wrap md:flex-nowrap justify-between items-center gap-3">
        {/* Logo & Nav */}
        <div className="flex flex-wrap md:flex-nowrap items-center space-x-4 md:space-x-6 w-full md:w-auto">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400"></div>
            <span className="font-bold text-xl text-gray-700">Groww</span>
          </div>
          <nav className="flex flex-wrap items-center space-x-4 md:space-x-6 text-gray-500 w-full md:w-auto">
            <Link href="/explore/stocks">
              <span className="hover:text-gray-900 cursor-pointer">Explore</span>
            </Link>
            <Link href="/dashboard">
              <span className="text-green-500 font-medium cursor-pointer">
                Dashboard
              </span>
            </Link>
          </nav>
        </div>

        {/* Search */}
        <div className="hidden lg:block flex-1 min-w-[220px] mx-6">
          <input
            type="text"
            placeholder="Search Groww..."
            className="w-full px-4 py-2 rounded-md border text-gray-500 border-gray-400 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Icons & Profile */}
        <div className="flex items-center space-x-3 md:space-x-4 relative shrink-0">
          <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
          <Wallet className="w-5 h-5 text-gray-700 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 text-gray-700 cursor-pointer" />

          {/* Profile */}
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border border-gray-300"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <Image
                src="/profile.png"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-md z-50">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Mahesh Kumar</h3>
                  <p className="text-sm text-gray-500">
                    maheshkumar10042005@gmail.com
                  </p>
                </div>
                <ul className="text-sm text-gray-700 divide-y">
                  <li className="p-3 hover:bg-gray-100 cursor-pointer">
                    📋 All Orders
                  </li>
                  <li className="p-3 hover:bg-gray-100 cursor-pointer">
                    🎧 24 x 7 Customer Support
                  </li>
                  <li className="p-3 hover:bg-gray-100 cursor-pointer">📄 Reports</li>
                </ul>
                <div className="p-3 flex justify-between items-center text-sm text-gray-700 border-t">
                  <span>🌞</span>
                  <button className="text-red-500 hover:underline">Log out</button>
                </div>
              </div>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-gray-700 hidden sm:block" />
        </div>
      </div>

      {/* Tab Navigation (Stocks, F&O, Mutual Funds) */}
      <div className="px-4 md:px-8">
        <nav className="flex flex-wrap gap-6 text-md font-medium pt-3">
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`pb-2 ${
                pathname === tab.href
                  ? "text-green-600 border-b-2 border-green-500"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
