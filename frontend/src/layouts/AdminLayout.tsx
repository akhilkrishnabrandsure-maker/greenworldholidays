import React from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>Dashboard</li>
            <li>Destinations</li>
            <li>Vehicles</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="font-semibold text-gray-800">Admin Dashboard</h1>
          <button className="text-sm text-gray-600 hover:text-gray-900">Logout</button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
