import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addToCart } from "../redux/actions/cartAction";
import Cart from "./cart"; // Make sure to use this component if needed
import Marquee from "react-fast-marquee"; // Import or replace with the appropriate marquee component

const Products = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
    console.log("add ", product);
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);

      const response2 = await fetch(
        `https://fakestoreapi.com/products/category/${data.category}`
      );
      const data2 = await response2.json();
      setSimilarProducts(data2);

      setLoading(false);
    };

    getProducts();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
        {/* ... (repeat for other skeletons) */}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = product.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowSimilarProduct = () => {
    return (
      <>
        <div className="my-5 py-2">
          <div className="">
            <div className=" py-3">
              <img
                className=""
                src={product.image}
                alt={product.title}
                width="400px"
                height="400px"
              />
            </div>
            <div className="c py-5">
              <h4 className="">{product.category}</h4>
              <h1 className="">{product.title}</h1>
              <p className="l">
                {product.rating && product.rating.rate}{" "}
                <i className="fa fa-star"></i>
              </p>
              <h3 className="  my-4">${product.price}</h3>
              <p className="lead">{product.description}</p>
              <button
                className=""
                onClick={() => addProduct(product)}
              >
                Add to Cart
              </button>
              <Link to="/cart" className="mx-3">
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </>
    );
   };
  

  const ShowProducts = () => {
    return (
      <>
        <div className="flex justify-center items-center ">
          <div className="buttons py-5 text-lg flex justify-center items-center flex-wrap ">
            <div className="">
              <button
                className=" px-3 py-2 hover:border-2 hover:border-gray-400 m-2"
                onClick={() => setFilter(product)}
              >
                All
              </button>{" "}
            </div>
            <div className="">
              <button
                className=" px-3 py-2 hover:border-2 hover:border-gray-400 m-2"
                onClick={() => filterProduct("men's clothing")}
              >
                Men's Clothing
              </button>{" "}
            </div>
            <div className="">
              <button
                className=" px-3 py-2 hover:border-2 hover:border-gray-400 m-2"
                onClick={() => filterProduct("women's clothing")}
              >
                Women's Clothing
              </button>{" "}
            </div>
            <div className="">
              <button
                className=" px-3 py-2 hover:border-2 hover:border-gray-400 m-2"
                onClick={() => filterProduct("jewelery")}
              >
                Jewelery
              </button>{" "}
            </div>
            <div className="">
              <button
                className=" px-3 py-2 hover:border-2 hover:border-gray-400 m-2"
                onClick={() => filterProduct("electronics")}
              >
                Electronics
              </button>{" "}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap">
          {filter.map((product) => (
            <div key={product.id} className="flex justify-center ">
              <div className="mb-4 flex-col border-gray-300 rounded-xl border-2 p-4 h-auto w-72 m-6 max-sm:m-2 ">
                <div className="card text-center ">
                  <img
                    className="card-img-top p-2 h-72 w-64"
                    src={product.image}
                    alt="Card"
                    height={300}
                    width={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title font-semibold">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text ">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="font-semibold">
                    <hr className="m-2"/>
                    <li className="">$ {product.price}</li>
                    <hr className="m-2" />
                  </ul>
                  <div className="card-body flex-col">
                    <Link
                       to="/"
                      className="m-1 p-3 bg-black text-white rounded-xl hover:bg-gray-700 "
                    >
                      Buy Now
                    </Link>
                    <button
                      className=" m-1 p-3 bg-black text-white rounded-xl  hover:bg-gray-700"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to Cart
                    </button>
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
    <>
      <div className="my-3 py-3 mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="">
          <div className=" font-light">
            <p className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
              Latest Products
            </p>
            <hr className="my-9" />
          </div>
        </div>
        <div className="flex flex-wrap">
          {loading ? <Loading /> : <ShowSimilarProduct />}
        </div>
        <div className=" my-5 py-5">
          <div className="hidden ">
            <h2 className="">You may also Like</h2>
            <Marquee
              pauseOnHover={true}
              pauseOnClick={true}
              speed={50}
            >
              {loading ? <Loading /> :  <ShowProducts /> }
            </Marquee>
          </div>
        </div>
        <Cart></Cart>
      </div>
    </>
  );
};

export default Products;
