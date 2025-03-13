// component to show the orders of all the user
"use client";
// importing the required modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axiosInstance from "@/lib/axios/axiosInstance";
import Swal from "sweetalert2";

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
  trackingId: string;
}

const OrderComponent = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [updatedStatus, setUpdatedStatus] = useState<{ [key: string]: string }>(
    {}
  );
  const [trackingIds, setTrackingIds] = useState<{ [key: string]: string }>({});

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

  // Handle input change
  const handleStatusChange = (orderId: string, status: string) => {
    setUpdatedStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleTrackingIdChange = (orderId: string, trackingId: string) => {
    setTrackingIds((prev) => ({ ...prev, [orderId]: trackingId }));
  };

  // Handle order update
  const handleUpdateOrderStatus = async (id: string) => {
    const status = updatedStatus[id] || "";
    const trackingId = trackingIds[id] || "";

    if (!status || !trackingId) {
      Swal.fire({
        title: "Error",
        text: "Please select a status and enter a tracking ID",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const response = await axiosInstance.patch(
        `/admin/update-order-status/${id}`,
        { status, trackingId }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Updated Successfully",
          text: "Order status updated successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        fetchOrder();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      Swal.fire({
        title: "Oops Something went wrong",
        text: "Order status updating failed",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

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
              {order.trackingId && (
                <h2 className="text-lg font-semibold text-[#1a237e]">
                  Tracking ID: {order.trackingId}
                </h2>
              )}
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
                  htmlFor={`status-${order._id}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Update Status
                </label>
                <select
                  id={`status-${order._id}`}
                  value={updatedStatus[order._id] || ""}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a237e] focus:border-[#1a237e] text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Order Received</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter tracking ID"
                  value={trackingIds[order._id] || ""}
                  onChange={(e) =>
                    handleTrackingIdChange(order._id, e.target.value)
                  }
                  className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-[#1a237e]"
                />

                <button
                  onClick={() => handleUpdateOrderStatus(order._id)}
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
