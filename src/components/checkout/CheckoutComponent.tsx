/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { loadScript } from "@/lib/razorpay";

const CheckoutComponent = () => {
  const router = useRouter();
  const isAuthorized = userStore((state) => state.isAuthorized);
  const user = userStore((state) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [expandedItems, setExpandedItems] = useState<{
    [key: string]: boolean;
  }>({});
  const maxChars = 50;

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login");
    } else {
      const id = user?._id;
      loadCart(id);
      loadAddress(id);
    }
  }, [isAuthorized, router, user?._id]);

  // for toggling the read-more
  const toggleReadMore = (id: string | number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle expansion for the clicked item
    }));
  };

  // function for loading the cart data
  const loadCart = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`cart/${id}`);
      if (response.status === 200) {
        console.log("response", response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transformedCart = response.data.cart.map((item: any) => ({
          id: item._id,
          title: item.bookName,
          price: item.amount,
          description: item.bookDescription,
          quantity: item.quantity,
          images: item.images,
        }));
        setCartItems(transformedCart);
      }
    } catch (error) {
      console.error("error", error);
      setCartItems([]);
    }
  };

  // function for getting the address
  const loadAddress = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/address/${id}`);
      if (response.status === 200) {
        console.log("response", response.data);
        const transformedAddress = response.data.addresses.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (address: any) => ({
            _id: address._id, // Ensure the ID is mapped correctly
            addresseeName: address.addresseeName,
            addresseePhone: address.addresseePhone,
            fullAddress: address.fullAddress,
            locality: address.locality,
            state: address.state,
            city: address.city,
            pincode: address.pincode,
          })
        );
        setAddresses(transformedAddress);
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

  // api for invoking the handlePlaceOrder
  const checkMaxOrder = async () => {
    try {
      const response = await axiosInstance.get("/check-max-order");
      if (response.status === 200) {
        await handlePlaceOrder();
      }
    } catch (error) {
      console.error("error", error);
      SweetAlert.fire({
        title: "Max Orders Reached!",
        text: "We're sorry! The maximum number of orders for today has been reached. Please try again tomorrow.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
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
      const onlinePaymentData = {
        userId: user?._id,
        amount: parseFloat(getTotalPrice()),
        username: user?.username,
        email: user?.email,
        phone: user?.phoneNumber,
      };

      const response = await axiosInstance.post("/online-payment", {
        amount: parseFloat(getTotalPrice()),
        userId: user?._id,
        username: user?.username,
        email: user?.email,
        phone: user?.phoneNumber,
      });

      const scriptLoaded = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script");
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: response.data.amount,
        currency: response.data.currency,
        name: "application name",
        description: `Payment for ${user?.username}`,
        order_id: response.data.id,

        handler: async function (response: any) {
          try {
            const verification = await axiosInstance.post(
              `/api/payment-success`,
              { orderData, response }
            );
            if (verification.data.success) {
              SweetAlert.fire({
                title: "Payment Success!",
                text: "Thank you for your order. We'll notify you once your order is on its way. If you have any questions, feel free to contact us.",
                icon: "success",
                confirmButtonText: "OK",
              });
              router.push("/cart");
            } else {
              SweetAlert.fire({
                title: "Payment Failed!",
                text: "Your payment has been rejected!",
                icon: "warning",
                confirmButtonText: "OK",
              });
            }
          } catch (error) {
            SweetAlert.fire({
              title: "Payment Failed!",
              text: "Your payment has been rejected!",
              icon: "warning",
              confirmButtonText: "OK",
            });
          }
        },

        theme: {
          color: "#1a202c",
        },
      };
      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (error: any) {
      if (error.response?.status === 400) {
        SweetAlert.fire({
          title: "Max Orders Reached!",
          text: "We're sorry! The maximum number of orders for today has been reached. Please try again tomorrow.",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        SweetAlert.fire({
          title: "Payment Failed!",
          text: "Oops! Something went wrong while processing your payment. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  // function for opening the modal for adding the new address
  const handleAddAddress = () => {
    setOpenModal(true);
  };

  // showing the added address
  const handleAddressAdded = () => {
    const id = user?._id;
    loadAddress(id);
    setOpenModal(false);
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
                <div key={address._id} className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="address"
                      value={address._id}
                      checked={selectedAddress === address._id}
                      onChange={() => setSelectedAddress(address._id)}
                      className="mr-2"
                    />
                    <span>
                      {address.addresseeName}
                      <br />
                      {address.fullAddress}, {address.city}, {address.state}
                      <br />
                      {address.addresseePhone}
                      <br />
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
                  <AddressModal
                    onClose={() => setOpenModal(false)}
                    onAddressAdded={handleAddressAdded}
                    address={address}
                  />
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
                    value="Online Payment"
                    checked={paymentMethod === "Online Payment"}
                    onChange={() => setPaymentMethod("Online Payment")}
                    className="mr-2"
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h2 className="text-2xl font-semibold text-[#333333] mb-4 text-center md:text-left">
              Order Summary
            </h2>
            <div className="bg-white rounded-lg shadow overflow-hidden p-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center md:items-start border-b border-gray-200 p-4 gap-4"
                >
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={200}
                    height={260}
                    className="rounded-md w-full md:w-[120px] lg:w-[150px] object-cover"
                  />
                  <div className="flex flex-col flex-grow text-center md:text-left">
                    <h3 className="font-bold text-lg text-[#333333]">
                      {item.title}
                    </h3>
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
                    <p className="text-sm text-gray-600 mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="text-[#d84315] font-bold text-lg">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="p-4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-[#333333]">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-[#d84315]">
                    ₹{getTotalPrice()}
                  </span>
                </div>
                <button
                  onClick={checkMaxOrder}
                  className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full transition duration-300 ease-in-out"
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
