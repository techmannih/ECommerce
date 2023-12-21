import React from "react";
import logo from "../images/amazonLogo.jpg";
const Navbar = () => {
  return (
    <>
      <div className="  w-full">
        <div
          id="nav-belt"
          className="flex justify-between items-center text-white bg-black p-4    "
        >
          <div id="nav-logo ">
            <a
              href="/ref=nav_logo"
              id="nav-logo-sprites"
              className="nav-logo-link nav-progressive-attribute"
              aria-label="Amazon.in"
            >
              <img src={logo} alt="Amazon.in" className="w-32" />
            </a>
          </div>

          <div className=" seller-button mx-2">
            <button
              className="bg-yellow-400 text-black m-4 p-2 px-4 rounded font-semibold text-lg"
              id="glow-ingress-line1"
            >
              Become Seller
            </button>
          </div>
          <div id="nav-search mx-2">
            <SearchForm />
          </div>

          <div className="language font-semibold mx-2">
            <LanguageSelector />
          </div>
          <div className="user mx-2">
            <AccountInfo />
          </div>
          <div className="order-return font-semibold text-lg mx-3">
            <ReturnsAndOrdersLink />
          </div>
          <div className="cart font-semibold mx-3 text-lg">
            <CartTextContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

const SearchForm = () => {
  return (
    <form className="" name="site-search" role="search">
      <div className="flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search Amazon.in"
          className="text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:border-yellow-500 w-96 "
        />
        <button
          type="submit"
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
        >
          Search
        </button>
      </div>
    </form>
  );
};

const LanguageSelector = () => {
  const languageOptions = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "ja", name: "日本語" },
    { code: "ko", name: "한국어" },
    { code: "zh", name: "中文" },
    { code: "hi", name: "हिन्दी" },
    { code: "ru", name: "Русский" },
    { code: "ar", name: "العربية" },
  ];

  return (
    <div className=" text-black bg-black text-lg">
      <span className="nav-line-2">
        <select
          className="icp-nav-select bg-black text-white"
          onChange={(e) => console.log("Selected language:", e.target.value)}
        >
          {languageOptions.map((language) => (
            <option
              key={language.code}
              value={language.code}
              className="bg-white text-black"
            >
              {language.name}
            </option>
          ))}
        </select>
        <span
          className="nav-icon nav-arrow"
          style={{ visibility: "visible" }}
        ></span>
      </span>
    </div>
  );
};

const AccountInfo = ({ isLoggedIn, fullName }) => {
  return (
    <div className="flex flex-col">
      <span className="">
        {isLoggedIn ? `Hello, ${fullName}` : "Hello, sign in"}
      </span>
      <span className="">
        Account &amp; Lists
        <span className="" style={{ visibility: "visible" }}></span>
      </span>
    </div>
  );
};

const ReturnsAndOrdersLink = () => {
  return (
    <>
      <span className="nav-line-1">Returns</span>
      <span className="nav-line-2">
        &amp; Orders<span className="nav-icon nav-arrow"></span>
      </span>
    </>
  );
};

const CartTextContainer = () => {
  return (
    <div id="nav-cart-text-container" className="nav-progressive-attribute">
      <span aria-hidden="true" className="nav-line-1"></span>
      <span aria-hidden="true" className="nav-line-2">
        Cart
        <span className="nav-icon nav-arrow"></span>
      </span>
    </div>
  );
};
