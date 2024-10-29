// <============================ component for showing the products ========================>

// importing the required modules
import React from "react";
import Header from "../partials/header/Header";
import Footer from "../partials/footer/Footer";
import Image from "next/image";

const ProductComponent = () => {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-[#1a237e] mb-4">
            Bestsellers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((book) => (
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
                  <button className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-md">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductComponent;
