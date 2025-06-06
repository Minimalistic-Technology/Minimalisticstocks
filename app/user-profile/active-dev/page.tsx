"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Header from "../../components/header/page";
import menuItems from "../menuItems";

export default function ChangePasswordPage() {
  const pathname = usePathname();

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
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-82 bg-white shadow-md ml-18 mt-18 border-2 border-[#E9E9EB] rounded-lg">
          <div className="p-6 border-b flex flex-col items-center">
            <div className="w-25 h-25 rounded-full bg-orange-600 flex items-center justify-center text-white text-5xl font-bold">
              M
            </div>
            <h2 className="mt-2 text-lg font-semibold text-gray-800">
              Manikanta Mettu
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
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Active devices
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              You’re currently logged-in on these devices. Multiple active
              sessions on the same device indicates you’ve opened Groww on more
              than one browser.
            </p>

            {/* Current Device */}
            <div className="mb-6">
              <h3 className="text-gray-600 font-medium mb-2">Current device</h3>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/platformDesktop.ae411d1b.svg"
                      alt="Laptop"
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Chrome, Windows
                    </p>
                    <p className="text-xs text-green-600">Active Now</p>
                  </div>
                </div>
                <button className="text-green-600 text-sm font-medium">
                  Logout
                </button>
              </div>
            </div>

            {/* Other Device */}
            <div>
              <h3 className="text-gray-600 font-medium mb-2">Active devices</h3>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <img
                      src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/platformMobile.125a091e.svg"
                      alt="Mobile"
                      className="w-5 h-5 font-bold"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      POCO X6 5G
                    </p>
                    <p className="text-xs text-gray-500">
                      Logged on 19 May, 05:24 PM
                    </p>
                  </div>
                </div>
                <button className="text-green-600 text-sm font-medium">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
