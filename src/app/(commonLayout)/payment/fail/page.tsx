"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message") || "Payment failed";
    toast.error(message);

    // Redirect after 2 seconds
    setTimeout(() => router.push("/dashboard"), 2000);
  }, [searchParams, router]);

  return <p>Processing payment failure...</p>;
}
