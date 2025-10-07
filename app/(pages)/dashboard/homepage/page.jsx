"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import Userinfo from "./components/cards/overview/userinfo";
import QuickActionsCard from "./components/cards/quickaction/quickaction";
import Systemstatus from "./components/cards/systemstatus/status";
import Header from "./components/Header"

export default function Home() {

  
  return (
    <div >
  
        <Header/>

      {/* === Dashboard Overview === */}
      <div>
        <h1 className="font-bold text-2xl mt-5">Dashboard Overview</h1>
        <p className="text-md text-gray-600 mt-1">
          Welcome to your Comments Fusion founders dashboard. Monitor your
          platform&apos;s performance and growth.
        </p>

        {/* User Info Section */}
        <div className="mt-5">
          <Userinfo />
        </div>

        {/* Cards Section */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <QuickActionsCard />
          <Systemstatus />
        </div>
      </div>
    </div>
  );
}
