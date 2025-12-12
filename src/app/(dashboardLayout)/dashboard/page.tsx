"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/user/user.service";
import { IUser, Role } from "@/types/user.interface";

export default function DashboardPage() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">User not found or not logged in</p>
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name}!</p>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
          <p><span className="font-medium">Name:</span> {user.name}</p>
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Bio:</span> {user.bio || "N/A"}</p>
          <p><span className="font-medium">Travel Interests:</span> {user.travelInterests?.join(", ") || "N/A"}</p>
          <p><span className="font-medium">Visited Countries:</span> {user.visitedCountries?.join(", ") || "N/A"}</p>
        </div>

        {/* Admin Section */}
        {(user.role === Role.ADMIN) && (
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Admin: Manage Users</h2>
            <p className="text-gray-500">You can add, edit, or delete users here.</p>
          </div>
        )}

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Travel Dashboard</h2>
          <p className="text-gray-500">Check your travel stats and explore new destinations.</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded p-3 text-center">
              <p className="text-2xl font-bold">{user.travelInterests?.length || 0}</p>
              <p className="text-gray-600 text-sm">Travel Interests</p>
            </div>
            <div className="bg-green-50 rounded p-3 text-center">
              <p className="text-2xl font-bold">{user.visitedCountries?.length || 0}</p>
              <p className="text-gray-600 text-sm">Visited Countries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
