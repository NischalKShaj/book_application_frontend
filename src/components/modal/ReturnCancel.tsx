/* eslint-disable @typescript-eslint/no-explicit-any */
// <=========== file to create a modal for returning and cancelling the product ==========>

// importing the required modules
import axiosInstance from "@/lib/axios/axiosInstance";
import { userStore } from "@/store/userStore";
import React, { useState } from "react";

const ReturnCancel = ({
  onClose,
  orderId,
  orderStatus,
}: {
  onClose: () => void;
  orderId: number | undefined;
  orderStatus: string | undefined;
}) => {
  const user = userStore((state) => state.user);
  const [reason, setReason] = useState("");
  const id = orderId;

  // for changing the formdata
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setReason(e.target.value);
  };
  // for submitting the reason for cancellation and returning
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        `/order/return-cancel/${user?._id}/${id}`,
        {
          username: user?.username,
          email: user?.email,
          reason,
          orderStatus,
        }
      );
      if (response.status === 202) {
        onClose();
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {orderStatus === "delivered" ? "Return Order" : "Cancel Order"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="reason"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Reason
            </label>
            <textarea
              id="reason"
              name="reason"
              value={reason}
              onChange={handleChange}
              className="mt-1 block w-full text-black border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg p-3"
              required
              rows={4}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReturnCancel;
