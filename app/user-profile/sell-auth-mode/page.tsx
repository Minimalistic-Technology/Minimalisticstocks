"use client"; // Required for client-side rendering

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to detect current route
import { ChevronRight, Eye } from "lucide-react";
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
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-8 min-h-[300px]">
            <div className="grid grid-cols-1 gap-6">
              <div className="w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  Sell authentication mode
                </h2>
                <div className="mb-4">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        DDPI
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Allows you to sell your holdings with one-time authorisation
                      </p>
                    </div>
                    <span className="text-orange-500 font-medium text-sm">
                      Coming soon
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between items-start w-full">
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        TPIN (eDIS)
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Requires verification on CDSL to sell your holdings
                      </p>
                      <button className="text-teal-500 font-semibold mt-1">
                        CHANGE TPIN
                      </button>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center mt-2">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}