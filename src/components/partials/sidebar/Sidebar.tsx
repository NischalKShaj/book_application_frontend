// <====================== component for sidebar =============>
"use client";

// importing the required modules
import React, { useState } from "react";
import Image from "next/image";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import ProfileEditModal from "@/components/modal/ProfileEditModal";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const user = userStore((state) => state.user);
  const logout = userStore((state) => state.isLoggedOut);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // for moving to the order page
  const handleOrders = () => {
    router.push("/order");
    setSidebarOpen(false); // Close sidebar after navigation
  };

  // for logging out the user
  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    router.push("/login");
    setSidebarOpen(false); // Close sidebar after logout
  };

  // for moving to the address page
  const handleAddressPage = () => {
    router.push("/address");
    setSidebarOpen(false); // Close sidebar after navigation
  };

  // for editing the address
  const handleEditProfile = () => {
    setSidebarOpen(false); // Close sidebar first
    setTimeout(() => {
      setOpenModal(true); // Open modal after a longer delay
    }, 200); // Increased delay to 200ms
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Hamburger Menu (Mobile) */}
      <button
        onClick={toggleSidebar}
        className="sm:hidden text-black p-2 rounded-md"
      >
        {sidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar Content */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } sm:flex flex-col items-center w-full max-w-xs sm:w-64 h-auto sm:h-[600px] bg-[#1a237e] m-4 sm:m-10 text-white py-8 shadow-lg rounded-lg`}
      >
        {/* Profile Section */}
        <div className="flex flex-col items-center w-full">
          <Image
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAMFBMVEXk5ueutLepsLPZ3N7n6erg4uPKztC3vL++w8W7wMPHy83V2NqzubzP0tTc3+DCxskfOlAIAAADRklEQVR4nO2bwXKEIAxAEQMqCP7/3xbdrV23XSXRBKfDu7SHzvRNDBBDVKpSqVQqlUqlUqlUKpVK5V8AsP4Cu38oCUD0duqHRO+sV7dQAxVd12wYg1GF1UCFQevmDa17X1IMlH9XWunaYmYQh1+heglab8qYgf0s9aDMw+x3gvUMmSsgNh5ZLc9S2irmaCWxQTZiJstKPGKmOzZaxeQiBnv7wy8xKyUGAaGV8EJeEWWVkAkY5C3FH2S2MexTnIkCXgYbLpk1SQlXow2/F94qMXEHDFpCuFIJyx0w6Enx0oHZi5D1C9zntyc9xhQwXi1wVC/e2hW916/wrkgghislGKeWimQv1p0CqGmfvDjPSLBkr6bl9HJkLc1ZHRJ3e36vie7FeRL9x3ixet017++6T9x0X73rOXTm3L5pncP8bktNfM3cBibX0cz1PaLztYH7jfuu72lA2ynY32uJK5K9D0DLfOa3xwf4zBfp/RI6J/zZtYh1SDGpjjS27zsKNcqxLUPOymsrNmHuFSRv+xD3MAJb1wu5u6v0FWRm31D6ni+Rs1sUubDNuEcWu0p7BcL+s9RjLDQQYHbnFFyhOYXZrP2wYeim1PTEU0z5P+dgpnLTJj9qdhibp5xOP8fBlx4begBg2rAMWvWTDa25xZzVAmwobTMze8ToQ7Buxobg26hK2qV/nB7f9PeCHHvroxGfnEv/r7V9t6T5p+1L67F3kkN9oEzIf7vtbJRYnSmb7NBg6lWtO+e5o2Y8rT8xOsZRSDBupPbl0sHEdQTEgei0Bo3hHIB4XG4dB224+B0EDP1CYcuV46MAFrUCd9HTVQXQxyKLSrhE7HhMFcsVE7dgsF2SLM7mP7QMUs3pFzjSUFWe2Jm5BfJ0SQ4dOclQbRs8I1GMWYsqxq5F67uy5tY3HV6LbSVuwLahuPatd9AdH/L9J1YMVV8I5PwKRuvz5zfX4xBiFxc2+2S3989MbxDosjNM0qrJLnquLwQPyC0tpPaIb3RehtFncKhkXZuC6GJ8kHN+Z3+ydCEZpxGEAl45H2Vd9WaNIacQK5BeOSuyRHo1+vgVnPb9xlmOL3Vl6tR3DuvWVHmV4PgTttgW4UirUqlUKpWKUl/lWSnkmIvaNgAAAABJRU5ErkJggg=="
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full border-4 border-[#d84315]"
          />
          <h1 className="mt-4 text-xl font-bold text-center">
            {user?.username}
          </h1>
          <p className="text-gray-300 text-sm text-center">{user?.email}</p>
          <p className="text-gray-300 text-sm text-center">
            {user?.phoneNumber}
          </p>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            className="mt-6 bg-[#d84315] hover:bg-[#bf360c] text-white px-4 py-2 text-sm font-semibold rounded-full"
          >
            Edit Profile
          </button>
        </div>

        {/* Navigation Options */}
        <div className="mt-8 w-full flex flex-col items-center">
          <ul className="space-y-4 px-6">
            <li className="flex justify-center w-full">
              <button
                onClick={handleAddressPage}
                className="w-full text-left bg-gray-200 text-[#333333] hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                Address
              </button>
            </li>
            <li className="flex justify-center w-full">
              <button
                onClick={handleOrders}
                className="w-full text-left bg-gray-200 text-[#333333] hover:bg-gray-300 px-4 py-2 rounded-lg"
              >
                Orders
              </button>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center w-full">
          <button
            onClick={handleLogout}
            className="mt-8 bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold rounded-full"
          >
            Logout
          </button>
        </div>
      </div>
      {openModal && (
        <div>
          <ProfileEditModal onClose={() => setOpenModal(false)} />
        </div>
      )}
    </>
  );
};
export default Sidebar;
