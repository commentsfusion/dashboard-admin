import React from "react";
import { subscriptionData } from "../../../text/subscriptionanalysis";
const subscription = () => {
  return (
    <div>
      <div className="shadow-lg rounded-lg border mt-4 p-4  ">
        <h1 className="font-bold">Subscription Analytics</h1>
        <p className="text-gray-500">Plan distribution and revenue breakdown</p>
        <div className="grid md:grid-cols-3 grid-col-1 gap-4 items-center">
          {subscriptionData.map((item) => (
            <div key={item.id} className="p-5 text-center">
              {/* Top Section (Icon + Title) */}

              {/* Middle Section (Value) */}
              <div className="mt-2">
                <h2 className="text-2xl  font-bold text-gray-900">
                  {item.number}
                </h2>
              </div>

              {/* Bottom Section (Growth) */}
              <h1 className="text-gray-400 mt-2">{item.user}</h1>
              <h1 className="text-black text-sm mt-2">{item.total}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default subscription;
