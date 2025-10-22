import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="mx-auto flex items-center justify-center bg-brown-900 py-3 text-white">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-lg sm:text-xl text-gray-500 sm:text-center dark:text-gray-900">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Chocose™
            </a>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-lg sm:text-xl text-gray-500 sm:text-center dark:text-gray-900 sm:mt-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
