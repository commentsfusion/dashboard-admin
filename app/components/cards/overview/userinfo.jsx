"use client";
import React, { useCallback, useRef, useEffect, useState } from "react";
import { statsData } from "../../../text/stats.js";
import { Users } from "../../../Apis/users";
export default function StatsCard() {

     const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const fetchData = useCallback(async () => {
      try {
        setLoading(true);
        const response = await Users.USER();
        setData(response);
       
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);
    
  return (

    <div className="grid md:grid-cols-4 gap-3">
      {/* Top Section */}
      {statsData.map((stat) => (
        <div key={stat.id} className="shadow-md rounded-xl p-5 ">
          <div className="flex items-center justify-between">
            <h3 className="text-black text-md">{stat.title}</h3>
            <stat.icon className="text-gray-500" size={18} />
          </div>
          {/* Middle Section (Growth) */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900">{data?.totalUsers}</h2>
          </div>
          {/* Bottom Section (Growth) */}
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1 bg-black text-white text-sm font-medium px-2 py-0.5 rounded-lg">
              <stat.growthIcon size={14} />
              {stat.growth}
            </span>
            <p className="text-sm text-gray-500">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
