/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UsersClient({ users }: { users: any[] }) {
  const router = useRouter();

  // Show only normal users and premium users
  const normalUsers = users.filter(user => user.role === "USER" || user.role === "PREMIUM");

  const handleView = (userId: string) => {
    router.push(`users//user/view-user/${userId}`);
  };

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
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = "none";
                }}
              />
            )}
            <CardTitle>{user.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Location: {user.address || "Not specified"}</p>
            <p>Interests: {user.travelInterests?.join(", ") || "Not specified"}</p>
            <Button className="mt-2 w-full" onClick={() => handleView(user._id)}>
              View Profile
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
