'use client';
import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

// Updated stock data with stocks for all sectors
const stockData = [
  { company: 'Reliance Industries', marketPrice: '₹12,420.10', change: '-70.10 (0.98%)', closePrice: '₹12,428.80', marketCap: '₹19,30,339', sector: 'Energy' },
  { company: 'ONGC', marketPrice: '₹280.50', change: '-5.00 (1.75%)', closePrice: '₹285.50', marketCap: '₹3,52,500', sector: 'Energy' },
  { company: 'HDFC BANK', marketPrice: '₹1,928.30', change: '-59.20 (0.27%)', closePrice: '₹1,935.60', marketCap: '₹14,80,723', sector: 'Financial' },
  { company: 'ICICI BANK', marketPrice: '₹1,446.40', change: '-20.00 (0.27%)', closePrice: '₹1,448.80', marketCap: '₹10,13,648', sector: 'Financial' },
  { company: 'SBI', marketPrice: '₹793.70', change: '-70.00 (0.19%)', closePrice: '₹790.50', marketCap: '₹7,05,446', sector: 'Financial' },
  { company: 'Bajaj Finance', marketPrice: '₹7,171.00', change: '-90.00 (0.19%)', closePrice: '₹7,243.50', marketCap: '₹4,74,206', sector: 'Financial' },
  { company: 'LIC', marketPrice: '₹871.25', change: '20.00 (0.14%)', closePrice: '₹860.25', marketCap: '₹5,43,886', sector: 'Financial' },
  { company: 'Kotak Mahindra Bank', marketPrice: '₹1,807.40', change: '-80.00 (0.57%)', closePrice: '₹1,810.80', marketCap: '₹4,41,701', sector: 'Financial' },
  { company: 'Axis Bank', marketPrice: '₹1,180.00', change: '-15.00 (1.26%)', closePrice: '₹1,195.00', marketCap: '₹3,65,000', sector: 'Banking' },
  { company: 'Yes Bank', marketPrice: '₹24.50', change: '-0.50 (2.00%)', closePrice: '₹25.00', marketCap: '₹70,500', sector: 'Banking' },
  { company: 'TCS', marketPrice: '₹3,489.70', change: '-80.00 (0.19%)', closePrice: '₹3,514.60', marketCap: '₹12,71,395', sector: 'IT Industry' },
  { company: 'Infosys', marketPrice: '₹1,870.10', change: '-40.00 (0.21%)', closePrice: '₹1,864.80', marketCap: '₹6,48,876', sector: 'IT Industry' },
  { company: 'HCL Technologies', marketPrice: '₹1,652.10', change: '-21.00 (0.17%)', closePrice: '₹1,648.20', marketCap: '₹4,47,279', sector: 'IT Industry' },
  { company: 'Bharti Airtel', marketPrice: '₹1,843.80', change: '-80.00 (0.19%)', closePrice: '₹1,831.70', marketCap: '₹10,98,820', sector: 'Tele-Communication' },
  { company: 'Vodafone Idea', marketPrice: '₹15.20', change: '-0.30 (1.94%)', closePrice: '₹15.50', marketCap: '₹1,05,000', sector: 'Tele-Communication' },
  { company: 'Hindustan Unilever', marketPrice: '₹2,382.00', change: '-130.00 (0.33%)', closePrice: '₹2,359.20', marketCap: '₹5,53,974', sector: 'Consumer Goods' },
  { company: 'ITC', marketPrice: '₹439.30', change: '-90.00 (0.29%)', closePrice: '₹436.30', marketCap: '₹5,46,991', sector: 'Consumer Goods' },
  { company: 'Nestlé India', marketPrice: '₹2,500.00', change: '-20.00 (0.08%)', closePrice: '₹2,520.00', marketCap: '₹2,40,000', sector: 'Consumer Goods' },
  { company: 'L&T', marketPrice: '₹3,640.00', change: '-70.00 (0.19%)', closePrice: '₹3,659.80', marketCap: '₹4,95,094', sector: 'Industries' },
  { company: 'Adani Enterprises', marketPrice: '₹3,200.00', change: '-50.00 (1.54%)', closePrice: '₹3,250.00', marketCap: '₹3,65,000', sector: 'Industries' },
  { company: 'Sun Pharmaceutical', marketPrice: '₹1,684.00', change: '-70.00 (0.41%)', closePrice: '₹1,685.60', marketCap: '₹4,03,688', sector: 'Healthcare' },
  { company: 'Dr. Reddy’s Laboratories', marketPrice: '₹6,250.00', change: '-80.00 (1.26%)', closePrice: '₹6,330.00', marketCap: '₹1,04,500', sector: 'Healthcare' },
  { company: 'Bayer CropScience', marketPrice: '₹5,200.00', change: '-50.00 (0.95%)', closePrice: '₹5,250.00', marketCap: '₹2,33,000', sector: 'Agricultural' },
  { company: 'UPL Limited', marketPrice: '₹550.00', change: '-5.00 (0.90%)', closePrice: '₹555.00', marketCap: '₹41,250', sector: 'Agricultural' },
  { company: 'Aditya Birla Fashion', marketPrice: '₹320.00', change: '-5.00 (1.54%)', closePrice: '₹325.00', marketCap: '₹32,500', sector: 'Apparel & Accessories' },
  { company: 'Page Industries', marketPrice: '₹39,500.00', change: '-500.00 (1.25%)', closePrice: '₹40,000.00', marketCap: '₹44,000', sector: 'Apparel & Accessories' },
  { company: 'Tata Motors', marketPrice: '₹950.00', change: '-15.00 (1.56%)', closePrice: '₹965.00', marketCap: '₹3,15,000', sector: 'Automobile & Ancillaries' },
  { company: 'Mahindra & Mahindra', marketPrice: '₹2,150.00', change: '-30.00 (1.38%)', closePrice: '₹2,180.00', marketCap: '₹2,67,500', sector: 'Automobile & Ancillaries' },
  { company: 'Havells India', marketPrice: '₹1,850.00', change: '-20.00 (1.07%)', closePrice: '₹1,870.00', marketCap: '₹1,16,000', sector: 'Consumer Durables' },
  { company: 'Whirlpool India', marketPrice: '₹2,050.00', change: '-25.00 (1.20%)', closePrice: '₹2,075.00', marketCap: '₹26,000', sector: 'Consumer Durables' },
  { company: 'Tata Chemicals', marketPrice: '₹1,100.00', change: '-15.00 (1.35%)', closePrice: '₹1,115.00', marketCap: '₹28,000', sector: 'Derived Materials' },
  { company: 'Pidilite Industries', marketPrice: '₹3,150.00', change: '-40.00 (1.25%)', closePrice: '₹3,190.00', marketCap: '₹1,60,000', sector: 'Derived Materials' },
  { company: 'Indian Hotels', marketPrice: '₹620.00', change: '-10.00 (1.59%)', closePrice: '₹630.00', marketCap: '₹88,500', sector: 'Hospitality & Travel' },
  { company: 'EIH Limited', marketPrice: '₹430.00', change: '-5.00 (1.15%)', closePrice: '₹435.00', marketCap: '₹27,000', sector: 'Hospitality & Travel' },
  { company: 'Cummins India', marketPrice: '₹3,750.00', change: '-50.00 (1.32%)', closePrice: '₹3,800.00', marketCap: '₹1,04,000', sector: 'Industrial Products' },
  { company: 'Bharat Forge', marketPrice: '₹1,600.00', change: '-20.00 (1.23%)', closePrice: '₹1,620.00', marketCap: '₹74,500', sector: 'Industrial Products' },
  { company: 'Adani Ports', marketPrice: '₹1,400.00', change: '-25.00 (1.76%)', closePrice: '₹1,425.00', marketCap: '₹3,00,000', sector: 'Logistics & Freight' },
  { company: 'DHL India', marketPrice: '₹850.00', change: '-10.00 (1.16%)', closePrice: '₹860.00', marketCap: '₹85,000', sector: 'Logistics & Freight' },
  { company: 'Zee Entertainment', marketPrice: '₹150.00', change: '-2.00 (1.32%)', closePrice: '₹152.00', marketCap: '₹14,400', sector: 'Media & Entertainment' },
  { company: 'PVR Inox', marketPrice: '₹1,450.00', change: '-15.00 (1.03%)', closePrice: '₹1,465.00', marketCap: '₹14,200', sector: 'Media & Entertainment' },
  { company: 'Miscellaneous Co 1', marketPrice: '₹500.00', change: '-5.00 (0.99%)', closePrice: '₹505.00', marketCap: '₹10,000', sector: 'Others' },
  { company: 'Miscellaneous Co 2', marketPrice: '₹750.00', change: '-10.00 (1.32%)', closePrice: '₹760.00', marketCap: '₹15,000', sector: 'Others' },
  { company: 'Tata Steel', marketPrice: '₹165.00', change: '-2.00 (1.20%)', closePrice: '₹167.00', marketCap: '₹2,05,000', sector: 'Raw Material' },
  { company: 'JSW Steel', marketPrice: '₹900.00', change: '-15.00 (1.64%)', closePrice: '₹915.00', marketCap: '₹2,20,000', sector: 'Raw Material' },
  { company: 'Raymond', marketPrice: '₹2,100.00', change: '-30.00 (1.41%)', closePrice: '₹2,130.00', marketCap: '₹14,000', sector: 'Textile Industry' },
  { company: 'Trident', marketPrice: '₹38.00', change: '-0.50 (1.30%)', closePrice: '₹38.50', marketCap: '₹19,500', sector: 'Textile Industry' },
];

