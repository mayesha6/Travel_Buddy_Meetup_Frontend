"use client";

import { IUser, Role } from "@/types/user.interface";

export default function DashboardClient({ user }: { user: IUser }) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Bio:</span> {user.bio || "N/A"}</p>
          <p><span className="font-medium">Travel Interests:</span> {(user.travelInterests ?? []).join(", ")}</p>
          <p><span className="font-medium">Visited Countries:</span> {(user.visitedCountries ?? []).join(", ")}</p>
        </div>

        {user.role === Role.ADMIN && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Admin: Manage Users</h2>
            <p className="text-gray-500">You can add, edit, or delete users here.</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Travel Dashboard</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded px-3 pt-5 pb-7  text-center">
              <p className="text-2xl font-bold">{(user.travelInterests ?? []).length}</p>
              <p className="text-gray-600 text-sm">Travel Interests</p>
            </div>
            <div className="bg-green-50 rounded p-3 text-center">
              <p className="text-2xl font-bold">{(user.visitedCountries ?? []).length}</p>
              <p className="text-gray-600 text-sm">Visited Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
