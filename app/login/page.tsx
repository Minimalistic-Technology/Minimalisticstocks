"use client"; // Required for useState, useEffect in Next.js App Router

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";
  const [email, setEmail] = useState(initialEmail);

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/login", { email, password });
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
      toast.error(err.response?.data?.error || "Login failed");
    }
  };
useEffect(() => {
  if (initialEmail) {
    router.replace("/login", undefined);
  }
}, []);

  return (
    <div className="flex h-screen w-full">
      <div className="w-full flex justify-center items-center bg-green-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleLoginSubmit}>
            <label className="block mb-2 text-black font-semibold">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full p-3 border text-emerald-950 rounded-md mb-4"
            />
            <label className="block mb-2 text-black font-semibold">
              Password
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
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
