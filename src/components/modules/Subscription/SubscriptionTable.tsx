/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deleteSubscriptionAction } from "@/app/actions/subscription/subscription.action";
import SubscriptionCheckoutButton from "../Payment/SubscriptionCheckoutButton";

export default function SubscriptionTable({ data }: any) {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState(data);

  const onDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscription?")) return;
    await deleteSubscriptionAction(id);
    setSubscriptions(subscriptions.filter((sub: any) => sub._id === id));
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/admin/subscription/${id}/edit-subscription`);
  };

  return (
    <div className="space-y-4">
      <table className="w-full border text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Days</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((sub: any) => (
            <tr key={sub._id} className="border-b">
              <td className="p-3">{sub.name}</td>
              <td className="p-3">${sub.price}</td>
              <td className="p-3">{sub.durationInDays}</td>
              <td className="p-3 flex gap-3">
                <Button size="sm" onClick={() => handleEdit(sub._id)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(sub._id)}>Delete</Button>
                <SubscriptionCheckoutButton subscriptionId={sub._id} amount={sub.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
