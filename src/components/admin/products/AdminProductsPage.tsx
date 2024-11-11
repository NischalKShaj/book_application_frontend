// <======================= file to show the products in the admin side ====================>

"use client";
// importing the required modules
import React, { useEffect, useState } from "react";
import AdminHeader from "@/components/partials/header/AdminHeader";
import { Product } from "@/types/types";
import { adminStore } from "@/store/adminStore";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";

type Products = Product[];

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Products>([]);
  const router = useRouter();
  const isAuthorized = adminStore((state) => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    } else {
      router.push("/admin/login");
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/admin/products");
      if (response.status === 202) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-6">
          Product Management
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.bookName}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No image available
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-[#1a237e] mb-2">
                    {product.bookName}
                  </h2>
                  <p className="text-gray-600 mb-2 line-clamp-2">
                    {product.bookDescription}
                  </p>
                  <p className="text-[#d84315] font-bold mb-2">
                    Price: ${product.amount}
                  </p>
                  <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
                  <div className="flex justify-between">
                    <button className="flex items-center text-blue-600 hover:text-blue-800">
                      <Edit size={18} className="mr-1" /> Edit
                    </button>
                    <button className="flex items-center text-red-600 hover:text-red-800">
                      <Trash2 size={18} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products available
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminProductsPage;
