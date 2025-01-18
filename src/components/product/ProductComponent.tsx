// <============================ component for showing the products ========================>

"use client";
// importing the required modules
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/types";
import axiosInstance from "@/lib/axios/axiosInstance";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type Products = Product[];

const ProductComponent = () => {
  const [products, setProducts] = useState<Products>([]);
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, []);

  // for fetching the data from the backend
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/products");
      if (response.status === 202) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // for moving to the individual page
  const singleProduct = (id: string) => {
    console.log("Navigating to:", `/product/${id}`);
    router.push(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a237e] mb-4">
            Bestsellers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((book) => (
              <div
                onClick={() => singleProduct(book._id)}
                key={book._id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <Image
                  src={book.images[0]}
                  alt={book.bookName}
                  width={150}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-[#333333] mb-2">
                    Book Title {book.bookName}
                  </h3>
                  <h3 className="font-medium text-[#333333] mb-2">
                    Price {book.amount}
                  </h3>

                  {/* Button or Cart Icon */}
                  <div className="flex items-center justify-between">
                    {/* Show button on larger screens, cart icon on smaller screens */}
                    <button className="hidden sm:block w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-md">
                      Add to Cart
                    </button>

                    <div className="sm:hidden">
                      <ShoppingCart
                        size={24} // size of the icon
                        color="#d84315" // icon color
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductComponent;
