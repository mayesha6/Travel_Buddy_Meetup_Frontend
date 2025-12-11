/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TravelPlanCard({ plan }: any) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p className="text-sm text-gray-600">{plan.destination}</p>
      <p className="mt-2 text-sm">{plan.description?.slice(0, 200)}{plan.description?.length > 200 ? "..." : ""}</p>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm">
          <div>Dates: {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</div>
          {plan.budgetMin != null && <div>Budget: {plan.budgetMin} - {plan.budgetMax}</div>}
        </div>

        <div className="flex gap-2">
          <Link href={`/dashboard/plan/${plan._id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
