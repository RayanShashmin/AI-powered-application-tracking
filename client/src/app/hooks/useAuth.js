// app/hooks/useAuth.js
"use client";

import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Set authentication status based on token
    setIsLoading(false); // Set loading to false after checking
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    setIsAuthenticated(true); // Update authentication state
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update authentication state
  };

  return { isAuthenticated, isLoading, login, logout };
};