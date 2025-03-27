import React from "react";
import { FiMapPin, FiMail, FiPhone, FiGithub, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [{ name: "GitHub", icon: <FiGithub />, url: "#" }];

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center space-x-2">
              <FiMapPin className="h-7 w-7 text-blue-400" />
              <span className="text-2xl font-bold">LocationTracker</span>
            </div>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              A real-time location tracking app built with React, Tailwind CSS,
              and Socket.io. Stay updated with precise tracking.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map(({ name, icon, url }) => (
                <a
                  key={name}
                  href={url}
                  className="p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition duration-300"
                  aria-label={name}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              {["Home", "About", "Features", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-blue-400 transition duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-gray-400">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (policy) => (
                  <li key={policy}>
                    <a
                      href="#"
                      className="hover:text-blue-400 transition duration-300"
                    >
                      {policy}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-2">
                <FiMail className="h-5 w-5 text-blue-400" />
                <a
                  href="mailto:info@locationtracker.com"
                  className="hover:text-blue-400 transition duration-300"
                >
                  info@locationtracker.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FiPhone className="h-5 w-5 text-blue-400" />
                <a
                  href="tel:+1234567890"
                  className="hover:text-blue-400 transition duration-300"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            {/* Contact Button */}
            <div className="mt-5">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md font-medium shadow-md transition duration-300">
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} InstiKart LocationTracker. All
            rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 p-3 bg-gray-800 rounded-full hover:bg-blue-500 transition duration-300"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
