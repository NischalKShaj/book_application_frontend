// <============================ component for contact page =============>
"use client";

// importing the required modules
import React, { ChangeEventHandler, useEffect, useState } from "react";
import Sidebar from "../partials/sidebar/Sidebar";
import axiosInstance from "@/lib/axios/axiosInstance";
import SweetAlert from "sweetalert2";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone: "",
    message: "",
  });
  const user = userStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  // function for changing the values in the form
  const changeValues: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const target = e.currentTarget;
    const { id, value } = target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // for submitting the form data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/contact", formData);
      if (response.status === 200) {
        SweetAlert.fire({
          title: "Email Sent Successfully!",
          text: "Your email has been sent. We will contact you soon.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("error", error);
      SweetAlert.fire({
        title: "Email Sending Failed!",
        text: "We encountered an issue while sending your email. Please try again later or check your internet connection.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="bg-[#fafafa]">
      <div className="flex flex-col md:flex-row">
        <Sidebar />

        <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-lg mt-4 md:mt-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1a237e] text-center mb-4 sm:mb-6">
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Address Field */}
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full px-4 py-2 text-sm sm:text-base text-gray-900 border-b-0 sm:border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Please enter your email"
                onChange={changeValues}
                required
              />

              <label
                htmlFor="email"
                className="absolute top-0 left-4 text-lg text-gray-500 transition-all duration-300 transform -translate-y-5 scale-75 origin-top-left"
              >
                Email Address
              </label>
            </div>

            {/* First Name and Last Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className="block w-full px-4 py-2 text-sm sm:text-base text-gray-900 border-b-0 sm:border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="Enter your first name"
                  onChange={changeValues}
                  required
                />
                <label
                  htmlFor="first_name"
                  className="absolute top-0 left-4 text-lg text-gray-500 transition-all duration-300 transform -translate-y-5 scale-75 origin-top-left"
                >
                  First Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className="block w-full px-4 py-2 text-sm sm:text-base text-gray-900 border-b-0 sm:border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="Enter your last name"
                  onChange={changeValues}
                  required
                />
                <label
                  htmlFor="last_name"
                  className="absolute top-0 left-4 text-lg text-gray-500 transition-all duration-300 transform -translate-y-5 scale-75 origin-top-left"
                >
                  Last Name
                </label>
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="relative">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block w-full px-4 py-2 text-sm sm:text-base text-gray-900 border-b-0 sm:border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                placeholder="Enter your phone number"
                onChange={changeValues}
                required
              />
              <label
                htmlFor="phone"
                className="absolute top-0 left-4 text-lg text-gray-500 transition-all duration-300 transform -translate-y-5 scale-75 origin-top-left"
              >
                Phone Number
              </label>
            </div>

            {/* Message Field */}
            <div className="relative">
              <textarea
                name="message"
                id="message"
                className="block w-full px-4 py-2 text-sm sm:text-base text-gray-900 border-b-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
      resize-none sm:h-32 h-24"
                placeholder=" "
                onChange={changeValues}
                required
              ></textarea>
              <label
                htmlFor="message"
                className="absolute top-0 left-4 text-lg text-gray-500 transition-all duration-300 transform -translate-y-5 scale-75 origin-top-left"
              >
                Your Message
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-3 bg-[#d84315] text-white font-semibold rounded-full hover:bg-[#bf360c] focus:outline-none focus:ring-4 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
