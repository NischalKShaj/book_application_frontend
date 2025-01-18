/* eslint-disable @typescript-eslint/no-unused-vars */
// <============== component for showing the order history ============>
"use client";

// importing the required modules
import { userStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axiosInstance from "@/lib/axios/axiosInstance";
import { OrderItem } from "@/types/types";

const OrderHistory = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);
  const [isAnimating, setIsAnimating] = useState(true);
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: 1,
      date: "2025-01-17T10:30:00Z",
      total: 3000,
      status: "returned", // New status field
      items: [
        { id: 101, title: "Book Title 1", price: 1000, quantity: 1 },
        { id: 102, title: "Book Title 2", price: 2000, quantity: 1 },
      ],
    },
  ]);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    } else {
      const id = user?._id;
      fetchOrderHistory(id);
    }
  }, [isAuthorized, router, user?._id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsAnimating(false);
    }, 2000); // Adjust animation duration as needed

    return () => clearTimeout(timeoutId);
  }, []);

  const fetchOrderHistory = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`orders/${id}`);
      if (response.status === 200) {
        // setOrders(response.data.orders);
        console.log("response", response.data);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const handleContinueShopping = () => {
    router.push("/product");
  };

  const handleCancelOrder = (orderId: number) => {
    // Logic for canceling the order
    console.log(`Order ${orderId} has been canceled`);
  };

  const handleReturnOrder = (orderId: number) => {
    // Logic for returning the order
    console.log(`Order ${orderId} has been returned`);
  };

  const handleDownloadInvoice = (orderId: number) => {
    // Logic for downloading the invoice
    console.log(`Downloading invoice for Order ${orderId}`);
  };

  const getStatusProgressWidth = (status: string) => {
    // Calculate width based on status (replace with your logic)
    switch (status.toLowerCase()) {
      case "pending":
        return "20%";
      case "shipped":
        return "50%";
      case "out for delivery":
        return "80%";
      case "delivered":
        return "100%";
      case "canceled":
        return "100%";
      case "returned":
        return "100%";
      default:
        return "0%";
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-amber-500";
      case "shipped":
        return "bg-blue-600";
      case "out for delivery":
        return "bg-teal-500";
      case "delivered":
        return "bg-emerald-500";
      case "canceled":
        return "bg-rose-500";
      case "returned":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a237e] mb-8">
          Order History
        </h1>
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-2xl text-[#333333] mb-4">No orders found</p>
            <button
              onClick={handleContinueShopping}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow overflow-hidden p-6"
              >
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-[#333333]">
                    Order ID: {order.id}
                  </h3>
                  <p className="text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                {/* Order Items */}
                <div>
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b border-gray-200 pb-4 mb-4"
                    >
                      <Image
                        src="/placeholder.svg"
                        alt={item.title}
                        width={80}
                        height={120}
                        className="rounded-md mr-4"
                      />
                      <div className="flex-grow">
                        <h4 className="font-medium text-[#333333] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-[#d84315] font-bold">
                          ₹{item.price.toFixed(2)}
                        </p>
                        <p className="text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#333333]">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-[#d84315]">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>

                {/* Order Status */}
                <div className="mb-4 mt-10">
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-700 mr-2">
                      {order.status}
                    </span>
                    <div className="w-3/6 bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${getStatusProgress(
                          order.status
                        )} animate-gradient`}
                        style={{
                          width: getStatusProgressWidth(order.status),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 animate-pulse">
                    <p>Status is in progress...</p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                  {order.status !== "delivered" &&
                    order.status !== "canceled" && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full"
                      >
                        Cancel Order
                      </button>
                    )}
                  {order.status === "delivered" && (
                    <button
                      onClick={() => handleReturnOrder(order.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                    >
                      Return Order
                    </button>
                  )}
                  <button
                    onClick={() => handleDownloadInvoice(order.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;
