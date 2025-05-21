import Link from "next/link";
import { ChevronRight, Edit2 } from "lucide-react";
import Header from "../../components/header/page"; // Adjust the import path based on your project structure
import menuItems from "../menuItems"; // Import the shared menuItems

export default function BasicDetails() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
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
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between p-4 text-gray-700 ${
                  index < menuItems.length - 1 ? "" : "border-b"
                } ${
                  item.label === "Basic Details"
                    ? "bg-gray-100"
                    : "hover:bg-gray-100"
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="py-[30px] px-[15px] mt-10.5 ml-10 w-2/4">
          <div className="border-2 border-[#E9E9EB] rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              {/* Name */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">NAME</p>
                  <p className="text-gray-800">Mahesh Kumar</p>
                </div>
                <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>

              {/* PAN */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">PAN</p>
                  <p className="text-gray-800">-</p>
                </div>
              </div>

              {/* Date of Birth */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">DATE OF BIRTH (DD/MM/YYYY)</p>
                  <p className="text-gray-800">-</p>
                </div>
              </div>

              {/* Gender */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">GENDER</p>
                  <p className="text-gray-800">-</p>
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">MOBILE NUMBER</p>
                  <p className="text-gray-800">******83479</p>
                </div>
                <span className="text-green-500 text-sm font-medium">EDIT</span>
              </div>

              {/* Marital Status */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">MARITAL STATUS</p>
                  <p className="text-gray-800">-</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">EMAIL</p>
                  <p className="text-gray-800">mahesh******@gmail.com</p>
                </div>
                <span className="text-green-500 text-sm font-medium">EDIT</span>
              </div>

              {/* Unique Client Code */}
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div>
                  <p className="text-sm text-gray-500">UNIQUE CLIENT CODE</p>
                  <p className="text-gray-800">9150333030</p>
                </div>
                <Edit2 className="w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}