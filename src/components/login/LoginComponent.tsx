// <=================== component for the login ========================>

// importing the required modules
"use client";
import axiosInstance from "@/lib/axios/axiosInstance";
import { userStore } from "@/store/userStore";
import { FormLogin, RandomStyle } from "@/types/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEventHandler, useEffect, useState } from "react";

const LoginComponent = () => {
  const [randomValues, setRandomValues] = useState<RandomStyle[]>([]);
  const [formData, setFormData] = useState<FormLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const isLoggedIn = userStore((state) => state.isLoggedIn);

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

  // for handling change in the login data
  const handleLogin: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.currentTarget;
    const { id, value } = target;

    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  //for submitting the data
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/login", formData);

      if (response.status === 202) {
        console.log("response", response.data);
        isLoggedIn({
          _id: response.data.user.id,
          email: response.data.user.email,
          username: response.data.user.username,
          phoneNumber: response.data.user.phone,
        });
        const { token } = response.data;
        localStorage.setItem("access_token", token);
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message); // Show server error message
      } else {
        setError("An unexpected error occurred. Please try again.");
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
            Loin In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                onChange={handleLogin}
                placeholder="Enter your email"
                required
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                onChange={handleLogin}
                placeholder="Enter your password"
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
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[#d84315] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
