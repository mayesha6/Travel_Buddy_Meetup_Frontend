/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { serverFetch } from "@/lib/server-fetch";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const transactionId = searchParams.get("transactionId");
      const message = searchParams.get("message") || "Payment successful";
      const userId = searchParams.get("userId"); // optional if you pass it from backend
      toast.success(`${message} (Transaction ID: ${transactionId})`);

      try {
        // Upgrade user to PREMIUM after successful payment
        const res = await serverFetch.patch(`/user/upgrade-to-premium/${userId}`);
        if (!res.ok) throw new Error("Failed to upgrade user to PREMIUM");
        // const data = await res.json();
        toast.success(`You are now a PREMIUM user!`);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Something went wrong while upgrading your account");
      }

      // Redirect after 2 seconds
      setTimeout(() => router.push("/dashboard"), 2000);
    };

    handlePaymentSuccess();
  }, [searchParams, router]);

  return <p>{loading ? "Processing payment and upgrading your account..." : ""}</p>;
}
