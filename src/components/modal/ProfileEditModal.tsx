// <===================== component for editing the profile ==============>

// importing the required modules
import axiosInstance from "@/lib/axios/axiosInstance";
import { userStore } from "@/store/userStore";
import React, { useState } from "react";

const ProfileEditModal = ({ onClose }: { onClose: () => void }) => {
  const user = userStore((state) => state.user);
  // const isLoggedIn = userStore((state) => state.isLoggedIn);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    const { id, value } = target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // for submitting the data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(
        `/update-profile/${user?._id}`,
        formData
      );
      if (response.status === 200) {
        console.log("response", response.data);
        userStore.setState({
          user: {
            _id: response.data.data._id,
            email: response.data.data.email,
            username: response.data.data.username,
            phoneNumber: response.data.data.phoneNumber,
          },
        });

        onClose();
      }
    } catch (error) {
      console.error("error", error);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Receiver Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block text-black w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block text-black w-full border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phoneNumber"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={user?.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full text-black border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
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
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
