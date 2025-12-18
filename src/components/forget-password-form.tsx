"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/services/auth/auth.service";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);

    const result = await forgetPassword(email);

    if (result.success) {
      toast.success("Password reset link sent to your email!");
      setEmail("");
    } else {
      toast.error(result.message || "Failed to send reset link");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="m@example.com"
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Reset Link"}
      </Button>
    </form>
  );
}
