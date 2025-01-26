// component that shows the users
"use client";

// importing the required modules
import React, { useState } from "react";
import Image from "next/image";

const UserComponent = () => {
  const [isBlocked, setIsBlocked] = useState(false);

  const toggleBlockStatus = () => {
    setIsBlocked((prevStatus) => !prevStatus);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] ">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-6">
          User Management
        </h1>
        <div className="grid grid-cols-4 gap-6">
          {/* User Card */}
          <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[400px]">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-4">
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAMFBMVEXk5ueutLeor7Lf4ePn6..."
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* User Details */}
            <div className="text-center flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-[#1a237e] mb-2">
                  Nischal K Shaj
                </h2>
                <p className="text-gray-600 mb-1">nischalkshaj5@gmail.com</p>
                <p className="text-[#d84315] font-bold mb-3">954429156</p>
              </div>
              <button
                onClick={toggleBlockStatus}
                className={`mt-4 px-4 py-2 rounded-md text-sm font-medium ${
                  isBlocked
                    ? "bg-green-100 text-green-600 hover:bg-green-200"
                    : "bg-red-100 text-red-600 hover:bg-red-200"
                }`}
              >
                {isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>

          {/* Repeat the card as needed */}
          <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[400px]">
            {/* Repeat similar structure */}
          </div>
          <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[400px]">
            {/* Repeat similar structure */}
          </div>
          <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[400px]">
            {/* Repeat similar structure */}
          </div>
          <div className="bg-white rounded-lg shadow-md flex flex-col items-center p-6 w-80 h-[400px]">
            {/* Repeat similar structure */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserComponent;
