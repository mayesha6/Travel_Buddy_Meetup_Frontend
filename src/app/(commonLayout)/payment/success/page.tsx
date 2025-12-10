"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const transactionId = searchParams.get("transactionId");
    const message = searchParams.get("message") || "Payment successful";
    toast.success(`${message} (Transaction ID: ${transactionId})`);


    setTimeout(() => router.push("/dashboard/admin/subscription"), 2000);
  }, [searchParams, router]);

  return <p>Processing payment success...</p>;
}
