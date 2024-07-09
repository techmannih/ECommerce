import React from "react";

const AboutPage = () => {
  return (
    <div className="my-3 py-3 mx-auto max-w-7xl px-8  lg:px-12">
      <h1 className="text-center text-6xl max-md:text-3xl max-lg:text-5xl">
        About Us
      </h1>
      <hr className="m-6" />

      <p className="text-lg leading-relaxed">
        Welcome to Ecommerce, your one-stop destination for quality products and
        exceptional service. We are committed to providing our customers with
        the best shopping experience, from browsing our extensive product range
        to enjoying fast and reliable delivery. At Ecommerce, we believe in the
        power of choice. That's why we offer a diverse selection of products to
        cater to every taste and need. Our team works tirelessly to curate the
        latest trends and timeless classics, ensuring there's something for
        everyone.
      </p>
      <h2 className="text-2xl font-bold py-4">Our Mission</h2>
      <p>
        Our mission is to deliver unparalleled value to our customers through
        high-quality products, competitive prices, and outstanding customer
        service. We strive to create a seamless and enjoyable shopping
        experience, whether you're shopping from your computer, tablet, or
        smartphone.
      </p>
      <h2 className="text-2xl font-bold py-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>Quality Products:</strong> We handpick our products to ensure
          they meet our high standards of quality and durability.
        </li>
        <li>
          <strong>Affordable Prices:</strong> We offer competitive prices on all
          our products, so you can shop without breaking the bank.
        </li>
        <li>
          <strong>Customer Satisfaction:</strong> Your satisfaction is our top
          priority. Our dedicated customer service team is here to assist you
          with any questions or concerns.
        </li>
        <li>
          <strong>Secure Shopping:</strong> We use the latest security measures
          to ensure your personal and payment information is safe and secure.
        </li>
      </ul>

      <h2 className="text-2xl font-bold py-4">Our Products</h2>
      <p>
        Discover our wide range of products, designed to cater to every style
        and occasion. Explore our categories below:
      </p>

      <h3 className="text-xl font-semibold py-2">Men's Clothing</h3>
      <p>
        Discover our wide range of men's clothing, designed to cater to every
        style and occasion. From casual wear to formal attire, our collection
        ensures you look your best, no matter the event. Explore our selection
        of:
      </p>
      <ul className="list-disc list-inside ml-6">
        <li>
          T-Shirts & Polos: Comfortable and stylish options perfect for everyday
          wear.
        </li>
        <li>
          Shirts: From classic to trendy, find the perfect shirt for any
          occasion.
        </li>
        <li>
          Jeans & Trousers: Durable and fashionable, our bottoms are made for
          every lifestyle.
        </li>
        <li>
          Jackets & Coats: Stay warm and stylish with our range of outerwear.
        </li>
      </ul>

      <h3 className="text-xl font-semibold py-2">Women's Clothing</h3>
      <p>
        Our women's clothing collection combines elegance, comfort, and
        trendiness. Whether you're dressing up for a special occasion or keeping
        it casual, we have the perfect outfit for you. Shop our variety of:
      </p>
      <ul className="list-disc list-inside ml-6">
        <li>
          Dresses: From casual sundresses to elegant evening gowns, find the
          perfect dress for any event.
        </li>
        <li>
          Tops & Blouses: Stylish and versatile, our tops are designed to
          complement any wardrobe.
        </li>
        <li>
          Skirts & Pants: Discover a range of bottoms that offer both style and
          comfort.
        </li>
        <li>
          Outerwear: Stay chic and warm with our selection of coats and jackets.
        </li>
      </ul>

      <h3 className="text-xl font-semibold py-2">Jewelry</h3>
      <p>
        Add a touch of elegance and sparkle to your look with our exquisite
        jewelry collection. Our pieces are designed to enhance your style and
        make a statement. Explore our range of:
      </p>
      <ul className="list-disc list-inside ml-6">
        <li>
          Necklaces: Delicate pendants to bold statement pieces, perfect for
          every neckline.
        </li>
        <li>
          Earrings: From studs to chandeliers, find the perfect pair to
          complement your outfit.
        </li>
        <li>
          Bracelets & Bangles: Elegant designs that add a touch of
          sophistication to any look.
        </li>
        <li>
          Rings: Beautiful rings for every occasion, including engagement and
          wedding bands.
        </li>
      </ul>

      <h3 className="text-xl font-semibold py-2">Electronics</h3>
      <p>
        Stay ahead of the curve with our latest electronics. From cutting-edge
        gadgets to essential devices, we offer a variety of products to meet
        your tech needs. Browse our selection of:
      </p>
      <ul className="list-disc list-inside ml-6">
        <li>
          Smartphones: The latest models with innovative features and sleek
          designs.
        </li>
        <li>
          Laptops & Tablets: High-performance devices for work, play, and
          everything in between.
        </li>
        <li>
          Home Appliances: Upgrade your home with our range of efficient and
          modern appliances.
        </li>
        <li>
          Accessories: Enhance your devices with our selection of chargers,
          cases, and more.
        </li>
      </ul>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Men's Clothing"
            />
            <h5 className="text-xl font-semibold">Men's Clothing</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Women's Clothing"
            />
            <h5 className="text-xl font-semibold">Women's Clothing</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Jewelry"
            />
            <h5 className="text-xl font-semibold">Jewelry</h5>
          </div>
        </div>

        <div className="mb-3">
          <div className="bg-white p-3 rounded-lg">
            <img
              className="w-full h-48 object-cover mb-3 rounded"
              src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Electronics"
            />
            <h5 className="text-xl font-semibold">Electronics</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
