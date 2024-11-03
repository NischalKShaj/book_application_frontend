// <========================= component for the header ====================>

// importing the required modules
"use client";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminStore } from "@/store/adminStore";

const AdminHeader = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const admin = adminStore((state) => state.admin);
  const isLoggedOut = adminStore((state) => state.isLoggedOut);

  // for the hamburger menu
  const toggle = () => {
    setOpen(!open);
  };

  // for logging out the user
  const logout = () => {
    isLoggedOut();
    localStorage.removeItem("admin_access_token");
    router.push("/admin");
  };

  return (
    <div className="bg-[#1a237e] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6" />
          <span className="text-xl font-bold">Book Application</span>
        </div>
        {/* Navbar Links for larger screens */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/admin/dashboard" className="hover:text-[#f5e6d3]">
            Home
          </Link>
          <Link href="/admin/product" className="hover:text-[#f5e6d3]">
            Books
          </Link>
          <Link
            href="/admin/users"
            className="hover:text-[#f5e6d3] text-[#f5e6d3]"
          >
            Users
          </Link>
        </nav>

        {admin && (
          <div className="hidden md:flex space-x-3">
            <button
              onClick={logout}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md"
            >
              Logout
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
          <Link href="/admin/dashboard" className="hover:text-[#f5e6d3]">
            Home
          </Link>
          <Link href="/admin/product" className="hover:text-[#f5e6d3]">
            Books
          </Link>
          <Link
            href="/admin/users"
            className="hover:text-[#f5e6d3] text-[#f5e6d3]"
          >
            Users
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
