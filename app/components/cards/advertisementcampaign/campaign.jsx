import React from 'react'
import { campaignData } from "../../../text/campaigndata.js";
const campaign = () => {
  return (
    <div>
      <div className="shadow-lg rounded-lg border mt-4 p-4  ">
                <h1 className="font-bold">Advertising Campaign Overview</h1>
                <div className="grid md:grid-cols-3 grid-col-1 gap-4">
                {campaignData.map((item) => (
                    <div key={item.id} className="p-5">
                    {/* Top Section (Icon + Title) */}
                    <div className="flex items-center gap-2">
                        {item.icon}
                        <h3 className="text-gray-400 text-sm">{item.title}</h3>
                    </div>

                    {/* Middle Section (Value) */}
                    <div className="mt-2">
                        <h2 className="text-3xl font-bold text-gray-900">
                        {item.value}
                        </h2>
                    </div>

                    {/* Bottom Section (Growth) */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="flex items-center gap-1 bg-black text-white text-sm font-medium px-2 py-0.5 rounded-lg">
                        {item.growth}
                        </span>
                        <p className="text-sm text-gray-500">{item.period}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
    </div>
  )
}

export default campaign
