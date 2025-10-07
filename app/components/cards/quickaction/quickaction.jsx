export default function QuickActionsCard() {
  return (
    
    <div className=" p-6 bg-white shadow-md rounded-2xl">
      <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      <p className="text-sm text-gray-500 mt-1">
        Common administrative tasks
      </p>

      <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
        <li>View detailed analytics reports</li>
        <li>Manage user accounts and permissions</li>
        <li>Monitor system health and performance</li>
        <li>Review revenue and subscription metrics</li>
      </ul>
    </div>
  );
}