// Updated sectors data (removed Index sector)
const sectors = [
  { name: 'Agricultural', subSectors: [] },
  { name: 'Apparel & Accessories', subSectors: [] },
  { name: 'Automobile & Ancillaries', subSectors: [] },
  { name: 'Banking', subSectors: [] },
  { name: 'Consumer Durables', subSectors: [] },
  { name: 'Consumer Goods', subSectors: [] },
  { name: 'Derived Materials', subSectors: [] },
  { name: 'Energy', subSectors: [] },
  { name: 'Financial', subSectors: [] },
  { name: 'Healthcare', subSectors: [] },
  { name: 'Hospitality & Travel', subSectors: [] },
  { name: 'Industrial Products', subSectors: [] },
  { name: 'Industries', subSectors: [] },
  { name: 'IT Industry', subSectors: [] },
  { name: 'Logistics & Freight', subSectors: [] },
  { name: 'Media & Entertainment', subSectors: [] },
  { name: 'Others', subSectors: [] },
  { name: 'Raw Material', subSectors: [] },
  { name: 'Tele-Communication', subSectors: [] },
  { name: 'Textile Industry', subSectors: [] },
];

// Indices for the separate Index section
const indices = ['NIFTY BANK', 'NIFTY Next 50', 'NIFTY Midcap 100', 'SENSEX', 'NIFTY 50', 'NIFTY 100', 'BSE 100'];

