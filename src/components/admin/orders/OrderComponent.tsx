// component to show the orders of all the user
"use client";
// importing the required modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios/axiosInstance";

interface Product {
  productId: string;
  quantity: number;
  amount: number;
  images: string[];
  bookName: string;
}

interface Order {
  _id: string;
  userId: string;
  addressId: string;
  cartId: string;
  products: Product[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  isCancel: boolean;
  createdAt: string;
}

const OrderComponent = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // fetching the orders of all the users
  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get("/admin/order-details");
      if (response.status === 200) {
        console.log("repose", response.data);
        setOrders(response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // for loading the orders
  useEffect(() => {
    fetchOrder();
  }, []);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow p-6"
            >
              {/* Order ID and Status */}
              <h2 className="text-lg font-semibold text-[#1a237e]">
                Order ID: {order._id}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Status:</span>{" "}
                <span className="text-[#d84315]">{order.status}</span>
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Total:</span> ₹
                {order.totalAmount}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Ordered On:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {/* Product Details */}
              <div className="mt-4">
                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b pb-2 mb-2"
                  >
                    <div className="w-16 h-16 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={product.images[0]} // Show first product image
                        alt={product.bookName}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold">
                        {product.bookName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity} | ₹{product.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Update Status */}
              <div className="mt-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Status
                </label>
                <select
                  id="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] text-sm"
                >
                  <option value="pending">Order Received</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
                <input
                  id="trackingId"
                  type="text"
                  placeholder="Enter tracking ID"
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#1a237e]"
                />
                <button
                  onClick={handleUpdateOrderStatus}
                  className="w-full px-4 py-2 mt-2 bg-[#d84315] hover:bg-[#bf360c] text-white rounded-md"
                >
                  Update Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OrderComponent;
