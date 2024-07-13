import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addToCart } from "../redux/actions/cartAction";

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
      const userId = localStorage.getItem("userId");

      // Dispatch addToCart action to update Redux state
      dispatch(addToCart(userId, cartItem));

      console.log("Item added to the cart:", product);
    } catch (error) {
      console.error("Error adding item to the cart:", error.message);
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
        console.error("Error fetching products:", error);
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
          <div className="buttons py-5 text-lg">
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
        <div className="flex flex-wrap justify-center items-center">
          {filter.map((product) => (
            <div key={product.id} className="flex justify-center">
              <div className="mb-4 flex-col border-gray-300 rounded-xl border-2 p-4 h-auto w-72 m-6 max-sm:m-2">
                <div className="card text-center">
                  <img
                    className="card-img-top p-2 h-72 w-64"
                    src={product.image}
                    alt="Product"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title font-semibold">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="font-semibold">
                    <hr className="m-2" />
                    <li>$ {product.price}</li>
                    <hr className="m-2" />
                  </ul>
                  <div className="card-body flex-col">
                    {isLoggedIn ? (
                      <button
                        onClick={() => addToCartHandler(product)}
                        className="m-1 p-3 bg-black text-white rounded-xl hover:bg-gray-700"
                      >
                        Buy Now
                      </button>
                    ) : (
                      <Link to="/login" className="text-red-500 underline">
                        Log in to buy
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
    </div>
  );
};

export default Products;
