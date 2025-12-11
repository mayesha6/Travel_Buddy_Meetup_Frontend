"use server";

import { cookies } from "next/headers";
import { getNewAccessToken } from "@/services/auth/auth.service";
import { ReactNode } from "react";

interface ServerWrapperProps<T> {
  data: T;
  children: (props: { data: T; loggedIn: boolean }) => ReactNode;
}

export default async function ServerWrapper<T>({
  children,
  data,
}: ServerWrapperProps<T>) {
  try {
    await getNewAccessToken();

    // await here because TS thinks cookies() is async
    const cookieStore = await cookies(); 
    const accessToken = cookieStore.get("accessToken")?.value;
    const loggedIn = !!accessToken;

    return children({ data, loggedIn });
  } catch (err) {
    console.error("Error in ServerWrapper:", err);
    return children({ data, loggedIn: false });
  }
}
