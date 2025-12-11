/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import SubscriptionCheckoutButton from "../Payment/SubscriptionCheckoutButton";

export default function SubscriptionUserTable({ data }: any) {
  const [subscriptions, setSubscriptions] = useState(data);



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
                <SubscriptionCheckoutButton subscriptionId={sub._id} amount={sub.price} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
