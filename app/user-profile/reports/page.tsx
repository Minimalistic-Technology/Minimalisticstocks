"use client"; // Required for client-side rendering

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname to detect current route
import { ChevronRight, Eye } from "lucide-react";
import Header from "../../components/header/page"; // Unchanged import

export default function ChangePasswordPage() {
  const pathname = usePathname(); // Get the current route

  // Define the menu items directly based on the image
  const menuStructure = [
    {
      label: "Profit & Loss",
      subItems: [
        { label: "Stocks P&L", href: "/profit-and-loss/stocks-pnl" },
        { label: "Dividend report", href: "/profit-and-loss/dividend-report" },
      ],
    },
    {
      label: "Tax",
      subItems: [
        { label: "Mutual Funds - ELSS statement", href: "/tax/mutual-funds-elss" },
        { label: "Mutual Funds - Capital gains", href: "/tax/mutual-funds-capital-gains" },
        { label: "Stocks - Capital gains", href: "/tax/stocks-capital-gains" },
        { label: "F&O - Tax report", href: "/tax/fno-tax-report" },
        { label: "GST invoice", href: "/tax/gst-invoice" },
      ],
    },
    {
      label: "Holdings",
      subItems: [
        { label: "Mutual Funds - Holding statement", href: "/holdings/mutual-funds-holding" },
        { label: "Stocks - Holding statement", href: "/holdings/stocks-holding" },
        { label: "Demat report", href: "/holdings/demat-report" },
      ],
    },
    {
      label: "Transactions",
      subItems: [
        { label: "Mutual Funds - Order history", href: "/transactions/mutual-funds-order-history" },
        { label: "Stocks - Order history", href: "/transactions/stocks-order-history" },
        { label: "Groww Balance statement", href: "/transactions/groww-balance-statement" },
        { label: "Contract note", href: "/transactions/contract-note" },
      ],
    },
  ];

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
              Manikanta Mettu
            </h2>
          </div>
          <nav className="mt-2">
            {menuStructure.map((section, sectionIndex) => (
              <div key={section.label}>
                {/* Section Header */}
                <div className="flex items-center justify-between p-4 text-gray-800 font-semibold">
                  <span>{section.label}</span>
                </div>
                {/* Sub-items */}
                {section.subItems.map((item, itemIndex) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between p-4 pl-8 text-gray-700 w-full text-left hover:bg-gray-100 ${
                      sectionIndex < menuStructure.length - 1 || itemIndex < section.subItems.length - 1 ? "" : "border-b"
                    } ${pathname === item.href ? "bg-gray-100" : ""}`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="mt-18 ml-10 w-1/2">
          <div className="bg-white border-2 border-[#E9E9EB] rounded-lg shadow-md p-8 min-h-[300px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/pnlLight.b55278a9.svg"
                  alt="Profit & Loss Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Profit & Loss
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View your overall profit and loss statement.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div>
              <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/pnlLight.b55278a9.svg"
                  alt="Stocks P&L Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Stocks P&L
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View your profit and loss for stocks.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div>
              {/* <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/pnlLight.b55278a9.svg"
                  alt="Dividend Report Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Dividend Report
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View your dividend earnings report.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div> */}
              {/* <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/taxLight.f437979e.svg"
                  alt="Tax Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Tax
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Download tax statements for filing returns.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div> */}
              <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/holdingsLight.3cde57f4.svg"
                  alt="Holdings Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Holdings
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View details of your portfolio holdings.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div>
              <div className="flex items-center p-4 border border-[#E9E9EB] rounded-lg">
                <img
                  src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/transactionLight.4bc89403.svg"
                  alt="Transactions Icon"
                  className="w-12 h-12 mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800">
                    Transactions
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    View your transaction history details.
                  </p>
                </div>
                <a
                  href="#"
                  className="text-teal-500 font-semibold text-sm hover:underline"
                >
                  View
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}