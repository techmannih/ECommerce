import Product from "../Components/product";

export default function Home({ isLoggedIn }) {
  return (
    <>
      <div className="">
        <Product isLoggedIn={isLoggedIn} />
      </div>
    </>
  );
}
