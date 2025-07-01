import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addToCart } from "../redux/actions/cartAction";
import ProductCard from "./ProductCard";
import Container from "./Container";
import toast from "react-hot-toast";

const Products = ({ isLoggedIn }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  const dispatch = useDispatch();
  let componentMounted = true;

  const addToCartHandler = (product) => {
    try {
      const cartItem = {
        productId: product.id,
        quantity: Number(product.qty) || 1,
        itemPrice: product.price,
        image: product.image,
        title: product.title,
      };
      const userId = sessionStorage.getItem("userId");

      // Dispatch addToCart action to update Redux state
      dispatch(addToCart(userId, cartItem));
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        if (componentMounted) {
          const products = await response.json();
          setData(products);
          setFilter(products); // Initialize filter with all products
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to fetch products");
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
        <div className="">
          <Skeleton height={592} />{" "}
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="flex justify-center items-center">
          <div className="flex flex-wrap gap-2 py-5 text-lg">
            <button
              className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
              onClick={() => setFilter(data)}
            >
              All
            </button>
            <button
              className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
              onClick={() => filterProduct("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
              onClick={() => filterProduct("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
              onClick={() => filterProduct("jewelery")}
            >
              Jewelry
            </button>
            <button
              className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
              onClick={() => filterProduct("electronics")}
            >
              Electronics
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filter.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isLoggedIn={isLoggedIn}
              onAddToCart={addToCartHandler}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <Container className="my-3 py-3">
      <div className="">
        <div className="font-light">
          <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
            Latest Products
          </p>
          <hr className="my-9" />
        </div>
      </div>
      <div className="flex flex-col">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </Container>
  );
};

export default Products;
