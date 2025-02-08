// <=================== component for the footer ====================>

// importing the required modules
import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a237e] text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Author</h3>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-[#f5e6d3]">
                  About
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Connect</h3>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-[#f5e6d3]">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f5e6d3]">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f5e6d3]">
                  Instagram
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f5e6d3]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Book Application. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
