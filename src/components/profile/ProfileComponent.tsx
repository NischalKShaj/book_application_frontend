/* eslint-disable @typescript-eslint/no-explicit-any */
// <============================ component for the profile ===============>
"use client";

// importing the required modules
import React, { useEffect, useState } from "react";
import Sidebar from "../partials/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";
import axiosInstance from "@/lib/axios/axiosInstance";
import Image from "next/image";

const ProfileComponent = () => {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const [recentOrders, setRecentOrders] = useState<
    {
      image: string;
      productName: string;
      quantity: number;
      totalAmount: number;
    }[]
  >([]);

  const [recentAddresses, setRecentAddresses] = useState<
    {
      addresseeName: string;
      addresseePhone: string;
      fullAddress: string;
      locality: string;
      city: string;
      state: string;
      pincode: number;
    }[]
  >([]);

  // for getting the last ordered 3 address and last ordered 3 products
  useEffect(() => {
    const id = user?._id;
    getProducts(id);
  }, [user?._id]);

  // function for getting the last 3 address and last ordered 3 products
  const getProducts = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`/profile-data/${id}`);
      if (response.status === 202) {
        const { addresses, orders } = response.data;
        const formattedOrders = orders.flatMap((order: any) =>
          order.products.map((product: any) => ({
            image:
              product.images?.[0] ||
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACUCAMAAACp1UvlAAAAMFBMVEXk5ueutLepsLPZ3N7n6erg4uPKztC3vL++w8W7wMPHy83V2NqzubzP0tTc3+DCxskfOlAIAAADRklEQVR4nO2bwXKEIAxAEQMqCP7/3xbdrV23XSXRBKfDu7SHzvRNDBBDVKpSqVQqlUqlUqlUKpVK5V8AsP4Cu38oCUD0duqHRO+sV7dQAxVd12wYg1GF1UCFQevmDa17X1IMlH9XWunaYmYQh1+heglab8qYgf0s9aDMw+x3gvUMmSsgNh5ZLc9S2irmaCWxQTZiJstKPGKmOzZaxeQiBnv7wy8xKyUGAaGV8EJeEWWVkAkY5C3FH2S2MexTnIkCXgYbLpk1SQlXow2/F94qMXEHDFpCuFIJyx0w6Enx0oHZi5D1C9zntyc9xhQwXi1wVC/e2hW916/wrkgghislGKeWimQv1p0CqGmfvDjPSLBkr6bl9HJkLc1ZHRJ3e36vie7FeRL9x3ixet017++6T9x0X73rOXTm3L5pncP8bktNfM3cBibX0cz1PaLztYH7jfuu72lA2ynY32uJK5K9D0DLfOa3xwf4zBfp/RI6J/zZtYh1SDGpjjS27zsKNcqxLUPOymsrNmHuFSRv+xD3MAJb1wu5u6v0FWRm31D6ni+Rs1sUubDNuEcWu0p7BcL+s9RjLDQQYHbnFFyhOYXZrP2wYeim1PTEU0z5P+dgpnLTJj9qdhibp5xOP8fBlx4begBg2rAMWvWTDa25xZzVAmwobTMze8ToQ7Buxobg26hK2qV/nB7f9PeCHHvroxGfnEv/r7V9t6T5p+1L67F3kkN9oEzIf7vtbJRYnSmb7NBg6lWtO+e5o2Y8rT8xOsZRSDBupPbl0sHEdQTEgei0Bo3hHIB4XG4dB224+B0EDP1CYcuV46MAFrUCd9HTVQXQxyKLSrhE7HhMFcsVE7dgsF2SLM7mP7QMUs3pFzjSUFWe2Jm5BfJ0SQ4dOclQbRs8I1GMWYsqxq5F67uy5tY3HV6LbSVuwLahuPatd9AdH/L9J1YMVV8I5PwKRuvz5zfX4xBiFxc2+2S3989MbxDosjNM0qrJLnquLwQPyC0tpPaIb3RehtFncKhkXZuC6GJ8kHN+Z3+ydCEZpxGEAl45H2Vd9WaNIacQK5BeOSuyRHo1+vgVnPb9xlmOL3Vl6tR3DuvWVHmV4PgTttgW4UirUqlUKpWKUl/lWSnkmIvaNgAAAABJRU5ErkJggg==", // First image from each product
            productName: product.bookName || "Unknown Product",
            quantity: product.quantity || 0,
            totalAmount: product.amount || 0, // Individual product amount
          }))
        );
        console.log("orders", formattedOrders);
        setRecentAddresses(addresses);
        setRecentOrders(formattedOrders);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // for moving to the product page
  const handleProductPage = () => {
    router.push("/product");
  };
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mt-10 mr-10 bg-gray-100 p-10">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* Profile Overview */}

        {/* Order History */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            🛍️ Recently Ordered Items
          </h2>
          <div className="flex flex-row space-x-8">
            {recentOrders.map((orders, index) => (
              <div
                key={index}
                className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <Image
                  className="p-8 rounded-t-lg"
                  src={orders.image}
                  width={200}
                  height={200}
                  alt="product image"
                />

                <div className="px-5 pb-5">
                  <a href="#">
                    <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {orders.productName}
                    </h5>
                  </a>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      Quantity: {orders.quantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      Total Amount: {orders.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {recentOrders.length === 0 && (
            <p className="text-gray-600">
              No recent orders.{" "}
              <span
                onClick={handleProductPage}
                className="text-blue-500 cursor-pointer"
              >
                Shop now
              </span>
            </p>
          )}
        </div>

        {/* Address Management */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            🏡 Last Delivery Addresses
          </h2>

          {recentAddresses.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {recentAddresses.map((address, index) => (
                <div
                  key={index}
                  className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5"
                >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-4">
                    Delivery Details
                  </h5>
                  <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                    <li>
                      <span className="font-semibold">Receiver Name: </span>
                      {address.addresseeName}
                    </li>
                    <li>
                      <span className="font-semibold">Contact Number: </span>
                      {address.addresseePhone}
                    </li>
                    <li>
                      <span className="font-semibold">Full Address: </span>
                      {address.fullAddress}
                    </li>
                    <li>
                      <span className="font-semibold">Locality: </span>
                      {address.locality}
                    </li>
                    <li>
                      <span className="font-semibold">City: </span>
                      {address.city}
                    </li>
                    <li>
                      <span className="font-semibold">State: </span>
                      {address.state}
                    </li>
                    <li>
                      <span className="font-semibold">Pincode: </span>
                      {address.pincode}
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">
              No recent orders.{" "}
              <span
                onClick={handleProductPage}
                className="text-blue-500 cursor-pointer"
              >
                Shop now
              </span>
            </p>
          )}
        </div>

        {/* Wishlist */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
          <p className="text-gray-600">
            Your wishlist is empty.{" "}
            <span
              onClick={handleProductPage}
              className="text-blue-500 cursor-pointer"
            >
              Browse products
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
