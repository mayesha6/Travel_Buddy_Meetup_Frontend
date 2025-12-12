/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function changePassword(
  prevState: { success: boolean; message: string },
  formData: FormData
) {
  try {
    const oldPassword = formData.get("oldPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();

    if (!oldPassword || !newPassword) {
      return {
        success: false,
        message: "Both fields are required",
      };
    }

    const res = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Password change failed",
      };
    }

    return {
      success: true,
      message: "Password changed successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
