import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, isLoggedIn, onAddToCart }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <img
        className="h-48 w-full object-contain mb-3"
        src={product.image}
        alt={product.title}
      />
      <h5 className="font-semibold truncate" title={product.title}>
        {product.title}
      </h5>
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description}
      </p>
      <div className="flex-grow" />
      <p className="font-semibold mt-3">$ {product.price}</p>
      {isLoggedIn ? (
        <button
          onClick={() => onAddToCart(product)}
          className="mt-3 bg-black text-white rounded-md py-2 hover:bg-gray-700"
        >
          Add to Cart
        </button>
      ) : (
        <Link to="/login" className="mt-3 text-blue-500 underline">
          Log in to buy
        </Link>
      )}
    </div>
  );
};

export default ProductCard;
