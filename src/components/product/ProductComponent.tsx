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
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  // for fetching the data from the backend
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/products", {
        params: { page: pageNumber },
      });
      if (response.status === 202) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
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
          {products ? (
            <>
              <div className="grid grid-cols-4 md:grid-cols-4 gap-6 cursor-pointer">
                {products.map((book) => (
                  <div
                    onClick={() => singleProduct(book._id)}
                    key={book._id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <div className="relative h-96 bg-gray-200">
                      <Image
                        src={book.images[0]}
                        alt="Book_name"
                        width={150}
                        height={400}
                        className="w-full h-[400px] object-fit"
                      />
                    </div>
                    <div className="p-4 bg-gray-100">
                      <h3 className="font-medium text-[#333333] mb-2">
                        Book Title {book.bookName}
                      </h3>
                      <h3 className="font-medium text-[#333333] mb-2">
                        ₹ {book.amount}/-
                      </h3>

                      {/* Button or Cart Icon */}
                      <div className="flex items-center justify-between">
                        {/* Show button on larger screens, cart icon on smaller screens */}
                        <div className="sm:hidden">
                          <ShoppingCart
                            size={24}
                            color="#d84315"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Buttons */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handlePreviousPage}
                  disabled={pageNumber === 1}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-4 py-2 rounded-md mr-2"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-4 py-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <div>❌ No products available</div>
              <div className="flex justify-center mt-8">
                <button
                  onClick={handlePreviousPage}
                  disabled={pageNumber === 1}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-4 py-2 rounded-md mr-2"
                >
                  Previous
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProductComponent;
