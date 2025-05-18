import Image from "next/image";
import { useState, useEffect } from "react";

type EventItem = {
  date: string;         // e.g., "15 May"
  title: string;        // e.g., "Quarterly & Annual Result"
  subtitle: string;     // e.g., "Release date", "Ex date"
  amount?: string;      // optional: "₹3.50"
  link?: string;        // optional: "Check latest financial"
};

export default function EventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/buystocks/getevents");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          date: item.date,
          title: item.title,
          subtitle: item.subtitle,
          amount: item.amount,
          link: item.link,
        }));

        setEvents(formattedData);
      } catch (error) {
        console.error("Error fetching Events data:", error);
        setError("Failed to load events data. Please try again later.");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h2 className="text-lg font-bold text-gray-900">2025</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : events.length > 0 ? (
        events.map((event, idx) => {
          const [day, month] = event.date.split(" ");
          return (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white border border-gray-200 rounded-md p-4 hover:shadow-sm space-y-4 sm:space-y-0"
            >
              {/* Left: Date + Details */}
              <div className="flex items-center space-x-4">
                <div className="text-center w-12 h-12 border rounded-md border-gray-300 flex flex-col justify-center">
                  <span className="text-lg font-semibold">{day}</span>
                  <span className="text-xs text-gray-500">{month}</span>
                </div>
                <div className="text-left">
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
        })
      ) : (
        <p>No events data available.</p>
      )}

      {/* View more */}
      <div className="text-green-600 font-semibold hover:underline cursor-pointer">View more</div>

      {/* EVENT */}
      <div className="flex flex-col sm:flex-row items-center gap-3 border border-gray-200 rounded-md p-4">
        <div className="w-10 h-10 relative">
          <Image
            src="https://img.icons8.com/?size=48&id=ZfQHCnh6ImEM&format=png"
            alt="Events calendar icon"
            fill
            className="object-contain"
          />
        </div>
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold text-gray-900">Events calendar</p>
          <p className="text-sm text-gray-600">View upcoming events in other stocks</p>
        </div>
      </div>
    </div>
  );
}
