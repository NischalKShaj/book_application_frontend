/* eslint-disable @typescript-eslint/no-unused-vars */
// <=================== component for the otp =================>
"use client";

// importing the required modules
import axiosInstance from "@/lib/axios/axiosInstance";
import { RandomStyle } from "@/types/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userStore } from "@/store/userStore";

const OtpComponent = () => {
  const [randomValues, setRandomValues] = useState<RandomStyle[]>([]);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const user = userStore((state) => state.user);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

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

    // Start countdown for timer (2 minutes)
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setCanResend(true); // Enable the resend button after 2 minutes
        }
        return prev - 1;
      });
    }, 1000); // update every second

    return () => clearInterval(countdown); // Cleanup the interval on component unmount
  }, []);

  // for handling the value change in the otp field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // Handle OTP submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const otpNumber = Number(otp);
      const formDataString = localStorage.getItem("formData");

      if (!formDataString) {
        console.error("No formData found in localStorage");
        return;
      }
      const formData = JSON.parse(formDataString);
      console.log("formData", formData);
      const response = await axiosInstance.post("/signup", {
        formData,
        otp: otpNumber,
      });
      if (response.status === 201) {
        router.push("/login");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // Format the timer as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
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
            OTP
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="space-y-2 flex flex-col">
              <label htmlFor="otp">Enter the otp sent to your mail</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={handleChange}
                placeholder="Enter your otp"
                required
                className="outline outline-1 outline-gray-500 rounded px-2 py-1"
              />
            </div>
            <button className="bg-[#d84315] hover:bg-[#bf360c] text-white px-6 py-3 text-lg rounded-md w-full">
              Submit
            </button>
          </form>
        </div>
        <p className="text-center mt-4 text-[#1a237e]">
          {canResend ? (
            <>
              Resend otp{" "}
              <Link href="/signup" className="text-[#d84315] hover:underline">
                Resend
              </Link>
            </>
          ) : (
            <span>Resend available in {formatTime(timer)}</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default OtpComponent;
