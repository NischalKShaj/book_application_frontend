// <=================== file to show the entire address from the profile ============>
"use client";

// importing the required modules
import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AddressModal from "../modal/AddressModal";
import axiosInstance from "@/lib/axios/axiosInstance";
import { userStore } from "@/store/userStore";
import { Address } from "@/types/types";

const AddressComponent = () => {
  const [openModal, setOpenModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const user = userStore((state) => state.user);

  useEffect(() => {
    savedAddress(user?._id);
  }, [user?._id]);

  // for showing the saved address
  const savedAddress = async (id: string | undefined) => {
    try {
      const response = await axiosInstance.get(`address/${id}`);
      if (response.status === 200) {
        console.log("res", response.data.addresses);
        const transformedAddress = response.data.addresses.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (address: any) => ({
            _id: address._id, // Ensure the ID is mapped correctly
            addresseeName: address.addresseeName,
            addresseePhone: address.addresseePhone,
            fullAddress: address.fullAddress,
            locality: address.locality,
            state: address.state,
            city: address.city,
            pincode: address.pincode,
          })
        );
        console.log("transformed", transformedAddress);
        setAddresses(transformedAddress);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // function for opening the modal for adding the new address
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setOpenModal(true);
  };

  // showing the added address
  const handleAddressAdded = () => {
    const id = user?._id;
    savedAddress(id);
    setOpenModal(false);
  };

  // for opening the edit modal
  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setOpenModal(true);
  };

  // for removing a particular address
  const removeAddress = async (addressId: number) => {
    try {
      console.log("addressid", addressId);
      const response = await axiosInstance.delete(
        `/remove-address/${addressId}`
      );
      if (response.status === 200) {
        console.log(response);
        setAddresses((prevAddress) =>
          prevAddress.filter((address) => address._id !== addressId)
        );
      }
    } catch (error) {
      console.error("error", error);
    }
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
            key={address._id}
            className="flex flex-col w-56 h-56 border border-gray-300 rounded-lg shadow p-4 relative"
          >
            <h3 className="font-semibold text-gray-900">
              {address.addresseeName}
            </h3>
            <p className="text-gray-700 text-sm mt-2 flex-1">
              {address.fullAddress}
              <br />
              {address.city}, {address.state} {address.pincode}
              <br />
              India
            </p>
            <p className="text-gray-700 text-sm mt-2">
              Phone: {address.addresseePhone}
            </p>
            <div className="flex items-center justify-start space-x-4 mt-auto text-sm">
              <button
                onClick={() => {
                  handleEditAddress(address);
                }}
                className="text-blue-500 hover:underline flex items-center space-x-1"
              >
                <FiEdit className="inline" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  removeAddress(address._id);
                }}
                className="text-red-500 hover:underline flex items-center space-x-1"
              >
                <FiTrash2 className="inline" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
        {openModal && (
          <div>
            <AddressModal
              onClose={() => setOpenModal(false)}
              onAddressAdded={handleAddressAdded}
              address={selectedAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressComponent;
