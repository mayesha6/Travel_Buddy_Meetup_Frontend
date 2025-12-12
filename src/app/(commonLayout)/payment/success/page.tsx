/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { serverFetch } from "@/lib/server-fetch";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const transactionId = searchParams.get("transactionId");
      const message = searchParams.get("message") || "Payment successful";
      const userId = searchParams.get("userId");
      
      toast.success(`${message} (Transaction ID: ${transactionId})`);

      try {
        const res = await serverFetch.patch(`/user/upgrade-to-premium/${userId}`);
        if (!res.ok) throw new Error("Failed to upgrade user to PREMIUM");
        
        toast.success(`You are now a PREMIUM user!`);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Something went wrong while upgrading your account");
      } finally {
        setLoading(false);
      }

      const timer = setTimeout(() => router.push("/dashboard"), 2000);
      return () => clearTimeout(timer);
    };

    handlePaymentSuccess();
  }, [searchParams, router]);

  return <p>{loading ? "Processing payment and upgrading your account..." : ""}</p>;
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<p>Loading payment details...</p>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}