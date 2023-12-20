import React, { useState, useEffect } from "react";
import data from "../Data/data";
import image from "../images/1sr.jpg";
export default function Home() {
  return (
    <div>
      <div>
        <div className="flex justify-center ">
          <div className="flex flex-wrap justify-center">
            {data.data.products.map((product, index) => (
              <div
                key={index}
                className="p-5 border border-black w-72 flex justify-center flex-col m-2"
              >
                <div className="flex justify-center">
                  <img src={image} alt="okk" className="w-32 h-32" />
                </div>
                <p className="pt-2 font-bold text-zinc-950 p-1 m-1">
                  {product.product_title}
                </p>
                <p className=" p-1 m-1 text-gray-700">
                  Price: {product.product_price}
                </p>
                <div className="  flex flex-col">
                  <button className="bg-yellow-400 m-1 p-1 rounded-2xl">
                    Add to Cart
                  </button>
                  <button className="bg-orange-400 m-1 p-1 rounded-2xl">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
