"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { Open_Sans } from "next/font/google";
import { useEffect, useState } from "react";

// Configure the Open Sans font
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-open-sans",
});

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handlePostJobClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/login?redirect=/dashboard");
    }
  };

  const handleSignInClick = () => {
    if (isAuthenticated) {
      logout();
    } else {
      router.push("/login?redirect=/");
    }
  };

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-4 right-8 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${openSans.variable} font-sans`}
    >
      <div className="flex items-center bg-white/80 backdrop-blur-md shadow-md px-6 py-3 rounded-full gap-8">
        {/* Navigation Links */}
        <div className="flex gap-6 items-center">
          <Link
            href="/"
            className="text-base font-semibold text-gray-600 hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-base font-semibold text-gray-600 hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/services"
            className="text-base font-semibold text-gray-600 hover:text-gray-900"
          >
            Services
          </Link>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Action Buttons */}
        <div className="flex gap-4 items-center">
          <button
            onClick={handleSignInClick}
            className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isAuthenticated ? "Log out" : "Log in"}
          </button>
          <button
            onClick={handlePostJobClick}
            className="px-4 py-2 text-sm font-semibold text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-colors"
          >
            Post a Job
          </button>
        </div>
      </div>
    </div>
  );
}