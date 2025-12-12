"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message") || "Payment cancelled";
    toast(message);

    const timer = setTimeout(() => router.push("/dashboard"), 2000);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  return <p>Processing payment cancellation...</p>;
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <PaymentCancelContent />
    </Suspense>
  );
}