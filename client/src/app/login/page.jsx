"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import the Link component
import axios from "axios";
import { useAuth } from "../hooks/useAuth"; // Import the useAuth hook

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // Use the login function from useAuth

  // Get the redirect URL from the query parameters
  const searchParams = new URLSearchParams(window.location.search);
  const redirectUrl = searchParams.get("redirect") || "/"; // Default to home page if no redirect URL

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data.token); // Store the token in localStorage
      login(res.data.token); // Update authentication state
      router.push(redirectUrl); // Redirect to the specified URL after login
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
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
      <div className="flex w-[900px] h-[500px] bg-white rounded-2xl shadow-lg">
        {/* Left Section with 3D Image */}
        <div className="flex-1 flex items-center justify-center rounded-l-2xl">
          <img
            src="/15.jpg" // Replace with your 3D image path
            alt="3D Illustration"
            className="w-3/4 h-auto"
          />
        </div>

        {/* Right Section - Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Log In</h1>
          <p className="text-gray-500 text-sm mb-6">
            Enter your email and password to log in to your account.
          </p>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={`w-80 p-3 bg-gray-100 rounded-lg mb-4 outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.email ? "text-gray-500 " : "text-gray-500"
              }`}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={`w-80 p-3 bg-gray-100 rounded-lg mb-4 outline-none border border-gray-200 focus:ring-2 focus:ring-indigo-500 ${
                data.password ? "text-gray-500 " : "text-gray-500"
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
              Sign In
            </button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;