// Helper function to parse market cap (e.g., "₹19,30,339" -> 1930339)
const parseMarketCap = (marketCap: string): number => {
  return parseFloat(marketCap.replace(/₹|,/g, ''));
};

// Helper function to parse close price (e.g., "₹12,428.80" -> 12428.80)
const parseClosePrice = (closePrice: string): number => {
  return parseFloat(closePrice.replace(/₹|,/g, ''));
};

const StocksDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedSectorFromQuery = searchParams.get('sector');

  // Validate the sector from the query parameter
  const validSector = sectors.find((sector) => sector.name === selectedSectorFromQuery)
    ? selectedSectorFromQuery
    : null;

  const [marketCap, setMarketCap] = useState<number[]>([0, 3000000]);
  const [closePrice, setClosePrice] = useState<number[]>([0, 30000]);
  const [page, setPage] = useState(1);
  const [filteredStocks, setFilteredStocks] = useState(stockData);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    validSector ? [validSector] : []
  );
  const [selectedIndices, setSelectedIndices] = useState<string[]>([]);

  // Define stocks per page
  const stocksPerPage = 10;

  // Calculate total pages based on filtered stocks
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);

  // Get the stocks for the current page
  const currentStocks = filteredStocks.slice(
    (page - 1) * stocksPerPage,
    page * stocksPerPage
  );

  // Filter stocks based on the selected sector, selectedSectors, selectedIndices, marketCap, and closePrice
  useEffect(() => {
    let filtered = stockData;

    // Apply selectedSector filter (from URL query)
    if (validSector) {
      filtered = filtered.filter((stock) => stock.sector === validSector);
    }

    // Apply selectedSectors filter (from checkboxes)
    if (selectedSectors.length > 0) {
      filtered = filtered.filter((stock) => selectedSectors.includes(stock.sector));
    }

    // Apply selectedIndices filter (from checkboxes)
    if (selectedIndices.length > 0) {
      filtered = filtered.filter((stock) => stock.sector === 'Financial');
    }

    // Apply marketCap filter (from slider)
    filtered = filtered.filter((stock) => {
      const marketCapValue = parseMarketCap(stock.marketCap);
      return marketCapValue >= marketCap[0] && marketCapValue <= marketCap[1];
    });

    // Apply closePrice filter (from slider)
    filtered = filtered.filter((stock) => {
      const closePriceValue = parseClosePrice(stock.closePrice);
      return closePriceValue >= closePrice[0] && closePriceValue <= closePrice[1];
    });

    setFilteredStocks(filtered);
    // Reset to first page when filters change
    setPage(1);
  }, [validSector, selectedSectors, selectedIndices, marketCap, closePrice]);

  const handleMarketCapChange = (event: Event, newValue: number | number[]) => {
    setMarketCap(newValue as number[]);
  };

  const handleClosePriceChange = (event: Event, newValue: number | number[]) => {
    setClosePrice(newValue as number[]);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
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
    setSelectedSectors([]); // Clear all selected sectors
    setSelectedIndices([]); // Clear all selected indices
    setMarketCap([0, 3000000]); // Reset Market Cap slider
    setClosePrice([0, 30000]); // Reset Close Price slider
    setPage(1); // Reset pagination to the first page
    router.push('/all-stocks'); // Remove the sector query parameter from the URL
  };

  return (
    <Box className="flex h-screen font-sans bg-white">
      {/* Left Sidebar (Filters) */}
      <Box className="w-[400px] p-5 bg-white border-r border-gray-500 overflow-y-auto overflow-x-hidden">
        <Box className="flex justify-between items-center mb-5">
          <Typography
            variant="h6"
            sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'black' }}
          >
            FILTERS
          </Typography>
          <Button
            variant="text"
            sx={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'black' }}
            onClick={handleClearAll}
          >
            CLEAR ALL
          </Button>
        </Box>

        {/* Sectors Section (Flat List with Checkboxes and + Icon) */}
        <Box className="mb-5">
          <Typography sx={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'black' }}>
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
                    sx={{ color: '#00c4b4', '&.Mui-checked': { color: '#00c4b4' } }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: 'black',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {sector.name}
                  </Typography>
                </Box>
                <AddIcon sx={{ color: 'black', cursor: 'pointer', fontSize: 'small' }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Index Section (Flat List with Checkboxes and + Icon) */}
        <Box className="mb-5">
          <Typography sx={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'black' }}>
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
                    sx={{ color: '#00c4b4', '&.Mui-checked': { color: '#00c4b4' } }}
                  />
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: 'black',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {indexName}
                  </Typography>
                </Box>
                <AddIcon sx={{ color: 'black', cursor: 'pointer', fontSize: 'small' }} />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Market Cap Slider */}
        <Box className="my-5">
          <Typography sx={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'black' }}>
            Market Cap (Cr)
          </Typography>
          <Slider
            value={marketCap}
            onChange={handleMarketCapChange}
            valueLabelDisplay="auto"
            min={0}
            max={3000000}
            sx={{
              color: '#00c4b4',
              '& .MuiSlider-valueLabel': {
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
              },
            }}
          />
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              0
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              30,00,000
            </Typography>
          </Box>
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Small
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Mid
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Large
            </Typography>
          </Box>
        </Box>

        {/* Close Price Slider */}
        <Box className="my-5">
          <Typography sx={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'black' }}>
            Close Price
          </Typography>
          <Slider
            value={closePrice}
            onChange={handleClosePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={30000}
            sx={{
              color: '#00c4b4',
              '& .MuiSlider-valueLabel': {
                color: 'black',
                backgroundColor: 'white',
                border: '1px solid black',
              },
            }}
          />
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              0
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              50,00,000
            </Typography>
          </Box>
          <Box className="flex justify-between mt-1">
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Small
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Mid
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: 'black' }}>
              Large
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Section (Stocks Table) */}
      <Box className="flex-1 p-5 overflow-y-auto bg-white">
        <Box className="flex justify-between items-center mb-5">
          <Typography variant="h5" className="text-2xl font-bold text-black">
            All Stocks {validSector ? `- ${validSector}` : ''}
          </Typography>
          <Typography variant="body2" className="text-sm text-black">
            Search results {filteredStocks.length} Stocks
          </Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell className="font-bold text-black">COMPANY</TableCell>
                <TableCell className="font-bold text-black">MARKET PRICE</TableCell>
                <TableCell className="font-bold text-black">CLOSE PRICE</TableCell>
                <TableCell className="font-bold text-black">MARKET CAP (Cr)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell className="text-black">
                    <Box className="flex items-center gap-2">
                      <Link
                        href={`/stock/${encodeURIComponent(stock.company)}`}
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
                      <Typography className="text-black">{stock.marketPrice}</Typography>
                      <Typography variant="body2" className="text-red-500 text-xs">
                        {stock.change}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className="text-sm text-black">{stock.closePrice}</TableCell>
                  <TableCell className="text-sm text-black">{stock.marketCap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
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