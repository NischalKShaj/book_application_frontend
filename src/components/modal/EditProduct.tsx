// <================== file to edit the product =============>

// importing the required modules
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product, ProductUpload } from "@/types/types";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios/axiosInstance";
import Swal from "sweetalert2";

const EditProduct = ({
  onClose,
  product,
}: {
  onClose: () => void;
  product: Product | null;
}) => {
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductUpload>({
    bookName: "",
    bookDescription: "",
    amount: 0,
    stock: 0,
  });

  const router = useRouter();

  // ✅ Populate formData and existing images when product is received
  useEffect(() => {
    if (product) {
      setFormData({
        bookName: product.bookName,
        bookDescription: product.bookDescription,
        amount: product.amount,
        stock: product.stock,
      });

      setExistingImages(product.images || []);
    }
  }, [product]);

  // ✅ Handle text input changes
  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // ✅ Handle new image uploads (limit to 2 total images)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    // Get total count of images (existing + new)
    const totalImages = existingImages.length + images.length;

    // ✅ If adding these files exceeds 2 images, show error
    if (totalImages + files.length > 2) {
      Swal.fire({
        title: "Limit Reached",
        text: "You can only upload 2 images",
        icon: "warning",
      });
      return;
    }

    // ✅ Add new images
    setImages((prevImages) => [...prevImages, ...files]);
    const newImageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prevUrls) => [...prevUrls, ...newImageUrls]);
  };

  // ✅ Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // ✅ Remove newly uploaded image
  const removeNewImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  // ✅ Handle form submission (limit images to 2)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Limit existing + new images to 2
    const finalExistingImages = existingImages.slice(0, 2);
    const finalNewImages = images.slice(0, 2 - finalExistingImages.length);

    const data = new FormData();
    data.append("bookName", formData.bookName);
    data.append("bookDescription", formData.bookDescription);
    data.append("amount", formData.amount.toString());
    data.append("stock", formData.stock.toString());

    // ✅ Send up to 2 images
    finalExistingImages.forEach((imgUrl) => data.append("images", imgUrl));
    finalNewImages.forEach((image) => data.append("images", image));

    for (const [key, value] of data.entries()) {
      console.log(`${key}, ${value}`);
    }

    try {
      const response = await axiosInstance.put(
        `/admin/edit-product/${product?._id}`,
        data
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Success",
          text: "Product updated successfully",
          icon: "success",
        });
        router.push("/admin/product");
      }
      onClose();
    } catch (error) {
      console.error("Error while updating", error);
      Swal.fire({
        title: "Error",
        text: "Oops, something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h2>
        <form onSubmit={handleFormSubmit}>
          {/* ✅ Editable Text Inputs */}
          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Book Name
            </label>
            <input
              type="text"
              name="bookName"
              value={formData.bookName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="bookDescription"
              value={formData.bookDescription}
              onChange={handleInputChange}
              rows={4}
              required
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg p-3"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg p-3"
              required
            />
          </div>

          {/* ✅ Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="images" className="mb-1 font-medium">
              Book Images (Max: 2)
            </label>
            <input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none"
            />
          </div>

          {/* ✅ Existing Images (With Remove Option) */}
          <div className="grid grid-cols-3 gap-3">
            {existingImages.map((imgUrl, index) => (
              <div key={index} className="relative w-24 h-24 border rounded-lg">
                <Image
                  src={imgUrl}
                  alt="Existing Product"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeExistingImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* ✅ New Images Preview (With Remove Option) */}
          <div className="grid grid-cols-3 gap-3">
            {imagePreviewUrls.map((imgUrl, index) => (
              <div key={index} className="relative w-24 h-24 border rounded-lg">
                <Image
                  src={imgUrl}
                  alt="New Product"
                  layout="fill"
                  objectFit="cover"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => removeNewImage(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#d84315] hover:bg-[#bf360c] rounded-lg text-white"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
