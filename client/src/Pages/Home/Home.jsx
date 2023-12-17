import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";

export default function Home() {
  const [container, setContainer] = useState(null);
  const [endPoint, setEndPoint] = useState("");

  const onChangeHandler = (e) => {
    setEndPoint(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    fetchData();
  };

  const fetchData = async () => {
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${endPoint}&page=1&country=IN&sort_by=NEWEST&brand=SAMSUNG&product_condition=COLLECTIBLE`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "2325209de5msh8583d7122f13e25p108b70jsnfa29cf256b28",
        "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setContainer(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          className="border p-2 rounded w-96 text-black"
          placeholder="Search amazon.in"
          value={endPoint}
          onChange={onChangeHandler}
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          Search
        </button>
      </form>
      {container &&
        container.products &&
        container.products.map((item) => (
          <p key={item.product_id}>{item.product_title}</p>
        ))}
    </>
  );
}
