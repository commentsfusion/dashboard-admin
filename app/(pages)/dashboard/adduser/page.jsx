"use client";
import Adduserform from "@/app/components/adduserform";
import React, { useState } from "react";


export default function Page() {
  return (
    <div className="min-h-screen ">
      <div className="mx-auto max-w-2xl px-4 py-10">
        {/* Page Title */}
        <h1 className="text-2xl font-semibold">Add User</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fill in the details below to add a new user.
        </p>

        {/* Form Card */}
        <Adduserform />
      </div>
    </div>
  );
}
