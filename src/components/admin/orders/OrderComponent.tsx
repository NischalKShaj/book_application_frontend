// component to show the orders of all the user
"use client";
// importing the required modules
import React from "react";
import Image from "next/image";

const OrderComponent = () => {
  // function for updating the order status
  const handleUpdateOrderStatus = async () => {};
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-[#1a237e] mb-8">
          Order Management
        </h1>

        {/* Grid Container */}
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            {/* Product Image */}
            <div className="relative h-48 bg-gray-100">
              <Image
                src="/image"
                alt="Product name"
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              {/* Product Name */}
              <h2 className="text-lg font-semibold text-[#1a237e] truncate">
                Product Name
              </h2>

              {/* Product Description */}
              <p className="text-gray-700 text-sm line-clamp-2">
                A brief description of the product goes here. This will be
                truncated to two lines.
              </p>

              {/* Price and Stock */}
              <div className="flex justify-between items-center">
                <p className="text-[#d84315] font-bold">₹1,299</p>
                <p className="text-gray-500 text-sm">Quantity: 12</p>
              </div>

              {/* User Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-semibold">User:</span> John Doe
                </p>
                <p>
                  <span className="font-semibold">Address:</span> 123 Main St,
                  City Name
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="text-[#1a237e] font-medium">Pending</span>
                </p>
              </div>

              {/* Status Dropdown */}
              <div className="flex flex-col gap-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Update Status
                </label>
                <select
                  id="status"
                  className="w-full px-6 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] text-sm"
                >
                  <option className="w-full px-6 py-3" value="pending">
                    Order Received
                  </option>
                  <option className="w-full px-6 py-3" value="shipped">
                    Shipped
                  </option>
                  <option className="w-full px-6 py-3" value="delivered">
                    Delivered
                  </option>
                </select>
                <input
                  id="trackingId"
                  type="text"
                  // onChange={handleLogin}
                  placeholder="Enter tracking id"
                  className="outline outline-1 outline-gray-500 rounded px-2 py-1"
                />
                <button
                  onClick={handleUpdateOrderStatus}
                  className="w-full px-6 py-3 bg-[#d84315] hover:bg-[#bf360c] rounded-lg text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderComponent;
