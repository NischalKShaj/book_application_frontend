// <============================= file to show the single product page ===============>
"use client";

// importing the required modules
import axiosInstance from "@/lib/axios/axiosInstance";
import { Product } from "@/types/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const SingleProductComp = ({ id }: { id: string }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState("");
  const user = userStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/product/${id}`);
        if (response.status === 200) {
          setProduct(response.data.product);
          setMainImage(response.data.product.images[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  // function for adding to the cart
  const addToCart = async () => {
    try {
      const response = await axiosInstance.post("/cart/add-item", {
        productId: product._id,
        userId: user?._id,
        quantity: 1,
      });
      if (response.status === 201) {
        console.log("product added to cart");
        console.log("response", response);
        router.push("/cart");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="md:flex gap-8">
            {/* Main Image Section */}
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="w-full h-[500px] flex items-center justify-center bg-gray-100 rounded-lg">
                <Image
                  src={mainImage || ""}
                  alt={product.bookName}
                  width={400}
                  height={500}
                  className="rounded-lg object-cover h-full w-full"
                />
              </div>

              {/* Thumbnail Section */}
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`border-2 p-1 rounded ${
                      mainImage === image
                        ? "border-[#d84315]"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-[#1a237e] mb-4">
                  {product.bookName}
                </h2>
                <p className="text-lg text-[#333333] mb-6">
                  {product.bookDescription}
                </p>
                <p className="text-[#d84315] font-bold text-2xl mb-2">
                  Price: ₹{product.amount}
                </p>
                <p className="text-gray-600 text-lg mb-6">
                  Stock: {product.stock}
                </p>
              </div>
              <button
                onClick={addToCart}
                className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white font-bold py-3 px-6 rounded-lg mt-6"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SingleProductComp;
