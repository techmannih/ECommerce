import React, { useState } from "react";

export default function ProductDetails() {
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B006IYTG0M&country=US`;
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
        const retryAfter = parseInt(response.headers.get("Retry-After")) || 5;
        console.log(`Rate limit exceeded. Retrying after ${retryAfter} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return fetchData(); // Retry the request
      }

      const result = await response.json();
      setProductData(result);
    } catch (error) {
      console.error("API request failed:", error);
      setError(error.message);
    }
  };

  const handleSearch = () => {
    fetchData(); // Fetch data
  };

  return (
    <>
      <div className="">
        <button onClick={handleSearch}>Click me</button>
      </div>

      {error && <p>Error: {error}</p>}

      {productData && (
        <div>
          <h2>Product Details</h2>
          <p>Title: {productData.data.product_information["Item model number"]}</p>
          <p>Description: {productData.data.product_description}</p>

          <h3>Product Information</h3>
          <ul>
            <li>Product Dimensions: {productData.data.product_information["Product Dimensions"]}</li>
            <li>Department: {productData.data.product_information["Department"]}</li>
            <li>Date First Available: {productData.data.product_information["Date First Available"]}</li>
            {/* Add more fields as needed */}
          </ul>

          <h3>Rating Distribution</h3>
          <ul>
            {Object.entries(productData.data.rating_distribution).map(([key, value]) => (
              <li key={key}>{`${key} stars: ${value}`}</li>
            ))}
          </ul>

          <h3>Best Sellers Rank</h3>
          <p>{productData.data.product_information["Best Sellers Rank"]}</p>

          <h3>Customer Reviews</h3>
          <p>{productData.data.product_information["Customer Reviews"]}</p>
        </div>
      )}
    </>
  );
}
