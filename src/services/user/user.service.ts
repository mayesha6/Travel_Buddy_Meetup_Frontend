/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";
import { getNewAccessToken } from "../auth/auth.service";
import { getCookie } from "../auth/tokenHandler";

const BASE_URL = "/user";

export const 
getAllUsers = async (query?: Record<string, any>) => {
  const queryString = query ? "?" + new URLSearchParams(query).toString() : "";
  const res = await serverFetch.get(`${BASE_URL}/all-users${queryString}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const getUserById = async (id: string) => {
  const res = await serverFetch.get(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
};

export const updateUser = async (id: string, data: Partial<IUser>) => {
  const res = await serverFetch.patch(`${BASE_URL}/${id}`, {
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (id: string) => {
  const res = await serverFetch.delete(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to delete user");
  return res.json();
};


export const getCurrentUser = async (): Promise<IUser | null> => {
  try {
    // Refresh token if needed
    await getNewAccessToken();

    // Get accessToken from cookies
    const accessToken = await getCookie("accessToken");
    if (!accessToken) return null;

    // Call backend /me endpoint
    const res = await serverFetch.get(`${BASE_URL}/me`);
    if (!res.ok) return null;

    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
};
