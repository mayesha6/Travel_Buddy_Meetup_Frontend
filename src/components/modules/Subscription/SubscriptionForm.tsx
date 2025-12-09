
"use client";

import { useState } from "react";
import { ISubscription } from "@/types/subscription";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface Props {
  subscription?: ISubscription; // optional for create
  onSubmit?: (data: ISubscription) => Promise<void>; // optional callback
}

export default function SubscriptionForm({ subscription, onSubmit }: Props) {
  const [isPending, startTransition] = useTransition();

  // Controlled form state
  const [formData, setFormData] = useState({
    name: subscription?.name || "",
    price: subscription?.price || 0,
    durationInDays: subscription?.durationInDays || 0,
    description: subscription?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure numbers are cast correctly
    const payload: ISubscription = {
      ...formData,
      price: Number(formData.price),
      durationInDays: Number(formData.durationInDays),
      _id: subscription?._id, // optional for updates
    };

    startTransition(async () => {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        // fallback: redirect or call action if needed
        console.warn("No onSubmit handler provided");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <Input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <Input
        name="durationInDays"
        type="number"
        placeholder="Duration (days)"
        value={formData.durationInDays}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <Button disabled={isPending} type="submit" className="w-full">
        {isPending ? "Saving..." : subscription ? "Update" : "Create"}
      </Button>
    </form>
  );
}
