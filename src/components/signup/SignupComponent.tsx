// <==================================== file to create the signup page ==============>

// importing the required modules
"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import signupSchema from "@/lib/validation/signupSchema";
import { FormSignup, RandomStyle } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";

const SignupComponent = () => {
  const [randomValues, setRandomValues] = useState<RandomStyle[]>([]);
  const [formData, setFormData] = useState<FormSignup>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    // Generate random values on the client side
    setRandomValues(
      Array.from(
        { length: 20 },
        (): RandomStyle => ({
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: 0.3,
        })
      )
    );
  }, []);

  // for changing the input fields
  const handleSignup: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const target = e.currentTarget;
    const { id, value } = target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));

    try {
      // Validate the single field based on the id
      await signupSchema.validateAt(id, { [id]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Clear error if valid
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (validationError: any) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: validationError.message,
      }));
    }
  };

  // for submitting the signup data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // validating the form-data
      await signupSchema.validate(formData, { abortEarly: false });

      const response = await axiosInstance.post("/signup", formData);

      if (response.status === 201) {
        console.log(response.data, "received data");
      }
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const allErrors: { [key: string]: string } = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error.inner.forEach((err: any) => {
          allErrors[err.path] = err.message;
        });
        setErrors(allErrors);
      } else {
        console.error("Submission error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-200 to-gray-400 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#f5e6d3] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f5e6d3] rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-[#d84315] rounded-full opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#d84315] rounded-full opacity-30"></div>
        {/* Simulated book spines */}
        {randomValues.map((style, i) => (
          <div
            key={i}
            className="absolute h-16 w-2 bg-gray-700"
            style={style}
          ></div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full">
            <span className="text-2xl font-bold text-[#1a237e]">
              Book Application
            </span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-[#1a237e] mb-6 text-center">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 flex flex-col">
              <label htmlFor="username">Full Name</label>
              {errors.username && (
                <span className="text-red-500">{errors.username}</span>
              )}
              <input
                id="username"
                name="username"
                onChange={handleSignup}
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Email</label>
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
              <input
                id="email"
                type="email"
                name="email"
                onChange={handleSignup}
                placeholder="Enter your email"
                required
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="phoneNumber">Phone Number</label>
              {errors.phoneNumber && (
                <span className="text-red-500">{errors.phoneNumber}</span>
              )}
              <input
                id="phoneNumber"
                type="text"
                onChange={handleSignup}
                name="phoneNumber"
                placeholder="Enter you phone number"
                required
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="password">Password</label>
              {errors.password && (
                <span className="text-red-500">{errors.password}</span>
              )}
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleSignup}
                placeholder="Create a password"
                required
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
              />
            </div>

            <button className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-md w-full">
              Sign Up
            </button>
          </form>
        </div>
        <p className="text-center mt-4 text-[#1a237e]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#d84315] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;
