import React from "react";
import { paymentData } from "../text/paymentinvoice";
const reviewniewtable = () => {
  return (
    <div>
      <div className="shadow-md rounded-lg mt-6 overflow-x-scroll md:overflow-auto w-[330px] md:w-full">
        <table className=" border-collapse md:w-full ">
          <thead className="bg-gray-100 ">
            <tr className="text-center">
              <th className="px-6 py-3 text-sm font-bold text-gray-700">
                Invoice ID
              </th>
              <th className="px-6 py-3  text-sm font-bold text-gray-700">
                Customer
              </th>
              <th className="px-6 py-3  text-sm font-bold text-gray-700">
                Plan
              </th>
              <th className="px-6 py-3  text-sm font-bold text-gray-700">
                Amount
              </th>
              <th className="px-6 py-3  text-sm font-bold text-gray-700">
                Status
              </th>
              <th className="px-6 py-3  text-sm font-bold text-gray-700">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((row, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition duration-200 text-center"
              >
                <td className="px-6 py-3 text-sm font-medium">{row.invoice}</td>
                <td className="px-6 py-3 text-sm">{row.customer}</td>
                <td className="px-6 py-3 text-sm text-center ">
                  <p className="border rounded-lg p-1 md:p-0">{row.plan}</p>
                </td>
                <td className="px-6 py-3 text-sm font-bold p-2">
                  {row.amount}
                </td>
                <td className="px-6 py-3 text-sm">
                  <p
                    className={`p-2 rounded-lg md:p-0 text-white ${
                      row.status === "Paid"
                        ? "bg-green-600"
                        : row.status === "Failed"
                        ? "bg-red-600"
                        : row.status === "Pending"
                        ? "bg-yellow-500"
                        : row.status === "Refunded"
                        ? "bg-blue-600"
                        : "bg-gray-400"
                    }`}
                  >
                    {row.status}
                  </p>
                </td>

                <td className="px-6 py-3 text-sm ">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default reviewniewtable;
