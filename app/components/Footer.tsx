import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaApple,
  FaGooglePlay,
} from 'react-icons/fa';

const Footer = () => {
  const linksGroup = [
    {
      title: 'STOCK MARKET INDICES',
      items: ['S&P BSE SENSEX', 'S&P BSE 100', 'NIFTY 100', 'NIFTY 50', 'NIFTY MIDCAP 100', 'NIFTY BANK', 'NIFTY NEXT 50'],
    },
    {
      title: 'POPULAR MUTUAL FUNDS',
      items: [
        'QUANT SMALL CAP FUND',
        'ICICI PRUDENTIAL COMMODITIES FUND',
        'NIPPON INDIA SMALL CAP FUND',
        'PARAG PARIKH FLEXI CAP FUND',
        'GROWW NIFTY TOTAL MARKET INDEX FUND',
        'SBI SMALL MIDCAP FUND',
        'TATA DIGITAL INDIA FUND',
        'AXIS SMALL CAP FUND',
        'ICICI PRUDENTIAL TECHNOLOGY FUND',
        'HDFC INDEX FUND SENSEX PLAN',
        'HDFC SMALL CAP FUND',
        'AXIS EQUITY FUND',
        'CANARA ROBECO SMALL CAP FUND',
        'TATA SMALL CAP FUND',
        'UTI NIFTY FUND',
      ],
    },
    {
      title: 'MUTUAL FUNDS COMPANIES',
      items: [
        'GROWWMF',
        'SBI',
        'AXIS',
        'HDFC',
        'UTI',
        'NIPPON INDIA',
        'ICICI PRUDENTIAL',
        'TATA',
        'KOTAK',
        'DSP',
        'CANARA ROBECO',
        'SUNDARAM',
        'MIRAE ASSET',
        'IDFC',
        'FRANKLIN TEMPLETON',
        'PPFAS',
        'MOTILAL OSWAL',
        'INVESCO',
        'EDELWEISS',
        'ADITYA BIRLA SUN LIFE',
        'LIC',
        'HSBC',
        'NAVI',
        'QUANTUM',
        'UNION',
        'ITI',
        'MAHINDRA MANULIFE',
        '360 ONE',
        'BOI',
        'TAURUS',
        'JM FINANCIAL',
        'PGIM',
        'SHRIRAM',
        'BARODA BNP PARIBAS',
        'QUANT',
        'WHITEOAK CAPITAL',
        'TRUST',
        'SAMCO',
        'NJ',
      ],
    },
    {
      title: 'TOOLS',
      items: [
        'BROKERAGE CALCULATOR',
        'MARGIN CALCULATOR',
        'SIP CALCULATOR',
        'SWP CALCULATOR',
        'SUKANYA SAMRIDDHI YOJANA CALCULATOR',
        'MUTUAL FUND RETURNS CALCULATOR',
        'FD CALCULATOR',
        'RD CALCULATOR',
        'EMI CALCULATOR',
        'PPF CALCULATOR',
        'EPF CALCULATOR',
        'NPS CALCULATOR',
        'GRATUITY CALCULATOR',
      ],
    },
  ];

  return (
    <footer className="bg-gray-100 text-sm text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Responsive grid: 1 col on xs, 2 cols on sm, 4 cols on md+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-lg font-semibold">Groww</h2>
            <p className="mt-2">Vaishnavi Tech Park, South Tower, 3rd Floor</p>
            <p>Sarjapur Main Road, Bellandur</p>
            <p>Bengaluru - 560103</p>
            <p>Karnataka</p>
            <a href="#" className="text-blue-600">Contact Us</a>
            <div className="flex space-x-3 mt-4 text-xl">
              <FaFacebookF />
              <FaTwitter />
              <FaYoutube />
              <FaInstagram />
              <FaLinkedinIn />
              <FaTelegramPlane />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Products</h3>
            <ul className="space-y-1">
              <li>Stocks</li>
              <li>Futures & Options</li>
              <li>MTF</li>
              <li>IPO</li>
              <li>Mutual Funds</li>
              <li>NFO</li>
              <li>ETF</li>
              <li>Algo Trading</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Groww</h3>
            <ul className="space-y-1">
              <li>About Us</li>
              <li>Pricing</li>
              <li>Blog</li>
              <li>Media & Press</li>
              <li>Careers</li>
              <li>Help and Support</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>AMC Mutual Funds</li>
              <li>Calculators</li>
              <li>Glossary</li>
              <li>Open Demat Account</li>
              <li>Groww Digest</li>
              <li>Sitemap</li>
              <li>Income Tax Calculator</li>
              <li>FII DII</li>
            </ul>
          </div>
        </div>

        {/* Bottom flex - wrap on small screens */}
        <div className="flex flex-wrap justify-between items-center border-t mt-10 pt-4 text-sm gap-4">
          <p className="flex-1 min-w-[250px]">
            © 2016-2025 Groww. All rights reserved, Built with <span className="text-red-500">❤</span> in India
          </p>
          <div className="flex space-x-3 text-2xl">
            <FaApple />
            <FaGooglePlay />
          </div>
        </div>

        <div className="mt-8 space-y-6 text-sm">
          {linksGroup.map((group, idx) => (
            <div key={idx}>
              <p className="font-semibold mb-1">{group.title}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <span key={i} className="text-green-600 hover:underline cursor-pointer">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t pt-4 text-gray-500 flex flex-wrap gap-2">
            <span className="font-semibold">OTHERS:</span>
            <span>NSE</span>|
            <span>BSE</span>|
            <span>Terms and Conditions</span>|
            <span>Policies and Procedures</span>|
            <span>Regulatory & Other Info</span>|
            <span>Privacy Policy</span>|
            <span>Disclosure</span>|
            <span>Bug Bounty</span>|
            <span>Download Forms</span>|
            <span>Investor Charter and Grievance</span>|
            <span>SMART ODR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
