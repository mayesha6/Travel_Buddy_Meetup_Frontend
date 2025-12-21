"use client";

import { useSearchParams, useRouter } from "next/navigation";
import ResetPasswordForm from "@/components/ResetPasswordForm";
import SEO from "@/components/shared/SEO";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Reset token is missing!</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Reset Password - Secure Your Account"
        description="Reset your password to regain full access to your account. Follow our simple steps to create a strong, secure password."
      />
      <div className="min-h-screen flex items-center justify-center">
        <ResetPasswordForm
          token={token}
          onSuccess={() => router.push("/login")}
        />
      </div>
    </>
  );
};

export default ResetPasswordPage;
