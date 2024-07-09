import React from "react";
import { FaLinkedin } from "react-icons/fa"; // Import LinkedIn icon from react-icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-6 mt-3 max-md:text-sm">
      <div className="container mx-auto text-center py-6">
        <p className="text-lg max-md:text-sm">
          Ecommerce &copy; {currentYear} All rights reserved.
        </p>
        <p className="mt-2 flex justify-center items-center">
          Made by Manish Chaudhry
          <a
            href="https://www.linkedin.com/in/techmannih"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-500"
          >
            <FaLinkedin size={24} />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
