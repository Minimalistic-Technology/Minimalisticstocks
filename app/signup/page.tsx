"use client"; // Required for useState, useEffect in Next.js App Router

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const SignupPage = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Password
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Replace with your actual API
      await axios.post("http://localhost:5000/api/otp/send-otp", {
        name,
        email,
      });
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to send OTP");
      toast.error(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:5000/auth/verify-otp', { email, otp });
      toast.success("OTP verified!");
      setStep(3);
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP");
      toast.error(err.response?.data?.error || "Invalid OTP");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/signup", {
        username: name,
        email,
        password,
      });
      toast.success("Password set successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.status === 400) {
        toast.error("User already exists, please log in");
        router.push(`/login?email=${encodeURIComponent(email)}`);
      } else {
        setError(err.response?.data?.error || "Failed to set password");
        toast.error(err.response?.data?.error || "Failed to set password");
      }
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-full flex justify-center items-center bg-green-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          {step === 3 ? (
            <h2 className="text-2xl text-black font-bold text-center mb-6">
              Signup
            </h2>
          ) : (
            <h2 className="text-2xl text-black font-bold text-center mb-6">
              Login
            </h2>
          )}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <label className="block mb-2 text-black font-semibold">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border text-emerald-950 rounded-md mb-4"
              />
              <label className="block mb-2 text-black font-semibold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border text-emerald-950 rounded-md mb-4"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
              >
                Send OTP
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <p className="mb-2 text-gray-700">
                OTP sent to <strong>{email}</strong>
              </p>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full p-3 border text-emerald-950 rounded-md mb-4"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md"
              >
                Verify OTP
              </button>
            </form>
          )}

          {step === 3 && (
            <>
              <form onSubmit={handlePasswordSubmit}>
                <label className="block mb-2 text-black font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  value={name}
                  disabled
                  className="w-full p-3 border text-emerald-950 rounded-md mb-4"
                />
                <label className="block mb-2 text-black font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-3 border text-emerald-950 rounded-md mb-4"
                />
                <label className="block mb-2 text-black font-semibold">
                  Set Password
                </label>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full p-3 border text-emerald-950 rounded-md pr-10"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-500" />
                    )}
                  </span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-3 rounded-md"
                >
                  Set Password
                </button>
              </form>
              <p className=" mt-3 text-center text-emerald-950">
                Already signed up?{" "}
                <span
                  className="mt-4 text-center text-sm text-blue-600 cursor-pointer hover:underline"
                  onClick={() =>
                    router.push(`/login?email=${encodeURIComponent(email)}`)
                  }
                >
                  Login here
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
