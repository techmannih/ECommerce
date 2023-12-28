import React, { useState } from "react";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host':import.meta.env.VITE_APP_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await fetch(url, options);

      // Check if the response status is 429 (Too Many Requests)
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 5; // Default to 5 seconds if no Retry-After header
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return fetchData(); // Retry the request
      }

      const result = await response.json();
      setApiData(result);
      setIsLoading(false);
    } catch (error) {
      console.error("API request failed:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData(); // Fetch data with the updated searchQuery
  };

  return (
    <div>
      <div>
        <label htmlFor="searchQuery">Search:</label>
        <input
          type="text"
          id="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {apiData && (
        <div>
          <h2>Data from API</h2>
          {/* Display your data here */}
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
