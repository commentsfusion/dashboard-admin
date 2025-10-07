import React from "react";
import { userEngagementData } from "@/app/text/userengagement";
const engagement = () => {
  return (
    <div>
      <div className="shadow-lg rounded-lg border mt-4 p-4  ">
        <h1 className="font-bold">User Engagement Metrics</h1>
        <p className="text-sm text-gray-500">
          {" "}
          Comprehensive insights into user behavior, growth patterns, and
          platform performance.
        </p>
        <div className="grid md:grid-cols-4 grid-col-1 gap-2 md:gap-5">
          {userEngagementData.map((item) => (
            <div key={item.id} className="px-5 mt-3">
              {/* Top Section (Icon + Title) */}

              <h3 className="font-bold text-sm">{item.title}</h3>

              {/* Middle Section (Value) */}
              <div className="mt-2 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {item.value}
                </h2>
                <p className="text-xs text-gray-400 items-center">
                  {item.period}
                </p>
              </div>

              {/* Bottom Section (Growth) */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full"
                    style={{ width: item.growth }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default engagement;
