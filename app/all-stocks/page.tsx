"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Checkbox,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

interface Stock {
  _id: string;
  company: string;
  marketPrice: string;
  change: string;
  closePrice: string;
  marketCap: string;
  sector: string;
  image?: string;
}

interface Sector {
  name: string;
  subSectors: string[];
}

// Updated sectors data (fetched from API)
const sectors: Sector[] = [
  { name: "Agricultural", subSectors: [] },
  { name: "Apparel & Accessories", subSectors: [] },
  { name: "Automobile & Ancillaries", subSectors: [] },
  { name: "Banking", subSectors: [] },
  { name: "Consumer Durables", subSectors: [] },
  { name: "Consumer Goods", subSectors: [] },
  { name: "Derived Materials", subSectors: [] },
  { name: "Energy", subSectors: [] },
  { name: "Financial", subSectors: [] },
  { name: "Healthcare", subSectors: [] },
  { name: "Hospitality & Travel", subSectors: [] },
  { name: "Industrial Products", subSectors: [] },
  { name: "Industries", subSectors: [] },
  { name: "IT Industry", subSectors: [] },
  { name: "Logistics & Freight", subSectors: [] },
  { name: "Media & Entertainment", subSectors: [] },
  { name: "Others", subSectors: [] },
  { name: "Raw Material", subSectors: [] },
  { name: "Tele-Communication", subSectors: [] },
  { name: "Textile Industry", subSectors: [] },
];

const indices = [
  "NIFTY BANK",
  "NIFTY Next 50",
  "NIFTY Midcap 100",
  "SENSEX",
  "NIFTY 50",
  "NIFTY 100",
  "BSE 100",
];

const parseMarketCap = (marketCap: string): number => {
  return parseFloat(marketCap.replace(/₹|,/g, "")) || 0;
};

const parseClosePrice = (closePrice: string): number => {
  return parseFloat(closePrice.replace(/₹|,/g, "")) || 0;
};

const StocksDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSectorFromQuery = searchParams.get("sector");

  const validSector = sectors.find(
    (sector) => sector.name === selectedSectorFromQuery
  )
    ? selectedSectorFromQuery
    : null;

  const [marketCap, setMarketCap] = useState<number[]>([0, 3000000]);
  const [closePrice, setClosePrice] = useState<number[]>([0, 30000]);
  const [page, setPage] = useState(1);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    validSector ? [validSector] : []
  );
  const [selectedIndices, setSelectedIndices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const stocksPerPage = 10;
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);
  const currentStocks = filteredStocks.slice(
    (page - 1) * stocksPerPage,
    page * stocksPerPage
  );

  // Fetch stocks based on selected sector
  useEffect(() => {
    const fetchStocks = async () => {
      if (!validSector) {
        setStocks([]);
        setFilteredStocks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/topstocks/stocks/${encodeURIComponent(
            validSector
          )}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData: Stock[] = data.map((item: any) => ({
          _id: item._id,
          company: item.name,
          marketPrice: item.price,
          change: item.change,
          closePrice: item.closePrice || item.price,
          marketCap: item.marketCap || "₹0",
          sector: validSector,
        }));
        setStocks(formattedData);
        setFilteredStocks(formattedData);
      } catch (error) {
        console.error(
          `Error fetching stocks for sector ${validSector}:`,
          error
        );
        setError(
          `Failed to load stocks for ${validSector}. Please try again later.`
        );
        setStocks([]);
        setFilteredStocks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [validSector]);

  // Filter stocks based on selectedSectors, selectedIndices, marketCap, and closePrice
  useEffect(() => {
    let filtered = stocks;

    // Apply selectedSectors filter (from checkboxes)
    if (selectedSectors.length > 0 && !validSector) {
      filtered = filtered.filter((stock) =>
        selectedSectors.includes(stock.sector)
      );
    }

    // Apply selectedIndices filter
    if (selectedIndices.length > 0) {
      filtered = filtered.filter((stock) => stock.sector === "Financial");
    }

    // Apply marketCap filter
    filtered = filtered.filter((stock) => {
      const marketCapValue = parseMarketCap(stock.marketCap);
      return marketCapValue >= marketCap[0] && marketCapValue <= marketCap[1];
    });

    // Apply closePrice filter
    filtered = filtered.filter((stock) => {
      const closePriceValue = parseClosePrice(stock.closePrice);
      return (
        closePriceValue >= closePrice[0] && closePriceValue <= closePrice[1]
      );
    });

    setFilteredStocks(filtered);
    setPage(1);
  }, [
    stocks,
    selectedSectors,
    selectedIndices,
    marketCap,
    closePrice,
    validSector,
  ]);

  const handleMarketCapChange = (event: Event, newValue: number | number[]) => {
    setMarketCap(newValue as number[]);
  };

  const handleClosePriceChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setClosePrice(newValue as number[]);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSectorCheckboxChange = (sectorName: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sectorName)
        ? prev.filter((s) => s !== sectorName)
        : [...prev, sectorName]
    );
  };

  const handleIndexCheckboxChange = (indexName: string) => {
    setSelectedIndices((prev) =>
      prev.includes(indexName)
        ? prev.filter((i) => i !== indexName)
        : [...prev, indexName]
    );
  };

  const handleClearAll = () => {
    setSelectedSectors([]);
    setSelectedIndices([]);
    setMarketCap([0, 3000000]);
    setClosePrice([0, 30000]);
    setPage(1);
    router.push("/all-stocks");
  };

  return (
    <Box className="flex h-screen font-sans bg-white">
      {/* Left Sidebar (Filters) */}
      <Box className="w-[400px] p-5 bg-white border-r border-gray-500 overflow-y-auto overflow-x-hidden">
        <Box className="flex justify-between items-center mb-5">
          <Typography
            variant="h6"
            sx={{ fontSize: "1.125rem", fontWeight: 600, color: "black" }}
          >
            FILTERS
          </Typography>
          <Button
            variant="text"
            sx={{
              textTransform: "uppercase",
              fontSize: "0.75rem",
              color: "black",
            }}
            onClick={handleClearAll}
          >
            CLEAR ALL
          </Button>
        </Box>

        {/* Sectors Section */}
        <Box className="mb-5">
          <Typography
            sx={{ fontSize: "1rem", marginBottom: "0.5rem", color: "black" }}
          >
            Sectors
          </Typography>
          <Box className="max-h-[200px] overflow-y-auto overflow-x-hidden">
            {sectors.map((sector, index) => (
              <Box
                key={index}
                className="flex items-center justify-between py-1 min-w-0"
              >
                <Box className="flex items-center min-w-0">
                  <Checkbox
                    checked={selectedSectors.includes(sector.name)}
                    onChange={() => handleSectorCheckboxChange(sector.name)}
                    size="small"
                    sx={{
                      color: "#00c4b4",
                      "&.Mui-checked": { color: "#00c4b4" },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "black",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {sector.name}
                  </Typography>
                </Box>
                <AddIcon
                  sx={{ color: "black", cursor: "pointer", fontSize: "small" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Index Section */}
        <Box className="mb-5">
          <Typography
            sx={{ fontSize: "1rem", marginBottom: "0.5rem", color: "black" }}
          >
            Index
          </Typography>
          <Box className="max-h-[200px] overflow-y-auto overflow-x-hidden">
            {indices.map((indexName, idx) => (
              <Box
                key={idx}
                className="flex items-center justify-between py-1 min-w-0"
              >
                <Box className="flex items-center min-w-0">
                  <Checkbox
                    checked={selectedIndices.includes(indexName)}
                    onChange={() => handleIndexCheckboxChange(indexName)}
                    size="small"
                    sx={{
                      color: "#00c4b4",
                      "&.Mui-checked": { color: "#00c4b4" },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.875rem",
                      color: "black",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {indexName}
                  </Typography>
                </Box>
                <AddIcon
                  sx={{ color: "black", cursor: "pointer", fontSize: "small" }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Market Cap Slider */}
        <Box className="my-5">
          <Typography
            sx={{ fontSize: "1rem", marginBottom: "0.5rem", color: "black" }}
          >
            Market Cap (Cr)
          </Typography>
          <Slider
            value={marketCap}
            onChange={handleMarketCapChange}
            valueLabelDisplay="auto"
            min={0}
            max={3000000}
            sx={{
              color: "#00c4b4",
              "& .MuiSlider-valueLabel": {
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
              },
            }}
          />
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              0
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              30,00,000
            </Typography>
          </Box>
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Small
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Mid
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Large
            </Typography>
          </Box>
        </Box>

        {/* Close Price Slider */}
        <Box className="my-5">
          <Typography
            sx={{ fontSize: "1rem", marginBottom: "0.5rem", color: "black" }}
          >
            Close Price
          </Typography>
          <Slider
            value={closePrice}
            onChange={handleClosePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={30000}
            sx={{
              color: "#00c4b4",
              "& .MuiSlider-valueLabel": {
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
              },
            }}
          />
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              0
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              50,00,000
            </Typography>
          </Box>
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Small
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Mid
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "black" }}>
              Large
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Section (Stocks Table) */}
      <Box className="flex-1 p-5 overflow-y-auto bg-white">
        <Box className="flex justify-between items-center mb-5">
          <Typography variant="h5" className="text-2xl font-bold text-black">
            All Stocks {validSector ? `- ${validSector}` : ""}
          </Typography>
          <Typography variant="body2" className="text-sm text-black">
            Search results {filteredStocks.length} Stocks
          </Typography>
        </Box>

        {loading ? (
          <Typography className="text-center">Loading stocks...</Typography>
        ) : error ? (
          <Typography className="text-center text-red-500">{error}</Typography>
        ) : filteredStocks.length === 0 ? (
          <Typography className="text-center">
            No stocks available for this sector.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell className="font-bold text-black">
                    COMPANY
                  </TableCell>
                  <TableCell className="font-bold text-black">
                    MARKET PRICE
                  </TableCell>
                  <TableCell className="font-bold text-black">
                    CLOSE PRICE
                  </TableCell>
                  <TableCell className="font-bold text-black">
                    MARKET CAP (Cr)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentStocks.map((stock, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-black">
                      <Box className="flex items-center gap-2">
                        <Link
                          href={{
                            pathname: `/buystock/${encodeURIComponent(
                              stock.company
                            )}`,
                            query: {
                              state: JSON.stringify({
                                stockId: stock._id,
                                name: stock.company,
                                price: stock.marketPrice,
                                change: stock.change,
                                image:
                                  stock.image ||
                                  "https://via.placeholder.com/24",
                                source: "stocksByCategory",
                                category: stock.sector, // Preserve original case, e.g., "Banking"
                              }),
                            },
                          }}
                          className="text-black hover:underline"
                        >
                          {stock.company}
                        </Link>
                        <Box className="w-[50px] h-5 flex items-center justify-center text-xs">
                          📈
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className="text-black">
                      <Box className="flex items-center gap-2">
                        <Typography className="text-black">
                          {stock.marketPrice}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="text-red-500 text-xs"
                        >
                          {stock.change}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="text-sm text-black">
                      {stock.closePrice}
                    </TableCell>
                    <TableCell className="text-sm text-black">
                      {stock.marketCap}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {totalPages > 1 && (
          <Box className="flex justify-center mt-5">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default StocksDashboard;
