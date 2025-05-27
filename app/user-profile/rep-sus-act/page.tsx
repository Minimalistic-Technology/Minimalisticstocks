
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
        <aside className="w-80 bg-white shadow-md ml-20 mt-20 border-2 border-[#E9E9EB] rounded-lg">
          <div className="p-6 border-b flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-orange-600 flex items-center justify-center text-white text-4xl font-bold">
              M
            </div>
            <h2 className="mt-2 text-lg font-semibold text-[#1E1E20]">
              Manikanta Mettu
            </h2>
          </div>
          <nav className="mt-2">
            {menuItems.map((item, index) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between p-4 w-full text-left ${
                    pathname === item.href
                      ? "bg-gray-100 text-[#1E1E20]"
                      : "text-[#1E1E20] hover:bg-gray-100"
                  } ${index < menuItems.length - 1 ? "" : "border-b"}`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="mt-20 ml-10 w-3/4">
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center text-center">
              <img
                src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/errorImage.34beb745.svg"
                alt="Suspicious Activity"
                className="w-40 h-40 mb-6"
              />
              <h2 className="text-2xl font-semibold mb-2 text-[#1E1E20]">
                Found suspicious activity in your account?
              </h2>
              <p className="text-[#6B7280] mb-6">
                You can protect your account by using any of these safety measures.
              </p>

              <div className="w-full md:w-2/3 space-y-4 text-left">
                {[
                  "Logout of all devices",
                  "Change Groww Pin",
                  "Change password",
                  "Freeze Account",
                ].map((text) => (
                  <button
                    key={text}
                    className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 hover:bg-gray-100 text-[#1E1E20]"
                  >
                    <span>{text}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-md w-full md:w-2/3 text-sm text-[#6B7280]">
                <strong className="text-[#1E1E20]">Report fraud</strong>
                <p className="mt-1">
                  If you find anything suspicious, you can email us at{" "}
                  <a
                    href="mailto:cyberhelpline@groww.in"
                    className="text-blue-600 underline"
                  >
                    cyberhelpline@groww.in
                  </a>{" "}
                  or call{" "}
                  <span className="font-medium text-[#1E1E20]">
                    +91 8068294147
                  </span>.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
