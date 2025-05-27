import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Header from "../components/header/page";
import menuItems from "./menuItems"; // Import the shared menuItems

export default function UserProfile() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <aside className="w-82 bg-white shadow-md ml-18 mt-18 border-2 border-[#E9E9EB]">
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
              className={`flex items-center justify-between p-4 text-gray-700 ${
                index < menuItems.length - 1 ? "" : "border-b"
              } ${
                item.label === "Basic Details"
                  ? "hover:bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
}