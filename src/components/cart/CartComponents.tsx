/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Swal from "sweetalert2";

const CartComponents = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const maxChars = 50;

  // function for loading the cart contents of the user
  const loadCart = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/cart/${id}`);
      if (response.status === 200) {
        console.log("response of the loadCart", response.data);
        console.log("response", response.data.cart);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedCart = response.data.cart.map((item: any) => ({
          id: item._id,
          title: item.bookName,
          productId: item.productId,
          price: item.amount,
          description: item.bookDescription,
          quantity: item.quantity,
          images: item.images,
        }));
        setCartItems(transformedCart);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // for toggling the read-more
  const toggleReadMore = (id: string | number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expansion for the clicked item
    }));
  };

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    } else {
      const id = user?._id;
      loadCart(id).finally(() => setIsLoading(false));
    }
  }, [isAuthorized, router, user?._id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // function for handling the quantity change
  const handleQuantityChange = async (id: number, change: number) => {
    // Ensure id is always a string

    const cartItem = cartItems.find((item) => item.id === id);
    const productId = cartItem?.productId;

    // Update cart items
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

    try {
      const response = await axiosInstance.patch("/update-cart-quantity", {
        userId: user?._id,
        productId: productId,
        cartId: id,
        quantity: change,
      });

      if (response.status === 200) {
        console.log("response", response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
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

  // function for clearing the particular product from the cart
  const clearItem = async (id: number) => {
    try {
      const cartId = id.toString();
      const userId = user?._id;
      console.log("userid", userId);
      const response = await axiosInstance.delete(
        `/remove-item/${cartId}/${userId}`
      );
      if (response.status === 202) {
        console.log("item removed", response.data);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        Swal.fire({
          title: "Item removed successfully!",
          text: "The item is removed from your cart. Enjoy shopping with us.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("error", error);
      Swal.fire({
        title: "Item removal failed!",
        text: "Failed to remove the item from the cart.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1a237e] mb-8 text-center sm:text-left">
          Your Cart
        </h1>

        {cartItems?.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-xl sm:text-2xl text-[#333333] mb-4">
              Your cart is empty
            </p>
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
                  className="flex flex-col sm:flex-row items-center border-b border-gray-200 p-4"
                >
                  {/* Image */}
                  <div className="w-full sm:w-1/4 mb-4 sm:mb-0 flex justify-center">
                    <Image
                      src={item.images[1]}
                      alt={item.title}
                      width={200}
                      height={260}
                      className="rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="sm:w-1/2 text-center sm:text-left">
                    <h3 className="font-bold text-[#333333] mb-1">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="font-medium text-gray-600 mb-1 text-sm">
                      {expandedItems[item.id]
                        ? item.description
                        : `${item.description.slice(0, maxChars)}...`}
                      {item.description.length > maxChars && (
                        <button
                          onClick={() => toggleReadMore(item.id)}
                          className="text-[#d84315] font-semibold ml-1"
                        >
                          {expandedItems[item.id] ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>

                    <p className="text-[#d84315] font-bold text-lg">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity & Actions */}
                  <div className="flex items-center mt-4 sm:mt-0">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity === 1}
                      className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-l ${
                        item.quantity === 1
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
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

                    {/* Remove Button */}
                    <button
                      onClick={() => clearItem(item.id)}
                      className="flex items-center text-red-600 hover:text-red-800 ml-4"
                    >
                      <Trash2 size={18} className="mr-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 text-center sm:text-left">
                <span className="text-xl font-semibold text-[#333333]">
                  Total:
                </span>
                <span className="text-2xl font-bold text-[#d84315] mt-2 sm:mt-0">
                  ₹{getTotalPrice()}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4">
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-200 hover:bg-gray-300 text-[#333333] px-6 py-3 text-lg rounded-full w-full sm:w-auto"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleCheckoutPage}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full w-full sm:w-auto"
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
