import React, { useEffect, useState } from 'react';

export default function Home() {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${process.env.REACT_APP_QUERIES}`;
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
    const retryAfter = parseInt(response.headers.get('Retry-After')) || 5; // Default to 5 seconds if no Retry-After header
    console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return fetchData(); // Retry the request
  }

  const result = await response.json();
  console.log(result);
} catch (error) {
  console.error(error);
}
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  return (
    <>
      {/* You can use the 'apiData' state in your component */}
      <div>{apiData}</div>
    </>
  );
}