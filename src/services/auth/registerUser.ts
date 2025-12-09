/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginUser } from "./loginUser";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      address: formData.get("address"),
      phone: formData.get("phone"),
      bio: formData.get("bio"),
      travelInterests: formData.get("travelInterests")
        ? formData.get("travelInterests").split(",").map((v: string) => v.trim())
        : undefined,
      visitedCountries: formData.get("visitedCountries")
        ? formData.get("visitedCountries").split(",").map((v: string) => v.trim())
        : undefined,
    };

    const validation = zodValidator(payload, registerUserValidationZodSchema);
    if (!validation.success) {
      return validation;
    }

    const validatedPayload = validation.data;

    const res = await serverFetch.post("/user/register", {
      body: JSON.stringify(validatedPayload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again.",
    };
  }
};
