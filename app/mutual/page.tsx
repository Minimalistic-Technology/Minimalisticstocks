"use client";

import Header from "../components/header/page";
import Footer from "../components/Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MutualPage() {
  interface GrowwFund {
    _id: string;
    name: string;
    badge?: string;
    return?: string;
    date?: string;
    age?: string;
    tag?: string;
  }

  interface Collection {
    name: string;
    icon: string;
  }

  interface PopularFund {
    _id: string;
    name: string;
    img: string;
    return: string;
  }

  const [growwFunds, setGrowwFunds] = useState<GrowwFund[]>([]);
  const [loadingGrowwFunds, setLoadingGrowwFunds] = useState<boolean>(true);
  const [errorGrowwFunds, setErrorGrowwFunds] = useState<string | null>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loadingCollections, setLoadingCollections] = useState<boolean>(true); // Added
  const [errorCollections, setErrorCollections] = useState<string | null>(null); // Added
  const [popularFunds, setPopularFunds] = useState<PopularFund[]>([]);
  const [loadingPopularFunds, setLoadingPopularFunds] = useState<boolean>(true);
  const [errorPopularFunds, setErrorPopularFunds] = useState<string | null>(null);
  const router = useRouter();

  // Default image for Groww Funds and fallback
  const defaultImage = "https://assets-netstorage.groww.in/mf-assets/logos/indiabulls_groww.png";

  // Utility function to validate image URLs
  const validateImageUrl = (url: string | undefined): string => {
    if (!url) {
      console.warn("Image URL is undefined or empty, using default image");
      return defaultImage;
    }
    const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|svg|webp))$/i;
    if (imageRegex.test(url)) {
      return url;
    }
    console.warn(`Invalid image URL: ${url}, using default image`);
    return defaultImage;
  };

  // Utility function to format change
  const formatChange = (change: string | undefined): string => {
    if (!change) return "+0.00 (+0.00%)";
    const changeRegex = /^[+-]?\d+\.\d+\s*\([-+]?\d+\.\d+%\)$/;
    if (changeRegex.test(change)) return change;
    return `${change} (+0.00%)`;
  };

  // Fetch Funds by Groww data
  useEffect(() => {
    const fetchGrowwfunds = async () => {
      try {
        setLoadingGrowwFunds(true);
        setErrorGrowwFunds(null);
        const response = await fetch("http://localhost:5000/api/topstocks/growfund/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data: GrowwFund[] = await response.json();

        // Deduplicate by _id
        const uniqueFundsMap = new Map<string, GrowwFund>();
        data.forEach((item) => {
          if (item._id && item.name) {
            uniqueFundsMap.set(item._id, item);
          }
        });
        const uniqueFunds = Array.from(uniqueFundsMap.values());

        setGrowwFunds(uniqueFunds);
      } catch (error: any) {
        console.error("Error fetching Funds by Groww:", error.message);
        setErrorGrowwFunds("Failed to load funds by Groww. Please try again later.");
      } finally {
        setLoadingGrowwFunds(false);
      }
    };

    fetchGrowwfunds();
  }, []);

  // Fetch Collections data
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoadingCollections(true);
        setErrorCollections(null);
        const response = await fetch("http://localhost:5000/api/collections/get");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          name: item.name || "Unknown",
          icon: validateImageUrl(item.icon || item.image || item.img), // Check multiple fields
        }));
        console.log("Collections data:", formattedData); // Debug log
        setCollections(formattedData);
      } catch (error) {
        console.error("Error fetching Collections:", error);
        setErrorCollections("Failed to load collections. Please try again later.");
        setCollections([]);
      } finally {
        setLoadingCollections(false);
      }
    };

    fetchCollections();
  }, []);

  // Fetch Popular Funds data
  useEffect(() => {
    const fetchPopularFunds = async () => {
      try {
        setLoadingPopularFunds(true);
        setErrorPopularFunds(null);
        const response = await fetch("http://localhost:5000/api/topstocks/popularfunds/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data: PopularFund[] = await response.json();

        // Deduplicate by _id
        const uniqueFundsMap = new Map<string, PopularFund>();
        data.forEach((item) => {
          if (item._id && item.name) {
            uniqueFundsMap.set(item._id, {
              ...item,
              img: validateImageUrl(item.img), // Use 'img' as defined in PopularFund
            });
          }
        });
        const uniqueFunds = Array.from(uniqueFundsMap.values());
        console.log("Popular Funds data:", uniqueFunds); // Debug log
        setPopularFunds(uniqueFunds);
      } catch (error: any) {
        console.error("Error fetching Popular Funds:", error.message);
        setErrorPopularFunds("Failed to load popular funds. Please try again later.");
      } finally {
        setLoadingPopularFunds(false);
      }
    };

    fetchPopularFunds();
  }, []);

  // Handle click on a popular fund
  const handlePopularFundClick = (fund: PopularFund) => {
    const state = {
      stockId: fund._id,
      name: fund.name,
      price: "₹0",
      change: formatChange(fund.return),
      image: fund.img,
      source: "popularfunds",
      category: "",
    };
    router.push(`/buystock/${encodeURIComponent(fund.name)}?state=${encodeURIComponent(JSON.stringify(state))}`);
  };

  // Handle click on a Groww fund
  const handleGrowwFundClick = (fund: GrowwFund) => {
    const state = {
      stockId: fund._id,
      name: fund.name,
      price: "₹0",
      change: formatChange(fund.return),
      image: defaultImage, // GrowwFund has no img field
      source: "growfund",
      category: "",
    };
    router.push(`/buystock/${encodeURIComponent(fund.name)}?state=${encodeURIComponent(JSON.stringify(state))}`);
  };

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
            {loadingPopularFunds ? (
              <p>Loading Popular Funds...</p>
            ) : errorPopularFunds ? (
              <p className="text-red-500">{errorPopularFunds}</p>
            ) : popularFunds.length > 0 ? (
              popularFunds.map((fund) => (
                <div
                  key={fund._id}
                  onClick={() => handlePopularFundClick(fund)}
                  className="rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition cursor-pointer"
                >
                  <Image
                    src={fund.img}
                    alt={fund.name}
                    width={32}
                    height={32}
                    className="mb-2"
                    onError={() => console.error(`Failed to load image for ${fund.name}: ${fund.img}`)}
                  />
                  <h3 className="font-medium text-gray-800">{fund.name}</h3>
                  <p className="mt-2 text-lg font-semibold">
                    {fund.return}{" "}
                    <span className="text-gray-500 text-sm">(3Y)</span>
                  </p>
                </div>
              ))
            ) : (
              <p>No popular funds available.</p>
            )}
          </div>
        </section>

        {/* Collections */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Collections</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {loadingCollections ? (
              <p>Loading Collections...</p>
            ) : errorCollections ? (
              <p className="text-red-500">{errorCollections}</p>
            ) : collections.length > 0 ? (
              collections.map((item) => (
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
                      onError={() => console.error(`Failed to load image for ${item.name}: ${item.icon}`)}
                    />
                  </div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
              ))
            ) : (
              <p>No collections available.</p>
            )}
          </div>
        </section>

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
            {loadingGrowwFunds ? (
              <p>Loading Funds by Groww...</p>
            ) : errorGrowwFunds ? (
              <p className="text-red-500">{errorGrowwFunds}</p>
            ) : growwFunds.length > 0 ? (
              growwFunds.map((fund) => (
                <div
                  key={fund._id}
                  onClick={() => handleGrowwFundClick(fund)}
                  className="relative rounded-lg border border-gray-200 shadow-sm hover:shadow-md p-4 bg-white transition cursor-pointer"
                >
                  <Image
                    src={defaultImage}
                    alt={fund.name}
                    width={32}
                    height={32}
                    className="mb-2"
                    onError={() => console.error(`Failed to load image for ${fund.name}: ${defaultImage}`)}
                  />
                  <h3 className="font-medium text-gray-800">{fund.name}</h3>
                  {fund.badge && (
                    <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 border font-semibold text-xs px-2 py-0.5 rounded">
                      {fund.tag}
                    </div>
                  )}
                  {fund.return && (
                    <p className="mt-2 text-sm font-semibold text-gray-700">
                      {fund.return} <span className="text-gray-500 text-sm">3Y</span>
                    </p>
                  )}
                  {fund.date && (
                    <p className="mt-2 text-sm text-gray-600">
                      {fund.date} <span className="text-gray-400">Ends in 8 days</span>
                    </p>
                  )}
                  {fund.age && (
                    <p className="mt-2 text-sm text-gray-500">{fund.age}</p>
                  )}
                </div>
              ))
            ) : (
              <p>No Funds by Groww available.</p>
            )}
          </div>
        </section>

        {/* Quick Access */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="relative flex flex-col items-center justify-between p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 rounded-t-lg"></div>
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/nfo.svg"
                alt="New Fund Offerings"
                width={32}
                height={32}
                className="mb-4"
                onError={() => console.error("Failed to load image for New Fund Offerings")}
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                New Fund Offerings
              </span>
            </div>

            {/* Card 2 */}
            <div className="relative flex flex-col items-center justify-between p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-green-500 rounded-t-lg"></div>
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/import_funds.svg"
                alt="Import Funds"
                width={32}
                height={32}
                className="mb-4"
                onError={() => console.error("Failed to load image for Import Funds")}
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                Import Funds
              </span>
            </div>

            {/* Card 3 */}
            <div className="relative flex flex-col items-center justify-between p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-yellow-500 rounded-t-lg"></div>
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/compare_funds.svg"
                alt="Compare Funds"
                width={32}
                height={32}
                className="mb-4"
                onError={() => console.error("Failed to load image for Compare Funds")}
              />
              <span className="text-sm font-medium text-gray-700 text-center">
                Compare Funds
              </span>
            </div>

            {/* Card 4 */}
            <div className="relative flex flex-col items-center justify-between p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
              <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500 rounded-t-lg"></div>
              <Image
                src="https://storage.googleapis.com/groww-assets/mf-assets/web/quick_access/light/calculator.svg"
                alt="SIP Calculator"
                width={32}
                height={32}
                className="mb-4"
                onError={() => console.error("Failed to load image for SIP Calculator")}
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