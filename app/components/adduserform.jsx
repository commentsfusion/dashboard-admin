"use client";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { authAPI } from "../Apis/auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Adduserform = () => {
  const router = useRouter();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(""); // optional; leave empty to let backend default to "user"
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // UI state
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---- small helpers (no UI change) ----
  const resetForm = () => {
    setName(""); setEmail(""); setPhone(""); setRole("");
    setPassword(""); setConfirm("");
  };

  const validate = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !password) {
      toast.error("Please fill all required fields.");
      return false;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return false;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  const buildPayload = () => ({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password,
    ...(role.trim() ? { role: role.trim().toLowerCase() } : {}),
  });

  const AddUser = async (e) => {
    e.preventDefault();
    if (loading) return;               // prevent double submit
    if (!validate()) return;           // same validations as before

    try {
      setLoading(true);
      const res = await authAPI.ADDUSER(buildPayload());
      if (!res?.success) throw new Error(res?.message || "Failed to add user");

      toast.success(res?.message || "User added successfully");
      resetForm();                     // same as before
     router.push(`/dashboard/otp?email=${encodeURIComponent(buildPayload().email)}`);   // <--- redirect after success
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={AddUser} className="mt-6 rounded-xl border p-6 space-y-5 shadow-lg bg-white border-white/20">
        {/* Name */}
        <label className="block">
          <span className="text-sm font-medium">Name</span>
          <input
            type="text"
            className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Email */}
        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            type="email"
            className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        {/* Phone */}
        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input
            type="tel"
            className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none"
            placeholder="e.g., +92 3XX XXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        {/* Role (optional) */}
        <label className="block">
          <span className="text-sm font-medium">Role (optional)</span>
          <input
            type="text"
            className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none"
            placeholder='e.g., "admin" or leave empty (defaults to user)'
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>

        {/* Password */}
        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none pr-10"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPw(!showPw)}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </label>

        {/* Confirm Password */}
        <label className="block">
          <span className="text-sm font-medium">Confirm Password</span>
          <div className="relative">
            <input
              type={showConfirmPw ? "text" : "password"}
              className="mt-1 w-full px-3 py-2 rounded-lg border bg-transparent outline-none pr-10"
              placeholder="Confirm password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPw(!showConfirmPw)}
              aria-label={showConfirmPw ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPw ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </label>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100 "
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded-lg bg-gray-900 text-white   disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Adduserform;
