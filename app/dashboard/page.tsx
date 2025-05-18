'use client';

import Header from '../components/header/page';
import Footer from 'app/components/Footer';
import Image from 'next/image';
import { FaLink } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function DashboardPage() {
  const collectionstools = [
    {
      name: "Terminal",
      icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/products_terminal_light.svg",
    },
    {
      name: "Events",
      icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/calendar_mint_light.svg",
    },
    {
      name: "Intraday",
      icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/intraday_mint_light.svg",
    },
    {
      name: "IPO",
      icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/ipo_mint_light.svg",
    },
    {
      name: "Screener",
      icon: "https://storage.googleapis.com/groww-assets/web-assets/img/stock/screener_mint_light.svg",
    }
  ];

  const collections = [
    {
      name: "Nifty 50",
      icon: "/images/highreturn.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
    {
      name: "SIP",
      icon: "/images/highreturn.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
    {
      name: "Tax Saving",
      icon: "/images/tax.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
    {
      name: "Large Cap",
      icon: "/images/highreturn.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
    {
      name: "Mid Cap",
      icon: "/images/highreturn.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
    {
      name: "Small Cap",
      icon: "/images/highreturn.png",
      lasttraded: "23,981.55",
      daychange: "-294.40(1.21%)",
    },
  ];

  const stockData = [
    {
      name: "Reliance",
      icon: "https://assets-netstorage.groww.in/stock-assets/logos2/YESBANK(1).png",
      price: "2,760.10",
      change: "+25.20(1.05%)",
      volume: "57,45,05,272",
    },
    {
      name: "TCS",
      icon: "https://assets-netstorage.groww.in/stock-assets/logos2/UnionBankI_88937846814_5493.png",
      price: "3,420.50",
      change: "-18.50(0.54%)",
      volume: "12,45,23,892",
    },
    {
      name: "Infosys",
      icon: "https://assets-netstorage.groww.in/stock-assets/logos2/BHARATFORG.png",
      price: "1,460.00",
      change: "+10.00(0.69%)",
      volume: "9,23,45,111",
    },
    {
      name: "HDFC Bank",
      icon: "https://assets-netstorage.groww.in/stock-assets/logos2/TitanCompany_20146423894_1016.png",
      price: "1,580.65",
      change: "+5.30(0.34%)",
      volume: "18,30,22,101",
    },
    {
      name: "ITC",
      icon: "https://assets-netstorage.groww.in/stock-assets/logos2/UPL_77209428989_2461.png",
      price: "415.90",
      change: "-2.75(0.66%)",
      volume: "22,45,80,300",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900 transition-colors">
      <Header />
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
          <div className="relative w-full max-w-[450px] h-[250px] sm:h-[300px] md:h-[350px]">
            <Image
              src="https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/intro.981292ef.png" 
              alt="Stocks Logos"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
          <p className="text-sm font-semibold mb-1 text-gray-600">Introducing</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">Stocks</h1>
          <p className="mb-6 text-base sm:text-lg text-gray-600">
            Investing in stocks will never be the same again
          </p>
          <button className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition">
            TRY IT OUT
          </button>
        </div>
      </section> 
      
      <Footer />
    </main>
  );
}
