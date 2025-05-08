'use client';

import Header from '../components/header/page';
import Footer from 'app/components/Footer';
import Image from 'next/image';

const collections = [
    { name: 'High return', icon: '/images/highreturn.png' },
    { name: 'SIP', icon: '/images/sip.png' },
    { name: 'Tax Saving', icon: '/images/tax.png' },
    { name: 'Large Cap', icon: '/images/largecap.png' },
    { name: 'Mid Cap', icon: '/images/midcap.png' },
    { name: 'Small Cap', icon: '/images/smallcap.png' },
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
            <a href="#" className="text-green-600 text-sm font-medium hover:underline">All Mutual Funds</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: 'HDFC',
                img: '/images/hdfc.png',
                return: '25.4%',
              },
              {
                name: 'Nippon',
                img: '/images/nippon.png',
                return: '22.5%',
              },
              {
                name: 'Groww ',
                img: '/images/groww.png',
                return: '18.5%',
              },
              {
                name: 'SBI',
                img: '/images/sbi.png',
                return: '22.3%',
              },
            ].map((fund, i) => (
              <div key={i} className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition">
                <Image src={fund.img} alt={fund.name} width={32} height={32} className="mb-2" />
                <h3 className="font-medium text-gray-800">{fund.name}</h3>
                <p className="mt-2 text-lg font-semibold">{fund.return} <span className="text-gray-500 text-sm">(3Y)</span></p>
              </div>
            ))}
          </div>
        </section>

                {/* Collections */}
                <div>
          <h2 className="text-2xl font-bold mb-6">Collections</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {collections.map((item) => (
              <div key={item.name} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-2">
                  <Image src={item.icon} alt={item.name} width={64} height={64} />
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
            <a href="#" className="text-green-600 text-sm font-medium hover:underline">View all</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                name: 'Groww Silver',
                date: '16 May',
                tag: 'NFO',
                badge: true,
              },
              {
                name: 'Groww Value',
                return: '18.54%',
              },
              {
                name: 'Groww Large',
                return: '16.21%',
              },
              {
                name: 'Groww Gold',
                age: '6M Old',
              },
            ].map((fund, i) => (
              <div key={i} className="relative rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition">
                <Image src="/images/groww.png" alt="Groww Logo" width={32} height={32} className="mb-2" />
                <h3 className="font-medium text-gray-800">{fund.name}</h3>
                {fund.badge && (
                  <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-0.5 rounded">
                    {fund.tag}
                  </div>
                )}
                {fund.return && (
                  <p className="mt-2 text-sm font-semibold text-gray-700">{fund.return} <span className="text-gray-500">3Y</span></p>
                )}
                {fund.date && (
                  <p className="mt-2 text-sm text-gray-600">{fund.date} <span className="text-gray-400">Ends in 8 days</span></p>
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
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              </div>
              <Image src="/images/gavel.png" alt="New Fund" width={32} height={32} className="mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">New Fund Offerings</span>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image src="/images/import.png" alt="Import funds" width={32} height={32} className="mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">Import funds</span>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image src="/images/compare.png" alt="Compare funds" width={32} height={32} className="mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">Compare funds</span>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col items-center p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <Image src="/images/calculator.png" alt="SIP Calculator" width={32} height={32} className="mb-2" />
              <span className="text-sm font-medium text-gray-700 text-center">SIP Calculator</span>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
