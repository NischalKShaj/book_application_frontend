// <=========================== file for adding the product =================>
"use client";

// importing the required modules
import React, { useState } from "react";
import Image from "next/image";
import { ProductUpload } from "@/types/types";
import Swal from "sweetalert2";
import axiosInstance from "@/lib/axios/axiosInstance";
import { useRouter } from "next/navigation";

const AddProduct = () => {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProductUpload>({
    bookName: "",
    bookDescription: "",
    amount: 0,
    stock: 0,
  });
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const router = useRouter();

  // for handling the image uploading
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);

    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };

  // for removing the image while uploading
  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // for submitting the file for the backend
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();

    data.append("bookName", formData.bookName);
    data.append("bookDescription", formData.bookDescription);
    data.append("amount", formData.amount.toString());
    data.append("stock", formData.stock.toString());
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      const response = await axiosInstance.post("/admin/products/add", data);

      if (response.status === 201) {
        Swal.fire({
          title: "success",
          text: "product added successfully",
          icon: "success",
        });
        router.push("/admin/product");
      }
    } catch (error) {
      console.error("error while uploading", error);
      Swal.fire({
        title: "Error",
        text: "oops something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className="max-w-4xl mt-11 mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#1a237e] mb-6">Add New Book</h1>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-medium">
              Book Title
            </label>
            <input
              id="title"
              placeholder="Enter book title"
              required
              onChange={handleInputChange}
              name="bookName"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter book description"
              rows={4}
              required
              onChange={handleInputChange}
              name="bookDescription"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">
              Price
            </label>
            <input
              id="price"
              type="number"
              placeholder="Enter price"
              name="amount"
              min="0"
              step="0.01"
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price" className="mb-1 font-medium">
              Stock
            </label>
            <input
              id="stock"
              type="number"
              placeholder="Enter the stock of the product"
              min="0"
              name="stock"
              onChange={handleInputChange}
              step="0.01"
              required
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="images" className="mb-1 font-medium">
              Book Images
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <Image
                    src={url}
                    alt={`Book preview ${index + 1}`}
                    width={32}
                    height={32}
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                    aria-label={`Remove image ${index + 1}`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-2 text-lg rounded-md"
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
