const newsData = [
  {
    source: "Moneycontrol",
    time: "11 hours ago",
    content: "Cochin Shipyard shares rose 6.8% intraday, hitting Rs 1,815, then traded at Rs 1,788.8, up 5.3%. PB Fintech dropped 0.9% to Rs 1,739.2; ITC Hotels fell 0.6% to Rs 200.71 ahead of Q4 results.",
    highlight: true,
  },
  {
    source: "Marketsmojo",
    time: "2 days ago",
    content: "Cochin Shipyard Ltd sees a surge in trading with 2.93M shares and market cap of Rs 44,442.2 Cr. Trading above key averages, it shows a strong trend. The stock opened at Rs 1,640, peaked at Rs 1,704.8, gaining 17.2% over 4 days, outperforming its sector by 0.5%. Delivery volume surged 72.2%.",
    highlight: false,
  },
  {
    source: "BSE",
    time: "3 days ago",
    content: "Cochin Shipyard Ltd (CSL) partners with Drydocks World to enhance ship repair and offshore fabrication in India. The MoU aligns with India's Maritime Vision 2030, aiming to create a global maritime hub and skilled workforce.",
    highlight: false,
  },
  {
    source: "ScoutQuest",
    time: "3 days ago",
    content: "Cochin Shipyard partners with Drydocks World to enhance ship repair and offshore fabrication in India. MoU signed during UAE Crown Prince's visit aligns with India's Maritime Vision 2030.",
    highlight: false,
  },
  {
    source: "Business Today",
    time: "7 days ago",
    content: "Defence stocks like Bharat Forge, HAL, BEL, and Cochin Shipyard are in focus as govt calls defence makers to ramp up production.",
    highlight: false,
  },
];

function NewsSection() {
  return (
     <div className="flex flex-col space-y-4">
      {newsData.map(({ source, time, content }, idx) => (
        <div
          key={idx}
          className="p-4 rounded transition-all duration-300 hover:bg-green-50 cursor-pointer"
        >
          <div className="text-sm text-gray-500 mb-1">
            <strong>{source}</strong> · {time}
          </div>
          <p className="text-sm text-gray-800">{content}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsSection;
