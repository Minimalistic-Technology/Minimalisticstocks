'use client';

import Header from '../components/header/page';
import Image from 'next/image';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="relative w-[450px] h-[350px]">
            <Image
              src="/images/stocks-cluster.png" // Use your renamed image here
              alt="Stocks Logos"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-sm font-semibold mb-1 text-gray-600">Introducing</p>
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Stocks</h1>
          <p className="mb-6 text-lg text-gray-600">
            Investing in stocks will never be the same again
          </p>
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
            TRY IT OUT
          </button>
        </div>
      </section>
    </main>
  );
}
