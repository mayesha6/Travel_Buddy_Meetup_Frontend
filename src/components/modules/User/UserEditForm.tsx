/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { IUser, Role, IsActive } from "@/types/user.interface";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  user: IUser;
  onSubmit: (id: string, data: Partial<IUser>) => Promise<void>;
}

export const UserEditForm = ({ user, onSubmit }: Props) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    bio: user.bio || "",
    address: user.address || "",
    role: user.role || Role.USER,
    isActive: user.isActive || IsActive.ACTIVE,
    isVerified: user.isVerified ? "true" : "false", // NEW
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: "role" | "isActive" | "isVerified", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(user._id!, {
        ...formData,
        isVerified: formData.isVerified === "true", // convert string → boolean
      });
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <Input name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
      <Input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />

      <div className="flex gap-4">
        {/* Role */}
        <Select value={formData.role} onValueChange={(v) => handleSelectChange("role", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(Role).map((role) => (
              <SelectItem key={role} value={role}>{role}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Active Status */}
        <Select value={formData.isActive} onValueChange={(v) => handleSelectChange("isActive", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(IsActive).map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* NEW: isVerified */}
      <Select
        value={formData.isVerified}
        onValueChange={(v) => handleSelectChange("isVerified", v)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Verified?" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="true">Verified</SelectItem>
          <SelectItem value="false">Not Verified</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Update User</Button>
    </form>
  );
};