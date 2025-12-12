/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

import { getUserById } from "@/services/user/user.service";

export default function UserViewPage() {
  const params = useParams();
  const userId = params.id;

  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    if (!userId) return;

    (async () => {
      try {
        const res = await getUserById(userId as string);
        setUser(res.data);
      } catch (err: any) {
        toast.error("Failed to fetch user info");
      }
    })();
  }, [userId]);

  if (!user) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Profile Card */}
      <div className="bg-muted dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-4">
        {user.picture ? (
          <Image
            src={user.picture}
            alt={user.name || "User"}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-primary"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-500">
            N/A
          </div>
        )}
        <h1 className="text-3xl font-bold">{user.name}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          user.role === "PREMIUM"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-blue-100 text-blue-800"
        }`}>
          {user.role}
        </span>
      </div>

      {/* Info Sections */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-2">
          <h2 className="text-xl font-semibold border-b pb-2">Contact Info</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || "Not specified"}</p>
          <p><strong>Location:</strong> {user.address || "Not specified"}</p>
        </div>

        <div className="bg-muted dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-2">
          <h2 className="text-xl font-semibold border-b pb-2">Profile Info</h2>
          <p><strong>Bio:</strong> {user.bio || "Not specified"}</p>
          <p><strong>Interests:</strong> {user.travelInterests?.join(", ") || "Not specified"}</p>
          <p><strong>Visited Countries:</strong> {user.visitedCountries?.join(", ") || "Not specified"}</p>
          <p><strong>Account Status:</strong> {user.isActive || "Unknown"}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition"
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}
