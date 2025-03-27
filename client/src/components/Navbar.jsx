import React, { useState, useEffect } from "react";
import { MapPin, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900 bg-opacity-90 shadow-lg backdrop-blur-xl"
          : "bg-gray-900 blur-md bg-opacity-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <MapPin className="h-8 w-8 text-blue-400 animate-pulse" />
          <span className="text-2xl font-extrabold tracking-wide text-white">
            LocationTracker
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {["Home", "About", "Features", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="relative text-gray-300 hover:text-white transition-all duration-300 text-lg font-medium after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-blue-500 after:left-1/2 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full hover:after:left-0"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-6 text-white focus:outline-none"
          >
            <X className="w-8 h-8" />
          </button>
          {["Home", "About", "Features", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-white text-xl font-medium hover:text-blue-400 transition-all duration-300 my-4"
              onClick={() => setIsMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
