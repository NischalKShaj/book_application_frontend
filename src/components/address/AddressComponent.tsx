// <=================== file to show the entire address from the profile ============>
"use client";

// importing the required modules
import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddressModal from "../modal/AddressModal";

const AddressComponent = () => {
  const [openModal, setOpenModal] = useState(false);

  const addresses = [
    {
      id: 1,
      name: "Nischal K Shaj",
      address: "21/1 Shree Nilayam, 3rd Main Road, K R Garden",
      city: "BENGALURU",
      state: "KARNATAKA",
      pincode: "560017",
      phone: "9544291856",
    },
    {
      id: 2,
      name: "Nischal.K.Shaj",
      address: "Scita Solutions, 1st Main, 3rd Cross, Isro Layout",
      city: "BENGALURU",
      state: "KARNATAKA",
      pincode: "560078",
      phone: "9544291856",
    },
    {
      id: 3,
      name: "Deepambika S",
      address: "Pathanamthitta Head Post Office",
      city: "PATHANAMTHITTA",
      state: "KERALA",
      pincode: "689645",
      phone: "7403291856",
    },
  ];

  // function for opening the modal for adding the new address
  const handleAddAddress = () => {
    setOpenModal(true);
  };

  return (
    <div className="bg-white p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-6">🏡 Delivery Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {/* Add Address Card */}
        <div
          onClick={handleAddAddress}
          className="flex items-center justify-center w-56 h-56 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-2">+</div>
            <div className="text-lg text-gray-500">Add address</div>
          </div>
        </div>

        {/* Address Cards */}
        {addresses.map((address) => (
          <div
            key={address.id}
            className="flex flex-col w-56 h-56 border border-gray-300 rounded-lg shadow p-4 relative"
          >
            <h3 className="font-semibold text-gray-900">{address.name}</h3>
            <p className="text-gray-700 text-sm mt-2 flex-1">
              {address.address}
              <br />
              {address.city}, {address.state} {address.pincode}
              <br />
              India
            </p>
            <p className="text-gray-700 text-sm mt-2">Phone: {address.phone}</p>
            <div className="flex items-center justify-start space-x-4 mt-auto text-sm">
              <button className="text-blue-500 hover:underline flex items-center space-x-1">
                <FiEdit className="inline" />
                <span>Edit</span>
              </button>
              <button className="text-red-500 hover:underline flex items-center space-x-1">
                <FiTrash2 className="inline" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
        {openModal && (
          <div>
            <AddressModal onClose={() => setOpenModal(false)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressComponent;
