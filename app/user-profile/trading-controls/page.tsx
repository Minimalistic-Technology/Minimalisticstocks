"use client"; // Required for client-side rendering

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, X } from "lucide-react";
import Header from "../../components/header/page";
import menuItems from "../menuItems";

export default function TradingControlsPage() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="flex flex-col min-h-screen bg-white"
      style={{
        backgroundImage:
          "url(https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/basicDetailsBg.5f4e9d68.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header */}
      <Header />

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
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
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-4 text-gray-700 hover:bg-gray-100 ${
                  index < menuItems.length - 1 ? "" : "border-b"
                } ${pathname === item.href ? "bg-gray-100" : ""}`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="mt-20 ml-10 w-1/2">
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-[#2e2e35] mb-4">
              Trading Controls
            </h2>
            <hr className="border-dashed border-t border-gray-300 mb-4" />

            {/* Button that triggers modal */}
            <button
              onClick={() => setShowModal(true)}
              className="w-full text-left flex items-center justify-between p-4 bg-white rounded-md hover:bg-gray-50 transition border border-transparent hover:border-gray-200"
            >
              <div>
                <p className="text-lg font-semibold text-[#2e2e35]">
                  F&O Pause
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Reduce overtrading by pausing F&O
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 w-[450px] relative text-center shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sun Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-[#fff8e4] rounded-full p-6">
                <div className="bg-[#fdd866] rounded-full w-16 h-16 flex items-center justify-center">
                  <div className="w-10 h-10 bg-[#fdd866] rounded-full relative">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-3 bg-[#fdd866] absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: `translate(-50%, -50%) rotate(${
                            i * 45
                          }deg) translateY(-24px)`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <h3 className="text-xl font-semibold text-[#2e2e35] mb-2">
              F&O trading is active
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Only F&O is restricted with Pause. You can continue to invest in
              stocks and mutual funds.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-green-500 w-full py-3 rounded-lg text-white font-medium hover:bg-green-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
