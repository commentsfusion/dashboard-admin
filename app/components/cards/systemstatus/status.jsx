export default function SystemStatus() {
  return (
    <div className=" p-6 bg-white shadow-md rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-900">System Status </h3>
      <p className="text-sm text-gray-500 mt-1">Current platform health</p>

      <div className="flex items-center justify-between mt-7">
        <p className="text-sm ">API Status</p>
        <p className="text-sm  bg-green-100 text-green-800 px-3 rounded-lg">
          Operational
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm ">Database</p>
        <p className="text-sm  bg-green-100 text-green-800 px-3 rounded-lg">
          Healthy
        </p>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm ">Integrations</p>
        <p className="text-sm  bg-yellow-100 text-red-700 px-3 rounded-lg">
          1 Warning
        </p>
      </div>
    </div>
  );
}
