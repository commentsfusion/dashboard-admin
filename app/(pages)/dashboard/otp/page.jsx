"use client";
import React, { useRef, useState } from "react";
import { authAPI } from "../../../Apis/auth";
import { useSearchParams, useRouter } from "next/navigation"; // 👈 add useRouter
import toast from "react-hot-toast";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // 👈 init router
  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const setDigit = (idx, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    setDigits((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
    if (v && idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const onKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const onPaste = (e) => {
    const text = e.clipboardData.getData("text") || "";
    const nums = text.replace(/\D/g, "").slice(0, 6).split("");
    if (!nums.length) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    for (let i = 0; i < nums.length; i++) next[i] = nums[i];
    setDigits(next);
    inputsRef.current[Math.min(nums.length, 5)]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (loading) return;

    const code = digits.join("");
    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code.");
      return;
    }
    if (!email) {
      toast.error("Missing email. Please go back and try again.");
      return;
    }

    try {
      setLoading(true);
      const res = await authAPI.VERIFY({ email, code });

      if (!res?.success) throw new Error(res?.message || "Verification failed");

      toast.success(res?.message || "Verified successfully");

      // 👇 Redirect after success
      router.replace("/dashboard/users"); 

    } catch (err) {
      toast.error(err?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center text-gray-900">
      <form
        onSubmit={handleVerify}
        className="w-full max-w-sm rounded-2xl border p-6 shadow-lg"
      >
        <h1 className="text-xl font-semibold">Enter Verification Code</h1>
        <p className="text-sm text-gray-500 mt-1">
          We sent a 6-digit code to your email/phone{email ? ` (${email})` : ""}.
        </p>

        {/* 6-digit inputs */}
        <div className="mt-5 flex items-center justify-between gap-2">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              autoComplete="one-time-code"
              className="w-12 h-14 text-center text-2xl font-semibold tracking-widest rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="•"
              aria-label={`Digit ${i + 1}`}
              value={digits[i]}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              onPaste={i === 0 ? onPaste : undefined}
              disabled={loading}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gray-900 text-white disabled:opacity-60"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
          <div className="text-center">
            <button
              type="button"
              className="text-sm text-gray-600 hover:underline"
              onClick={() => {
                if (!email) return toast.error("Missing email to resend.");
                toast("Resend not implemented");
              }}
              disabled={loading}
            >
              Resend code
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Didn’t receive it? Check spam or try again.
        </p>
      </form>
    </div>
  );
};

export default Page;
