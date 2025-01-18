/* eslint-disable @typescript-eslint/no-unused-vars */
// <====================== component for checkout page ============>
"use client";

// importing the required modules
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import axiosInstance from "@/lib/axios/axiosInstance";
import Image from "next/image";
import SweetAlert from "sweetalert2";
import { Address, CartItem } from "@/types/types";
import AddressModal from "../modal/AddressModal";

const CheckoutComponent = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
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
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      fullAddress: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      locality: "test",
    },
    {
      id: 2,
      fullAddress: "456 Park Ave",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      locality: "test",
    },
  ]);

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    } else {
      const id = user?._id;
      loadCart(id);
      loadAddress(id);
    }
  }, [isAuthorized, router, user?._id]);

  // function for loading the cart data
  const loadCart = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`cart/${id}`);
      if (response.status === 200) {
        console.log("response", response.data);
        // const data = Array.isArray(response.data) ? response.data : [];
        // setCartItems(data);
      }
    } catch (error) {
      console.error("error", error);
      // setCartItems([]);
    }
  };

  // function for getting the address
  const loadAddress = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/address/${id}`);
      if (response.status === 200) {
        console.log("response", response.data);
        // const data = Array.isArray(response.data) ? response.data : [];
        // setAddresses(data);
      }
    } catch (error) {
      console.error("error", error);
      // setAddresses([]);
    }
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // function for placing the order for the products
  const handlePlaceOrder = async () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please select an address and payment method");
      return;
    }

    try {
      const orderData = {
        userId: user?._id,
        addressId: selectedAddress,
        paymentMethod: paymentMethod,
        items: cartItems,
        totalAmount: parseFloat(getTotalPrice()),
      };

      const response = await axiosInstance.post(
        "/cart/confirm-order",
        orderData
      );
      if (response.status === 201) {
        router.push("/order-confirmation");
        SweetAlert.fire({
          title: "Order Placed Successfully!",
          text: "Thank you for your order. We'll notify you once your order is on its way. If you have any questions, feel free to contact us.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error placing order:", error);
      SweetAlert.fire({
        title: "Order Failed!",
        text: "Oops! Something went wrong while placing your order. Please try again later or contact support if the issue persists.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  // function for opening the modal for adding the new address
  const handleAddAddress = () => {
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-[#1a237e] mb-8">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">
              Shipping Address
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              {addresses.map((address) => (
                <div key={address.id} className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="mr-2"
                    />
                    <span>
                      {address.fullAddress}, {address.city}, {address.state}{" "}
                      {address.pincode}
                    </span>
                  </label>
                </div>
              ))}
              <button
                onClick={handleAddAddress}
                className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
              >
                Add Address
              </button>
              {openModal && (
                <div>
                  <AddressModal onClose={() => setOpenModal(false)} />
                </div>
              )}
            </div>

            <h2 className="text-2xl font-semibold text-[#333333] mt-8 mb-4">
              Payment Method
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4"></div>
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                    className="mr-2"
                  />
                  <span>UPI</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cash_on_delivery"
                    checked={paymentMethod === "cash_on_delivery"}
                    onChange={() => setPaymentMethod("cash_on_delivery")}
                    className="mr-2"
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-[#333333] mb-4">
              Order Summary
            </h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b border-gray-200 p-4"
                >
                  <Image
                    src="/placeholder.svg"
                    alt={item.title}
                    width={60}
                    height={90}
                    className="rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h3 className="font-medium text-[#333333] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#d84315] font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-[#333333]">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-[#d84315]">
                    ₹{getTotalPrice()}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutComponent;
