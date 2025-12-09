"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getUserById, updateUser } from "@/services/user/user.service";
import { UserEditForm } from "@/components/modules/User/UserEditForm";
import { IUser } from "@/types/user.interface";

const EditUserPage = () => {
  const params = useParams();
  const rawId = params?.id;

  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!id) return; 
    (async () => {
      const res = await getUserById(id);
      setUser(res.data);
    })();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <UserEditForm user={user} onSubmit={updateUser} />
    </div>
  );
};

export default EditUserPage;
