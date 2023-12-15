import logo from "../index.js";

function Navbar() {
  return (
    <>
      <div className="header flex justify-between bg-black text-white p-2 h-16 text-lg font-semibold items-center w-full">
        <div className="logo">
          <img src={logo} alt="amazon" />
        </div>
        <div className="become-seller">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Become Seller</button>
        </div>
        <div className="search my-8">
          <input type="text" className=" border p-2 rounded" placeholder="Search amazon.in" />
          <button className="bg-blue-500 text-white px-4 py-2 ml-2 rounded">Search</button>
        </div>
        <div className="language text-white">Eng & Hin</div>
        <div className="account text-white">Signup</div>
        <div className="order text-white">Order & Return</div>
        <div className="cart text-white">Cart</div>
      </div>
    </>
  );
}

export default Navbar;
