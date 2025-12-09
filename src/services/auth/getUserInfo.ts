/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { IsActive, IUser } from "@/types/user.interface";
import { serverFetch } from "@/lib/server-fetch";

export const getUserInfo = async (): Promise<IUser> => {
  try {
    const response = await serverFetch.get("/user/me");
    const result = await response.json();

    if (!result.success) {
      throw new Error("Invalid response");
    }

    return {
      _id: result.data.id,
      name: result.data.name || "Unknown User",
      email: result.data.email || "",
      role: result.data.role,
      phone: result.data.phone || "",
      picture: result.data.picture || "",
      bio: result.data.bio || "",
      travelInterests: result.data.travelInterests || [],
      visitedCountries: result.data.visitedCountries || [],
      address: result.data.address || "",
      isActive: result.data.isActive,
      isDeleted: result.data.isDeleted,
      isVerified: result.data.isVerified,
      createdAt: result.data.createdAt,
      updatedAt: result.data.updatedAt,
    };
  } catch (error) {
    return {
      _id: "",
      name: "Unknown User",
      email: "",
      role: "USER",
      phone: "",
      picture: "",
      bio: "",
      travelInterests: [],
      visitedCountries: [],
      address: "",
      isActive: IsActive.INACTIVE,
      isDeleted: false,
      isVerified: false,
      createdAt: "",
      updatedAt: "",
    };
  }
};

