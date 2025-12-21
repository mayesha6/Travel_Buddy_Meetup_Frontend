/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { parse } from "cookie";
// import jwt from "jsonwebtoken";
import { revalidateTag } from "next/cache";
import { deleteCookie, getCookie, setCookie } from "./tokenHandler";
import { verifyAccessToken } from "@/lib/jwtHandlers";
import { forgotPasswordSchema } from "@/zod/auth.validation";

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();

    // Build data object with arrays
    const data: any = {
      name: formData.get("name")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      address: formData.get("address")?.toString() || "",
      bio: formData.get("bio")?.toString() || "",
      travelInterests: formData.get("travelInterests")
        ? formData
            .get("travelInterests")!
            .toString()
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x)
        : [],
      visitedCountries: formData.get("visitedCountries")
        ? formData
            .get("visitedCountries")!
            .toString()
            .split(",")
            .map((x) => x.trim())
            .filter((x) => x)
        : [],
    };

    // Append data JSON
    uploadFormData.append("data", JSON.stringify(data));

    // Append file if exists
    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch(`/user/update-my-profile`, {
      body: uploadFormData,
    });

    const result = await response.json();
    revalidateTag("user-info", { expire: 0 });

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    console.log("access token refreshed!!");

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}

export async function forgotPassword(_prevState: any, formData: FormData) {
  const validationPayload = {
    email: formData.get("email") as string,
  };

  const validatedPayload = zodValidator(
    validationPayload,
    forgotPasswordSchema
  );

  if (!validatedPayload.success && validatedPayload.errors) {
    return {
      success: false,
      message: "Validation failed",
      formData: validationPayload,
      errors: validatedPayload.errors,
    };
  }

  try {
    const response = await serverFetch.post("/auth/forgot-password", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: validationPayload.email,
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Failed to send reset link");
    }

    return {
      success: true,
      message: "Password reset link has been sent to your email!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong",
      formData: validationPayload,
    };
  }
}

export async function resetPassword(payload: { password: string; token: string }) {
  const response = await serverFetch.post("/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${payload.token}` // ✅ token is sent correctly
    },
    body: JSON.stringify({ newPassword: payload.password }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
}
