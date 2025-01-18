// file to create the cart component
"use client";

// importing the required modules
import { userStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CartItem } from "@/types/types";
import { Trash2 } from "lucide-react";
import axiosInstance from "@/lib/axios/axiosInstance";

const CartComponents = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Book Title 1",
      price: 1000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Book Title 2",
      price: 2000,
      quantity: 2,
    },
  ]);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    } else {
      const id = user?._id;
      loadCart(id);
    }
  }, [isAuthorized, router, user?._id]);

  // function for loading the cart contents of the user
  const loadCart = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`cart/${id}`);
      if (response.status === 200) {
        console.log("response", response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleContinueShopping = () => {
    router.push("/product");
  };

  // function for proceeding to the checkout page
  const handleCheckoutPage = () => {
    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a237e] mb-8">Your Cart</h1>
        {cartItems?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-2xl text-[#333333] mb-4">Your cart is empty</p>
            <button
              onClick={handleContinueShopping}
              className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              {cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 p-4"
                >
                  <Image
                    src="/placeholder.svg"
                    alt={item.title}
                    width={80}
                    height={120}
                    className="rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-[#333333] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[#d84315] font-bold">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="bg-gray-100 px-4 py-1">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="bg-gray-200 text-gray-600 px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button className="flex items-center text-red-600 hover:text-red-800 ml-4">
                      <Trash2 size={18} className="mr-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-semibold text-[#333333]">
                  Total:
                </span>
                <span className="text-2xl font-bold text-[#d84315]">
                  ₹{getTotalPrice()}
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-200 hover:bg-gray-300 text-[#333333] px-6 py-3 text-lg rounded-full"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckoutPage}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default CartComponents;
