/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateMyProfile } from "@/services/auth/auth.service";
import { IUser } from "@/types/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Save } from "lucide-react";

interface MyProfileProps {
  userInfo: IUser;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    const travelInterests = formData.get("travelInterests")?.toString();
    const visitedCountries = formData.get("visitedCountries")?.toString();

    const payload: any = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      bio: formData.get("bio"),
      travelInterests: travelInterests
        ? travelInterests.split(",").map((x) => x.trim())
        : [],
      visitedCountries: visitedCountries
        ? visitedCountries.split(",").map((x) => x.trim())
        : [],
    };

    const file = formData.get("file") as File;
    if (file && file.size > 0) {
      payload.picture = file;
    }

    startTransition(async () => {
      const res = await updateMyProfile(formData);

      if (!res.success) {
        setError(res.message || "Something went wrong");
        return;
      }

      setSuccess("Profile updated successfully!");
      router.refresh();
    });
  };

  return (
    <div className="space-y-6 container mx-auto mt-10 px-4">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Update your personal information
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Picture Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {previewImage || userInfo.picture ? (
                    <AvatarImage
                      src={previewImage || userInfo.picture!}
                      alt={userInfo.name}
                    />
                  ) : (
                    <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
                  )}
                </Avatar>

                <label
                  htmlFor="file"
                  className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="file"
                    name="file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <p className="font-semibold text-lg">{userInfo.name}</p>
              <p className="text-sm text-muted-foreground">{userInfo.email}</p>
            </CardContent>
          </Card>

          {/* Profile Info */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Error */}
              {error && (
                <div className="bg-red-100 text-red-600 p-3 rounded">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="bg-green-100 text-green-600 p-3 rounded">
                  {success}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-1">
                  <Label>Name</Label>
                  <Input
                    name="name"
                    defaultValue={userInfo.name}
                    disabled={isPending}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input value={userInfo.email} disabled className="bg-muted" />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    defaultValue={userInfo.phone || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <Label>Address</Label>
                  <Input
                    name="address"
                    defaultValue={userInfo.address || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Bio */}
                <div className="space-y-1 md:col-span-2">
                  <Label>Bio</Label>
                  <Input
                    name="bio"
                    defaultValue={userInfo.bio || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Travel Interests */}
                <div className="space-y-1 md:col-span-2">
                  <Label>Travel Interests (comma separated)</Label>
                  <Input
                    name="travelInterests"
                    defaultValue={userInfo.travelInterests?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>

                {/* Visited Countries */}
                <div className="space-y-1 md:col-span-2">
                  <Label>Visited Countries (comma separated)</Label>
                  <Input
                    name="visitedCountries"
                    defaultValue={userInfo.visitedCountries?.join(", ") || ""}
                    disabled={isPending}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;