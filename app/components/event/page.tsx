import Image from "next/image";

type EventItem = {
  date: string;
  title: string;       
  subtitle: string;    
  amount?: string;     
  link?: string;        
};

const events: EventItem[] = [
  { date: "15 May", title: "Quarterly & Annual Result", subtitle: "Release date", link: "Check latest financial" },
  { date: "12 Feb", title: "Dividend", subtitle: "Ex date", amount: "₹3.50" },
  { date: "6 Feb", title: "Dividend", subtitle: "Announced", amount: "₹3.50" },
  { date: "6 Feb", title: "Quarterly Result", subtitle: "Release date", link: "Check latest financial" },
];

export default function EventsSection() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">2025</h2>

      {events.map((event, idx) => {
        const [day, month] = event.date.split(" ");
        return (
          <div
            key={idx}
            className="flex justify-between items-center bg-white border border-gray-200 rounded-md p-4 hover:shadow-sm"
          >
            {/* Left: Date + Details */}
            <div className="flex items-center space-x-4">
              <div className="text-center w-12 h-12 border rounded-md border-gray-300 flex flex-col justify-center">
                <span className="text-lg font-semibold">{day}</span>
                <span className="text-xs text-gray-500">{month}</span>
              </div>
              <div>
                <p className="text-gray-900 font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.subtitle}</p>
              </div>
            </div>

            {/* Right: Amount or Link */}
            {event.amount && (
              <div className="text-right">
                <p className="text-gray-900 font-semibold">{event.amount}</p>
                <p className="text-xs text-gray-500">per share</p>
              </div>
            )}
            {event.link && (
              <a
                href="#"
                className="text-sm text-gray-600 font-semibold underline underline-offset-2 hover:text-black"
              >
                {event.link} →
              </a>
            )}
          </div>
        );
      })}

      {/* View more */}
      <div className="text-green-600 font-semibold hover:underline cursor-pointer">View more</div>
{/* EVENT*/}
    <div className="flex items-center gap-3 border border-gray-200 rounded-md p-4">
  <div className="w-10 h-10 relative">
    <Image
      src="https://storage.googleapis.com/groww-assets/web-assets/img/stock/calendar_mint_light.svg"
      alt="Events calendar icon"
      fill
      className="object-contain"
    />
  </div>
  <div>
    <p className="text-sm font-semibold text-gray-900">Events calendar</p>
    <p className="text-sm text-gray-600">View upcoming events in other stocks</p>
  </div>
</div>


    </div>
  );
}
