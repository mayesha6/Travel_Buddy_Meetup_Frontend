/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function UsersClient({ users }: { users: any[] }) {
  // Show only normal users and premium users
  const normalUsers = users.filter(user => user.role === "USER" || user.role === "PREMIUM");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {normalUsers.map((user) => (
        <Card key={user._id}>
          <CardHeader className="flex flex-col items-center gap-4">
            {user?.picture && user.picture.startsWith("http") && (
              <Image
                src={user.picture}
                alt={user.name || "User"}
                width={80}
                height={80}
                className="rounded-full object-cover"
                onError={(e) => {
                  // Hide broken image
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = "none";
                }}
              />
            )}
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Location: {user.address}</p>
            <p>Interests: {user.travelInterests?.join(", ")}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
