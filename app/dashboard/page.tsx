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
          <div className="relative w-[450px] h-[350px]">
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
      
     
      <Footer/>
    </main>
  );
}

// <div className="max-w-6xl mx-auto px-4 py-10 flex flex-row gap-8">
//               <div className="w-3/5 space-y-12">
//                 {/* Indices */}
//                 <section>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">Indices</h2>
//                     <a
//                       href="#"
//                       className="text-green-600 text-sm font-medium hover:underline"
//                     >
//                       All Indices
//                     </a>
//                   </div>
//                   <div className="overflow-x-auto flex space-x-4 scrollbar-hide">
//                     {[
//                       {
//                         name: "Nifty",
//                         lasttraded: "23,981.55",
//                         daychange: "-294.40(1.21%)",
//                       },
//                       {
//                         name: "Nippon",
//                         lasttraded: "23,981.55",
//                         daychange: "-294.40(1.21%)",
//                       },
//                       {
//                         name: "Sensex",
//                         lasttraded: "23,981.55",
//                         daychange: "+150.25(0.65%)",
//                       },
//                       {
//                         name: "SBI",
//                         lasttraded: "23,981.55",
//                         daychange: "+89.20(0.35%)",
//                       },
//                     ].map((fund, i) => (
//                       <div
//                         key={i}
//                         className="min-w-[200px] rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition"
//                       >
//                         <p className="font-medium">{fund.name}</p>
//                         <p className="text-black text-sm">{fund.lasttraded}</p>
//                         <p
//                           className={`text-sm ${
//                             fund.daychange.startsWith("-")
//                               ? "text-red-500"
//                               : "text-green-500"
//                           }`}
//                         >
//                           {fund.daychange}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
      
//                 <section>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">Most traded on Groww</h2>
//                   </div>
//                   <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//                     {[
//                       {
//                         name: "Tata Motors 29 May Fut",
//                         price: "₹709.90",
//                         change: "+26.90 (+3.94%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos2/TataMotors_19446492084_560.png",
//                       },{
//                         name: "Tata Motors 29 May Fut",
//                         price: "₹709.90",
//                         change: "+26.90 (+3.94%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos2/LT.png",
//                       },{
//                         name: "Tata Motors 29 May Fut",
//                         price: "₹709.90",
//                         change: "+26.90 (+3.94%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos2/SBIN.png",
//                       },{
//                         name: "Tata Motors 29 May Fut",
//                         price: "₹709.90",
//                         change: "+26.90 (+3.94%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos2/RelianceInds_29114129325_476.png",
//                       },
                     
//                     ].map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative"
//                       >
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           width={24}
//                           height={24}
//                           className="absolute top-2 left-2"
//                         />
//                         <div className="mt-8 font-medium">{item.name}</div>
//                         <div className="text-xs mt-1 text-black">{item.price}</div>
//                         <div
//                           className={`text-xs mt-1 ${
//                             item.change.startsWith("-")
//                               ? "text-red-500"
//                               : "text-green-600"
//                           }`}
//                         >
//                           {item.change}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
//                 {/* Collections */}
//                         <div>
//                           <h2 className="text-2xl font-bold mb-6">Product & tools</h2>
//                           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
//                             {collectionstools.map((item) => (
//                               <div
//                                 key={item.name}
//                                 className="flex flex-col items-center text-center"
//                               >
//                                 <div className="w-16 h-16 mb-2">
//                                   <Image
//                                     src={item.icon}
//                                     alt={item.name}
//                                     width={64}
//                                     height={64}
//                                   />
//                                 </div>
//                                 <span className="text-sm font-medium">{item.name}</span>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                 {/* Top Traded */}
//                 <section>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">Top traded</h2>
//                     <a
//                       href="#"
//                       className="text-green-600 text-sm font-medium hover:underline"
//                     >
//                       See More
//                     </a>
//                   </div>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//                     {collections.map((item, i) => (
//                       <div
//                         key={i}
//                         className="p-4 border rounded-xl bg-white text-center shadow-md"
//                       >
//                         <p className="text-sm font-semibold mb-2">{item.name}</p>
//                         <div className="w-full h-20 flex items-center justify-center mb-2">
//                           <Image
//                             src={item.icon}
//                             alt={item.name}
//                             width={60}
//                             height={60}
//                           />
//                         </div>
//                         <p className="text-sm text-black mb-2">{item.lasttraded}</p>
//                         <div className="flex justify-center items-center text-sm">
//                           <p
//                             className={`${
//                               item.daychange.startsWith("-")
//                                 ? "text-red-500"
//                                 : "text-green-500"
//                             }`}
//                           >
//                             {item.daychange}
//                           </p>
//                           <div className="ml-2 p-1 rounded-full bg-white shadow text-gray-400">
//                             <FaLink size={12} />
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
      
