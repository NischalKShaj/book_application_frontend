/* eslint-disable @typescript-eslint/no-explicit-any */
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

type Order = {
  id: string;
  date: string;
  status: string;
  total: number;
  items: {
    id: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    images: string[];
  }[];
};

const OrderHistory = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);
  const [isAnimating, setIsAnimating] = useState(true);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{
    orderId: number;
    orderStatus: string;
  } | null>(null);

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

  // function for transforming the data according to the response
  const transformOrders = (apiOrders: any) => {
    return apiOrders.map((order: any) => ({
      id: order._id,
      date: order.createdAt,
      status: order.status,
      total: order.totalAmount,
      trackingId: order.trackingId,
      items: order.products.map((product: any) => ({
        id: product.productId,
        title: product.bookName,
        image: product.images,
        price: product.amount,
        quantity: product.quantity,
        images: product.images,
      })),
    }));
  };

  // for fetching the order history for the user
  const fetchOrderHistory = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`);
      if (response.status === 202) {
        setOrders(transformOrders(response.data.data));
        console.log("response", response.data.data);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  const handleContinueShopping = () => {
    router.push("/product");
  };

  // function for returning the order
  const handleTrackOrder = (trackingId: string) => {
    try {
      const trackingUrl = `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx?articleNumber=${trackingId}`;
      window.open(trackingUrl, "_blank");
    } catch (error) {
      console.error("error", error);
    }
  };

  // function for downloading the invoice for the orders
  const handleDownloadInvoice = async (orderId: number) => {
    const userId = user?._id;
    // Logic for downloading the invoice
    try {
      const response = await axiosInstance.get(
        `/order/invoice/${orderId}/${userId}`,
        { responseType: "arraybuffer" }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "invoice.pdf";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("error", error);
    }
  };

  const getStatusProgressWidth = (status: string) => {
    // Calculate width based on status (replace with your logic)
    switch (status.toLowerCase()) {
      case "order received":
        return "33%";
      case "shipped":
        return "66%";
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
      case "order received":
        return "bg-amber-500";
      case "shipped":
        return "bg-blue-600";
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
                    Order ID: #{order.id}
                  </h3>
                  {order.trackingId != "No id found" && (
                    <h3 className="text-lg font-medium text-[#333333]">
                      Tracking ID: #{order.trackingId}
                    </h3>
                  )}
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
                        src={item.image[0]}
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
                  <div className="mt-2 text-sm text-gray-500">
                    <p>
                      {order.status === "Order Received"
                        ? "Your order has been placed successfully."
                        : order.status === "shipped"
                        ? "Your order is on the way."
                        : order.status === "delivered"
                        ? "Your order has been delivered."
                        : order.status === "canceled"
                        ? "This order has been canceled."
                        : "Processing your order..."}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex space-x-4">
                  {order.status === "shipped" && (
                    <button
                      onClick={() => handleTrackOrder(order.trackingId)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
                    >
                      Track Order
                    </button>
                  )}
                  {order.status == "delivered" && (
                    <button
                      onClick={() => handleDownloadInvoice(order.id)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full"
                    >
                      Download Invoice
                    </button>
                  )}
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
