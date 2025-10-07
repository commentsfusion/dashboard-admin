'use client'
import { roiData } from '../text/investmentdata';

export default function AdTable() {
  return (
    <div className="shadow-md rounded-lg mt-6 overflow-x-scroll md:overflow-auto w-[330px] md:w-full">
      <table className=" border-collapse  md:w-full ">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="px-6 py-3  text-sm font-bold text-gray-700">
              Platform
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700">
              Ad Spend
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700">
              Revenue Generated
            </th>
            <th className="px-6 py-3  text-sm font-bold text-gray-700">
              ROI
            </th>
          </tr>
        </thead>
        <tbody>
          {roiData.map((row, i) => (
            <tr
              key={i}
              className="border-b hover:bg-gray-50 transition duration-200 text-center"
            >
              <td className="px-6 py-3 text-sm font-medium">{row.platform}</td>
              <td className="px-6 py-3 text-sm">{row.spend}</td>
              <td className="px-6 py-3 text-sm">{row.revenue}</td>
              <td className="px-6 py-3 text-sm font-bold">{row.roi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
