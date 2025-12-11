/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { createRequest } from "@/services/travelPlan/travelPlan.service";


export default function RequestForm({ planId, onSent }: { planId: string; onSent?: () => void }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRequest(planId, message);
      toast.success("Request sent successfully");
      onSent?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <Textarea
        placeholder="Message (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Request"}
      </Button>
    </form>
  );
}
