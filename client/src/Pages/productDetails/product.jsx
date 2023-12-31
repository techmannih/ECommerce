import React from "react";

export default function productDetails() {
      const fetchData = async () => {
        const url =`https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B006IYTG0M&country=US`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": import.meta.env.VITE_APP_RAPIDAPI_KEY,
            "X-RapidAPI-Host": import.meta.env.VITE_APP_RAPIDAPI_HOST,
          },
        };
    
        try {
          const response = await fetch(url, options);
    
          // Check if the response status is 429 (Too Many Requests)
          if (response.status === 429) {
            const retryAfter = parseInt(response.headers.get("Retry-After")) || 5; // Default to 5 seconds if no Retry-After header
            console.log(
              `Rate limit exceeded. Retrying after ${retryAfter} seconds.`
            );
            await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
            // return fetchData(); // Retry the request
          }
    
          const result = await response.json();
        
        console.log(result)
        } catch (error) {
          console.error("API request failed:", error);
      
        }
      };
    
      const handleSearch = () => {
        // e.preventDefault();
        fetchData(); // Fetch data
      };
  return (
    <>
    
      <div className="">
        <button onClick={handleSearch}>click me</button></div>
    </>
  );
}
