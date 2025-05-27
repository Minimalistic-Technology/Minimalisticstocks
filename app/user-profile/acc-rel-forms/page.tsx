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
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-8 min-h-[300px] flex items-center justify-center">
            <div className="grid grid-cols-1 gap-6 w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/emptyState.b0f4e12f.svg"
                  alt="Empty State Illustration"
                  className="w-130 h-48 mb-4"
                />
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  No account related forms found
                </h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}