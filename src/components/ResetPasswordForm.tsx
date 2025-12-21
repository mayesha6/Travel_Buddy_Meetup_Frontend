/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

interface ResetPasswordFormProps {
  token: string;
  onSuccess?: () => void;
}

import { resetPassword } from "@/services/auth/auth.service"; // your function
import { Button } from "./ui/button";

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await resetPassword({ password, token });
      setSuccess("Password reset successfully!");
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-6 rounded shadow-md border">
      {error && <p className=" mb-4">{error}</p>}
      {success && <p className="mb-4">{success}</p>}

      <div className="mb-4">
        <label className="block mb-1 font-semibold">New Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Confirm Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full py-2 rounded transition"
        disabled={loading}
      >
        {loading ? "Resetting..." : "Reset Password"}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
