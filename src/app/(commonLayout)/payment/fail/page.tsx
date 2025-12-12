"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message") || "Payment failed";
    toast.error(message);

    // Redirect after 2 seconds
    const timer = setTimeout(() => router.push("/dashboard"), 2000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return <p>Processing payment failure...</p>;
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentFailContent />
    </Suspense>
  );
}