//                 {/* F&O Stocks */}
//                 <section>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">F&O Stocks</h2>
//                     <a
//                       href="#"
//                       className="text-green-600 text-sm font-medium hover:underline"
//                     >
//                       See More
//                     </a>
//                   </div>
      
      
//                   {/* Stock Table */}
//                   <div>
//                     <div className="grid grid-cols-4 font-semibold text-gray-600 mb-2 text-sm">
//                       <span>Stocks</span>
//                       <span>Price</span>
//                       <span>1D Change</span>
//                       <span>Volume</span>
//                     </div>
//                     {stockData.map((stock, index) => (
//                       <div
//                         key={index}
//                         className="grid grid-cols-4 items-center text-sm py-2 border-b"
//                       >
//                         <div className="flex items-center space-x-2">
//                           <Image
//                             src={stock.icon}
//                             alt={stock.name}
//                             width={24}
//                             height={24}
//                           />
//                           <span>{stock.name}</span>
//                         </div>
//                         <span>₹{stock.price}</span>
//                         <span
//                           className={
//                             stock.change.startsWith("-")
//                               ? "text-red-500"
//                               : "text-green-600"
//                           }
//                         >
//                           {stock.change}
//                         </span>
//                         <span>{stock.volume}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
      
//                 {/* Top Traded Index Futures */}
//                 <section>
//                   <div className="flex items-center justify-between mb-4">
//                     <h2 className="text-2xl font-bold">Top Traded Index Futures</h2>
//                   </div>
//                   <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
//                     {[
//                       {
//                         name: "NIFTY 29 May Fut",
//                         price: "₹24,092.00",
//                         change: "-179.90 (-0.74%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTY.png",
//                       },{
//                         name: "NIFTY 29 May Fut",
//                         price: "₹24,092.00",
//                         change: "-179.90 (-0.74%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTYBANK.png",
//                       },{
//                         name: "NIFTY 29 May Fut",
//                         price: "₹24,092.00",
//                         change: "-179.90 (-0.74%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTYMIDSELECT.png",
//                       },{
//                         name: "NIFTY 29 May Fut",
//                         price: "₹24,092.00",
//                         change: "-179.90 (-0.74%)",
//                         image: "https://assets-netstorage.groww.in/stock-assets/logos/GIDXNIFTY.png",
//                       },
                      
//                     ].map((item, idx) => (
//                       <div
//                         key={idx}
//                         className="w-[150px] h-[150px] border rounded-lg p-2 bg-white shadow-sm text-[11px] relative"
//                       >
//                         <Image
//                           src={item.image}
//                           alt={item.name}
//                           width={24}
//                           height={24}
//                           className="absolute top-2 left-2"
//                         />
//                         <div className="mt-8 font-medium">{item.name}</div>
//                         <div className="text-xs mt-1 text-black">{item.price}</div>
//                         <div
//                           className={`text-xs mt-1 ${
//                             item.change.startsWith("-")
//                               ? "text-red-500"
//                               : "text-green-600"
//                           }`}
//                         >
//                           {item.change}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </section>
      
                
//               </div>
      
//               {/* Right Sidebar */}
//               <div className="max-w-sm w-full bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm max-h-40">
               
      
//                 <h2 className="text-lg font-semibold text-gray-800 mb-1">
//                   Unlock Futures & Options
//                 </h2>
//                 <p className="text-sm text-gray-500 mb-6">
//                   Start trading Futures and Options
//                 </p>
      
//                 <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-6 py-3 rounded-lg transition-all">
//                   PROCEED TO UNLOCK
//                 </button>
//               </div>
//             </div>
      
 