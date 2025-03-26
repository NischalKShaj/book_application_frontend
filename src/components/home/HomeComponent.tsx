// <================================ component for showing the home ================>

// importing the required modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SpinnerWrapper from "../partials/spinner/SpinnerWrapper";
import axiosInstance from "@/lib/axios/axiosInstance";
import { Product } from "@/types/types";

type Products = Product[];

const HomeComponent = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Products>([]);

  // array for the quotes for showing in the page
  const quotes = [
    "സത്യം അറിയുക, സത്യം പ്രചരിപ്പിക്കുക.",
    "വിനയം വിദ്യയുടെ ആഭരണമാണ്.",
    "മനുഷ്യൻ മനുഷ്യനെ സ്നേഹിക്കണം.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

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

  // use effect for fetching the data
  useEffect(() => {
    fetchData();
  }, []);

  // use effect for the quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // Change quote every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [quotes.length]);

  // for moving to the product page
  const handleProduct = () => {
    router.push("/product");
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
                <div className="bg-white rounded-lg shadow-lg border border-[#d4bfa5] h-[200px] w-[300px] flex items-center justify-center p-4">
                  <p className="text-2xl italic text-center text-[#4a4a4a]">
                    {quotes[currentQuoteIndex]}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-[#1a237e] mb-4">
              Bestsellers
            </h2>
            <div
              onClick={handleProduct}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {products.slice(0, 4).map((book) => (
                <div
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
                    <h3 className="font-bold text-lg text-[#333333] mb-2">
                      {book.bookName}
                    </h3>
                    <p className="text-lg text-gray-600 mb-2">
                      ₹ {book.amount}
                      <span className="text-sm px-1">M.R.P</span>
                    </p>
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
