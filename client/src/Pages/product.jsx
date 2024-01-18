import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="">
          <Skeleton height="1300px" width="1300px" />
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
          <Skeleton height={592} />
        </div>
        <div className="">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    //   }
    // return setFilter(data.filter((item) => item.category === cat));
  };
  const ShowProducts = () => {
    return (
      <><div className="flex justify-center items-center ">
        <div className="buttons py-5 text-lg ">
          <button
            className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400 "
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
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark px-3 py-2 hover:border-2 hover:border-gray-400"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div></div>
        <div className="flex flex-wrap">
          {filter.map((product) => {
            return (
              <>
                <div className="flex justify-center ">
                  <div className="mb-4 flex-col border-black border-2 p-4 h-auto w-72 m-6 max-sm:m-2 ">
                    <div className="card text-center " key={product.id}>
                      <img
                        className="card-img-top p-2 h-72 w-64"
                        src={product.image}
                        alt="Card"
                        height={300}
                      />
                      <div className="card-body">
                        <h5 className="card-title font-semibold">
                          {product.title.substring(0, 12)}...
                        </h5>
                        <p className="card-text ">
                          {product.description.substring(0, 90)}...
                        </p>
                      </div>
                      <ul className="list-group  font-semibold">
                        <li className="list-group-item lead">
                          $ {product.price}
                        </li>
                      </ul>
                      <div className="card-body flex flex-col">
                        <Link href="/" className="btn btn-dark m-1 bg-yellow-400 p-2 rounded-xl hover:bg-yellow-500">
                          Buy Now
                        </Link>
                        <Link href="/" className="btn btn-dark m-1 bg-yellow-400 p-2 rounded-xl hover:bg-yellow-500">
                          Add to Cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </>
    );
  };
  return (
    <>
      <div className=" my-3 py-3">
        <div className="">
          <div className="">
            <h2 className=" text-center font-bold text-2xl">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className=" flex flex-wrap ">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
