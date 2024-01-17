import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Pages/Navbar/navbar";
import ProductDetails from "../productDetails/product";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("phone");
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAsin, setSelectedAsin] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${encodeURIComponent(
      searchQuery
    )}`;
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

  const handleProductClick = (asin) => {
    setSelectedAsin(asin);
  };

  return (
    <>
      <div>
        {" "}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClick={handleSearch}
        />
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {apiData && (
          <div className="flex justify-center  my-8">
            <div className="flex flex-wrap justify-center">
              {apiData.data.products.map((product, index) => (
                <div
                  onClick={() => handleProductClick(product.asin)}
                  className="p-5 border border-gray-300 w-72 flex justify-center  flex-col  m-2 cursor-pointer"
                >
                  <Link key={index} to={`/product`}>
                    link{" "}
                    <ProductDetails/>
                  </Link>
                  <div className="flex justify-center">
                    <img
                      src={product.product_photo}
                      alt={product.product_title}
                      className="w-36 h-48 object-cover"
                    />
                  </div>
                  <p className="pt-2 font-bold text-gray-800 p-1 m-1">
                    {product.product_title}
                  </p>
                  <p className="p-1 m-1 text-gray-700">
                    Price: {product.product_price || "N/A"}
                  </p>
                  <div className="flex flex-col">
                    <button className="bg-yellow-400 m-1 p-2 rounded-2xl text-black">
                      Add to Cart
                    </button>
                    <button className="bg-orange-400 m-1 p-2 rounded-2xl text-black">
                      Buy Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedAsin && <ProductDetails asin={selectedAsin} />}
    </>
  );
}
