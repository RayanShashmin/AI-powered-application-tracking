"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      login(); // Update authentication state
      router.push("/");
    } catch (error) {
      if (error.response?.status >= 400 && error.response?.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: "url('/3.jpg')", // Set the background image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the background image
        backgroundRepeat: "no-repeat", // Prevent the image from repeating
      }}
    >
      <div className="flex w-[900px] h-[600px] bg-white rounded-2xl shadow-lg">
        {/* Left Section with 3D Image */}
        <div className="flex-1 flex items-center justify-center rounded-l-2xl">
          <img
            src="/15.jpg" // Replace with your 3D image path
            alt="3D Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Right Section - Signup Form */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sign Up</h1>
          <p className="text-gray-500 text-sm mb-6">
            Create your account to get started with our platform.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={`w-80 p-3 mb-4 bg-gray-100 placeholder-gray-500 rounded-lg outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.firstName ? "text-gray-600 " : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={`w-80 p-3 mb-4 bg-gray-100 placeholder-gray-500 rounded-lg outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.lastName ? "text-gray-600 " : "text-gray-500"
              }`}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={`w-80 p-3 mb-4 bg-gray-100 placeholder-gray-500 rounded-lg outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.email ? "text-gray-600 " : "text-gray-500"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={`w-80 p-3 mb-4 bg-gray-100 placeholder-gray-500 rounded-lg outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.password ? "text-gray-600 " : "text-gray-500"
              }`}
            />
            {error && (
              <div className="w-80 p-3 bg-red-500 text-white text-center rounded-lg mb-4">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-80 bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;