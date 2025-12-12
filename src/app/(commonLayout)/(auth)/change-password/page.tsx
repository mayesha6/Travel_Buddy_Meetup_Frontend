"use client";
import { useActionState } from "react";
import { changePassword } from "@/actions/auth/changePassword";

export default function ChangePasswordPage() {
  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction, isPending] = useActionState(changePassword, initialState);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Change Password</h2>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">Old Password</label>
          <input
            name="oldPassword"
            type="password"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            name="newPassword"
            type="password"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {state.message && (
          <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isPending ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}
