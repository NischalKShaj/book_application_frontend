// <========================= component for the header ====================>

// importing the required modules
"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = userStore((state) => state?.user);
  const isLoggedOut = userStore((state) => state.isLoggedOut);

  // for the hamburger menu
  const toggle = () => {
    setOpen(!open);
  };

  // for moving to the login
  const login = () => {
    router.push("/login");
  };

  // for moving to the signup page
  const signup = () => {
    router.push("/signup");
  };

  // for logging out the user
  const logout = () => {
    isLoggedOut();
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return (
    <div className="bg-[#1a237e] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6" />
          <Link href="/" className="text-xl font-bold">
            Book Application
          </Link>
        </div>

        {/* Navbar Links for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-[#f5e6d3]">
            Home
          </Link>
          <Link href="/product" className="hover:text-[#f5e6d3]">
            Books
          </Link>
          <Link href="/about" className="hover:text-[#f5e6d3] text-[#f5e6d3]">
            About
          </Link>
        </nav>

        {/* Login and Signup Buttons for larger screens */}
        {user ? (
          <div className="hidden md:flex space-x-3">
            <span>{user.username}</span>
            <Link href="/cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </Link>
            <button
              onClick={logout}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-3">
            <button
              onClick={login}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md"
            >
              Login
            </button>
            <button
              onClick={signup}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md"
            >
              Signup
            </button>
          </div>
        )}

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={toggle}
          className="md:hidden text-white bg-[#d84315] p-2 rounded-md"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {open && (
        <div className="flex flex-col items-center md:hidden space-y-3 mt-3">
          <Link href="/" className="hover:text-[#f5e6d3]">
            Home
          </Link>
          <Link href="/product" className="hover:text-[#f5e6d3]">
            Books
          </Link>
          <Link href="/about" className="hover:text-[#f5e6d3] text-[#f5e6d3]">
            About
          </Link>
          <button
            onClick={login}
            className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md w-full"
          >
            Login
          </button>
          <button
            onClick={signup}
            className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md w-full"
          >
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
