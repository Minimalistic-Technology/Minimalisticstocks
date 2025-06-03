"use client"; // Required for client-side rendering

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to detect current route
import { ChevronRight, Eye, HelpCircle, X } from "lucide-react"; // Added HelpCircle and X icons
import Header from "../../components/header/page"; // Unchanged import
import menuItems from "../menuItems"; // Unchanged import
import { useState } from "react"; // Import useState for modal visibility

export default function ChangePasswordPage() {
  const pathname = usePathname(); // Get the current route
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Function to open the modal
interface OpenModalEvent extends React.MouseEvent<HTMLInputElement> {}

const openModal = (e: OpenModalEvent): void => {
    e.preventDefault(); // Prevent the checkbox from being checked
    setIsModalOpen(true);
};

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

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
                <h2 className="text-2xl font-bold text-gray-800 mb-5">
                  These segments are enabled for your account
                </h2>
                <div className="flex flex-col space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0"
                      onClick={openModal} // Open modal on click, prevent checking
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      NSE equity
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0"
                      onClick={openModal} // Open modal on click, prevent checking
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      BSE equity
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0"
                      onClick={openModal} // Open modal on click, prevent checking
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Mutual funds
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-0"
                      onClick={openModal} // Open modal on click, prevent checking
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Futures and Options
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Enabling or disabling a segment
              </h2>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              If you wish to update the segments you want to trade in, please write to us at{" "}
              <a href="mailto:support@groww.in" className="text-blue-500 hover:underline">
                support@groww.in
              </a>{" "}
              and our support will help you out.
            </p>
            <a
              href="#"
              className="flex items-center text-teal-500 font-semibold text-sm hover:underline"
            >
              <HelpCircle className="w-4 h-4 mr-1" />
              Help and FAQs
            </a>
          </div>
        </div>
      )}
    </div>
  );
}