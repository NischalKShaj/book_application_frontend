// <==================== component for adding a address from checkout page =======>

// importing the required modules
// <==================== component for adding an address from checkout page =======>

// importing the required modules
import React, { useState } from "react";

const AddressModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    fullAddress: "",
    locality: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Address submitted:", formData);
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="fullAddress"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Full Address
            </label>
            <input
              type="text"
              id="fullAddress"
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="locality"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Locality
            </label>
            <input
              type="text"
              id="locality"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="state"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pincode"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
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
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
