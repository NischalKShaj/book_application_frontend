/* eslint-disable @typescript-eslint/no-unused-vars */
// <======================= file to show the products in the admin side ====================>

"use client";
// importing the required modules
import React, { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { adminStore } from "@/store/adminStore";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import EditProduct from "@/components/modal/EditProduct";
import Swal from "sweetalert2";

type Products = Product[];

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Products>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();
  const isAuthorized = adminStore((state) => state.isAuthorized);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>({
    _id: "",
    bookName: "",
    bookDescription: "",
    amount: 0,
    stock: 0,
    images: [],
  });

  useEffect(() => {
    if (isAuthorized) {
      fetchData();
    } else {
      router.push("/admin/login");
    }
  }, [pageNumber]);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/admin/products", {
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

  // for updating the product
  const updateProductInState = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  };

  // for getting the particular product
  const getProduct = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/admin/product/${id}`);
      if (response.status === 202) {
        console.log("response", response.data.product);
        return response.data.product;
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // for editing the product
  const editProduct = async (id: string) => {
    const product = await getProduct(id);
    console.log("response while opening", product);
    setOpenModal(true);
    setSelectedProduct(product);
  };

  // for deleting the product
  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete/product/${id}`
      );
      if (response.status === 200) {
        Swal.fire({
          title: "Deleted",
          text: "Product deleted successfully",
          icon: "success",
        });
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      Swal.fire({
        title: "Failure",
        text: "Oops something went wrong",
        icon: "warning",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-6">
          Product Management
        </h1>
        <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products ? (
            products.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-96 bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[1]}
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
                    <button
                      onClick={() => editProduct(product._id)}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="flex items-center text-red-600 hover:text-red-800"
                    >
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
            disabled={!products}
            className={`flex items-center gap-2 px-4 py-2 rounded-md 
    ${
      products
        ? "bg-[#d84315] hover:bg-[#bf360c] text-white"
        : "bg-gray-400 cursor-not-allowed"
    }`}
          >
            Next
          </button>
        </div>
        {openModal && (
          <div>
            <EditProduct
              onClose={() => {
                setOpenModal(false);
                fetchData();
              }}
              product={selectedProduct}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProductsPage;
