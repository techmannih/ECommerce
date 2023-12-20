import React, { useState, useEffect } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('Phone');
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    const pageSize = 50; // Adjust the page size as needed
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(
      searchQuery
    )}&page=1&pageSize=${pageSize}&country=US&category_id=aps`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await fetch(url, options);

      // Check if the response status is 429 (Too Many Requests)
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 5;
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        return fetchData(); // Retry the request
      }

      const result = await response.json();
      setApiData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

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
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {apiData && (
        <div>
          <h2>Data from API</h2>
          <pre>{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
