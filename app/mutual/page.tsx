"use client";

import Header from "../components/header/page";
import Footer from "app/components/Footer";
import Image from "next/image";

const collections = [
  {
    name: "High return",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/high_returns.svg",
  },
  {
    name: "SIP",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/sip_with_500.svg",
  },
  {
    name: "Tax Saving",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/tax_saving.svg",
  },
  {
    name: "Large Cap",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/large_cap.svg",
  },
  {
    name: "Mid Cap",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/mid_cap.svg",
  },
  {
    name: "Small Cap",
    icon: "https://storage.googleapis.com/groww-assets/mf-assets/web/collection/light/small_cap.svg",
  },
];

export default function MutualPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">
        {/* Popular Funds */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Popular Funds</h2>
            <a
              href="#"
              className="text-green-600 text-sm font-medium hover:underline"
            >
              All Mutual Funds
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "HDFC",
                img: "https://assets-netstorage.groww.in/mf-assets/logos/hdfc_groww.png",
                return: "25.0%",
              },
              {
                name: "Nippon India Large Cap Fund",
                img: "https://assets-netstorage.groww.in/mf-assets/logos/reliance_groww.png",
                return: "22.1%",
              },
              {
                name: "Groww Value Fund",
                img: "https://assets-netstorage.groww.in/mf-assets/logos/indiabulls_groww.png",
                return: "18.5%",
              },
              {
                name: "SBI Gold Fund",
                img: "https://assets-netstorage.groww.in/mf-assets/logos/sbi_groww.png",
                return: "22.3%",
              },
            ].map((fund, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition"
              >
                <Image
                  src={fund.img}
                  alt={fund.name}
                  width={32}
                  height={32}
                  className="mb-2"
                />
                <h3 className="font-medium text-gray-800">{fund.name}</h3>
                <p className="mt-2 text-lg font-semibold">
                  {fund.return}{" "}
                  <span className="text-gray-500 text-sm">(3Y)</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Collections */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Collections</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {collections.map((item) => (
              <div
                key={item.name}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-2">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </div>
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Funds by Groww */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Funds by Groww</h2>
            <a
              href="#"
              className="text-green-600 text-sm font-medium hover:underline"
            >
              View all
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: "Groww Silver ETF FoF Fund",
                date: "16 May",
                tag: "NFO",
                badge: true,
              },
              {
                name: "Groww Value",
                return: "18.54%",
              },
              {
                name: "Groww Large",
                return: "16.21%",
              },
              {
                name: "Groww Gold",
                age: "6M Old",
              },
            ].map((fund, i) => (
              <div
                key={i}
                className="relative rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition"
              >
                <Image
                  src="https://assets-netstorage.groww.in/mf-assets/logos/indiabulls_groww.png"
                  alt="Groww Logo"
                  width={32}
                  height={32}
                  className="mb-2"
                />
                <h3 className="font-medium text-gray-800">{fund.name}</h3>
                {fund.badge && (
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">
                    {fund.tag}
                  </div>
                )}
                {fund.return && (
                  <p className="mt-2 text-sm font-semibold text-gray-700">
                    {fund.return} <span className="text-gray-500">3Y</span>
                  </p>
                )}
                {fund.date && (
                  <p className="mt-2 text-sm text-gray-600">
                    {fund.date}{" "}
                    <span className="text-gray-400">Ends in 8 days</span>
                  </p>
                )}
                {fund.age && (
                  <p className="mt-2 text-sm text-gray-500">{fund.age}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="relative flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full"></div>
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/nfo.svg"
                alt="New Fund"
                width={32}
                height={32}
                className="mb-2"
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                New Fund Offerings
              </span>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/import_funds.svg"
                alt="Import funds"
                width={32}
                height={32}
                className="mb-2"
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                Import funds
              </span>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/compare_funds.svg"
                alt="Compare funds"
                width={32}
                height={32}
                className="mb-2"
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                Compare funds
              </span>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/calculator.svg"
                alt="SIP Calculator"
                width={32}
                height={32}
                className="mb-2"
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                SIP Calculator
              </span>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
