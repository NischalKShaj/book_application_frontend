// <================================ component for showing the home ================>

// importing the required modules
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SpinnerWrapper from "../partials/spinner/SpinnerWrapper";
import axiosInstance from "@/lib/axios/axiosInstance";

const HomeComponent = () => {
  const router = useRouter();

  // for moving to the product page
  const handleProduct = () => {
    router.push("/product");
  };

  // for adding the product to the cart
  const handleCart = async () => {
    try {
      const response = await axiosInstance.post("/cart/add-item");
      if (response.status === 202) {
        console.log("response", response.data);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <SpinnerWrapper>
        <main className="container mx-auto px-4 py-8">
          <section className="mb-12">
            <div className="bg-[#f5e6d3] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h1 className="text-4xl font-bold text-[#1a237e] mb-4">
                  Welcome to BookHaven
                </h1>
                <p className="text-[#333333] mb-4 text-2xl">
                  Discover your next favorite book from <br />
                  our vast collection.
                </p>
                <button
                  onClick={handleProduct}
                  className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-full"
                >
                  Explore Books
                </button>
              </div>
              <div className="w-full md:w-1/3">
                <Image
                  src="/placeholder.svg"
                  alt="Books collection"
                  width={300}
                  height={200}
                  className="rounded-lg drop-shadow-2xl bg-white"
                />
              </div>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1a237e] mb-4">
              Bestsellers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((book) => (
                <div
                  key={book}
                  className="bg-white rounded-lg shadow overflow-hidden"
                >
                  <Image
                    src="/placeholder.svg"
                    alt="Book_name"
                    width={150}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-[#333333] mb-2">
                      Book Title {book}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">Author Name</p>
                    <button
                      onClick={handleCart}
                      className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-md"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </SpinnerWrapper>
    </div>
  );
};

export default HomeComponent;
