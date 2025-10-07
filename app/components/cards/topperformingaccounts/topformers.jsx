import React from "react";
import { topperformingaccounts } from "../../../text/topperfomingaccounts";
const topformers = () => {
  return (
    <div>
      <div className="grid grid-col-1">
        <div className="p-6 border rounded-lg shadow-md mt-5">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-lg ">Top Performing Accounts</h1>
              <p className="text-gray-500 text-sm">
                Power user and most active user
              </p>
            </div>
          </div>

          {/* Blog Posts List */}
          <div className="space-y-3">
            {topperformingaccounts.map((post) => (
              <div
                key={post.id}
                className="border rounded-lg p-4 flex items-center justify-between"
              >
                <div className="text-gray-500 flex items-center">
                  <p className="p-2">{post.id}</p>
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                    <span className="text-sm font-medium">TS</span>
                  </div>
                    <div className="space-y-1 ml-3">
                  <h2 className="text-md ">{post.title}</h2>
                  <div className="flex flex-wrap gap-2 text-gray-500 text-sm items-center">
                 
                    
                    <p className="border p-0.5 px-2 text-sm rounded-lg">
                      {post.cpc}
                    </p>
                       <p>{post.click} comments </p>
                  </div>
                  {/* Status badges */}
                </div>
                </div>

              

                {/* Right side: Action buttons */}
                <div className=" mt-3 md:mt-0 item">
                  <p className="text-green-600 font-bold text-lg">{post.price}</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default topformers;
