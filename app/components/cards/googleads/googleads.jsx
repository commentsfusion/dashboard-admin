import React from "react";
import { FiEdit, FiEye, FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { googleadvertisementdata } from "../../../text/googleads";
const googleads = () => {
  return (
    <div className="grid grid-col-1">
      <div className="p-6 border rounded-lg shadow-md mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg ">Google Ads Integration</h1>
            <p className="text-gray-500 text-sm">
              Track campaigns, conversions, CTR, and CPC
            </p>
          </div>
        </div>

        {/* Blog Posts List */}
        <div className="space-y-3">
          {googleadvertisementdata.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 flex justify-between items-start md:items-center"
            >
              {/* Left side: Title and info */}
              <div className="space-y-1">
                <h2 className="text-md ">{post.title}</h2>
                <div className="flex flex-wrap gap-2 text-gray-500 text-sm items-center">
                  <p>{post.click} </p>
                  <p>{post.description}</p>
                  <p className="border p-0.5 px-2 text-sm rounded-lg">
                    {post.cpc}
                  </p>
                </div>
                {/* Status badges */}
              </div>

              {/* Right side: Action buttons */}
              <div className=" mt-3 md:mt-0">
                <p className="font-bold text-xl">{post.price}</p>
                <p className="text-end">{post.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default googleads;
