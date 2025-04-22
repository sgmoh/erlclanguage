import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark-light py-8 md:py-10 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-poppins font-bold text-white">
              <span className="text-primary">ERLC</span> LANGUAGE BOT
            </h2>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-light-gray hover:text-primary transition duration-200">
              <i className="fab fa-discord text-2xl"></i>
            </a>
            <a href="#" className="text-light-gray hover:text-primary transition duration-200">
              <i className="fab fa-github text-2xl"></i>
            </a>
            <a href="#" className="text-light-gray hover:text-primary transition duration-200">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-dark-lighter pt-6 text-center text-light-gray text-sm">
          &copy; {new Date().getFullYear()} ERLC LANGUAGE BOT. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
