// src/context/AuthContext.jsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authAPI } from "../Apis/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);     // will hold { name, email, ... }
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);

      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      console.log("🔑 token:", token || "(none)");

      if (!token) {
        setUser(null);
        setError("No token");
        return;
      }

      const me = await authAPI.MEE(); // GET /api/user (protected)
      console.log("✅ /me data:", me);
      setUser(me);            // assumes backend returns {name,email,...}
      setError(null);
    } catch (err) {
      console.error("❌ MEE error:", err);
      setUser(null);
      setError(err?.message || "Unauthorized");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // react to 401s triggered in axios interceptor
  useEffect(() => {
    const handler = () => {
      setUser(null);
      setError("Unauthorized");
      router.replace("/"); // push home on 401
    };
    window.addEventListener("auth:unauthorized", handler);
    return () => window.removeEventListener("auth:unauthorized", handler);
  }, [router]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    router.replace("/");
  }, [router]);

  const value = {
    user,
    loading,
    error,
    refetchUser: fetchUser,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
