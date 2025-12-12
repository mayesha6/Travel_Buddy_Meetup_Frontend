/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllUsers, deleteUser } from "@/services/user/user.service";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserList } from "@/components/modules/User/UserList";
import { IUser } from "@/types/user.interface";
import Cookies from "js-cookie"
const UsersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
console.log(Cookies.get("accessToken"))

const [value, setValue] = useState<string | undefined>(Cookies.get("accessToken"));

  useEffect(() => {
    const handleStorageChange = () => setValue(Cookies.get("accessToken"));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  console.log(value)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://travel-buddy-and-meetup-backend.vercel.app/api/v1/user/all-users",{
          headers: {
            "Authorization" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTM5OTE0N2I2NGVmNDFlNTQwYTk5M2YiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2NTUyNDc3OSwiZXhwIjoxNzY1NjExMTc5fQ.ShOxm8eOrayhZKTZJJ7PGdTVAok51V5YqLPVxDX4cpY"
          }
        });
        console.log(res)
        const data = await res.json()
        console.log(data)
        setUsers(data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      toast.success("User deleted");

      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin/users/${id}/edit`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <UserList users={users} />
      <div className="mt-4 space-y-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between border p-2 rounded"
          >
            <p>
              {user.name} ({user.email})
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => handleEdit(user._id!)}>
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(user._id!)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
