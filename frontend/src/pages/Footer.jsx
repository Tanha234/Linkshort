import React from "react";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#2b2b2b] to-[#1a1a1a] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">LinkShort</h1>
          <p className="text-gray-400 text-sm">
            Shorten, manage, and track all your URLs in one place. Perfect for marketers and affiliates.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <a href="/" className="hover:text-white transition">Home</a>
          <a href="/about" className="hover:text-white transition">LinkPop</a>
          <a href="/dasboard" className="hover:text-white transition">Dashboard</a>
         
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>

        {/* Social & Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            {[FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-[#E2852E] text-white transition"
              >
                <Icon />
              </a>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-white font-semibold mb-2">Subscribe</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-lg text-black focus:outline-none"
              />
              <button className="bg-[#E2852E] px-4 py-2 rounded-lg text-white font-semibold hover:bg-orange-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} LinkShort. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
