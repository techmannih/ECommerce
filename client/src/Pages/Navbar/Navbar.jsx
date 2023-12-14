function Navbar() {
  return (
    <>
      <div className="header flex justify-between bg-black text-white">
        <div className="logo">Amazon</div>
        <div className="became-seller">
         <button className="">Become Seller</button> 
        </div>
        <div className="search">
          <input type="text" className="" placeholder="search" />
          <button>search</button>
        </div>
        <div className="language">Eng & Hin</div>
        <div className="account">Signup</div>
        <div className="order">Order & Return</div>
        <div className="cart">Cart</div>
      </div>
    </>
  );
}

export default Navbar;
