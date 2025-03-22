"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth"; // Import the useAuth hook
import { useRouter } from "next/navigation"; // Import useRouter
import { Open_Sans } from "next/font/google"; // Import Open Sans font
import { useEffect, useState } from "react"; // Import useEffect and useState

// Configure the Open Sans font
const openSans = Open_Sans({
  subsets: ["latin"], // Specify the subset(s) you want to load
  weight: ["400", "600", "700"], // Specify the font weights you need
  variable: "--font-open-sans", // Define a CSS variable for the font
});

export default function Header() {
  const { isAuthenticated, logout } = useAuth(); // Use the useAuth hook
  const router = useRouter(); // Initialize useRouter
  const [isVisible, setIsVisible] = useState(true); // State to control header visibility
  const [lastScrollY, setLastScrollY] = useState(0); // State to track the last scroll position

  const handlePostJobClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Redirect to dashboard if authenticated
    } else {
      router.push("/login?redirect=/dashboard"); // Redirect to login with a redirect query parameter
    }
  };

  const handleSignInClick = () => {
    if (isAuthenticated) {
      logout(); // Log out if already authenticated
    } else {
      router.push("/login?redirect=/"); // Redirect to login with a redirect query parameter for home page
    }
  };

  // Effect to handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY); // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white z-50 border-b border-gray-200 transition-transform duration-300 shadow-sm ${
        openSans.variable
      } font-sans ${isVisible ? "translate-y-0" : "-translate-y-full"}`} // Apply transform based on visibility
    >
      {/* Left: Company Name */}
      <div className="text-xl font-bold text-gray-800 ml-3">
        <Link href="/">Company Name</Link>
      </div>

      {/* Middle: Navigation Links */}
      <nav className="flex gap-8 ml-8">
        <Link
          href="/"
          className="text-base font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="text-base font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          About
        </Link>
        <Link
          href="/services"
          className="text-base font-semibold text-gray-600 hover:text-blue-600 transition-colors"
        >
          Services
        </Link>
      </nav>

      {/* Right: Buttons */}
      <div className="flex gap-4 mr-4">
        {/* Sign In / Logout Button */}
        <button
          onClick={handleSignInClick}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-base font-semibold"
        >
          {isAuthenticated ? "Logout" : "Sign In"}
        </button>

        {/* Post a Job Button */}
        <button
          onClick={handlePostJobClick}
          className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-base font-semibold"
        >
          Post a Job
        </button>
      </div>
    </header>
  );
}