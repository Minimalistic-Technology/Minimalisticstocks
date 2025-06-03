import { useState, useEffect } from "react";

function NewsSection() {
  const [newsData, setNewsData] = useState<{ source: string; time: string; content: string; highlight: boolean }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch news data from the API
  useEffect(() => {
    const fetchNewsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:5000/api/buystocks/getnewsdata");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }
        const data = await response.json();

        // Format the data to match the expected structure
        const formattedData = data.map((item: any) => ({
          source: item.source,
          time: item.time,
          content: item.content,
          highlight: item.highlight,
        }));

        setNewsData(formattedData);
      } catch (error) {
        console.error("Error fetching News data:", error);
        setError("Failed to load news data. Please try again later.");
        // Fallback to empty array if API fails
        setNewsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4">
        {loading ? (
          <p>Loading news...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : newsData.length > 0 ? (
          newsData.map(({ source, time, content }, idx) => (
            <div
              key={idx}
              className="p-4 rounded transition-all duration-300 hover:bg-green-50 cursor-pointer"
            >
              <div className="text-sm text-gray-500 mb-1">
                <strong>{source}</strong> · {time}
              </div>
              <p className="text-sm text-gray-800">{content}</p>
            </div>
          ))
        ) : (
          <p>No news data available.</p>
        )}
      </div>
    </div>
  );
}

export default NewsSection;
