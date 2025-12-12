/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TravelPlanCardProps {
  plan: any;
  showActions?: boolean; // show edit/delete buttons
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TravelPlanCard({ plan, showActions = false, onEdit, onDelete }: TravelPlanCardProps) {
  return (
    <div className="border rounded p-4 shadow-md relative hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{plan.title}</h3>
      <p className="text-sm text-gray-600">{plan.destination}</p>
      <p className="mt-2 text-sm">
        {plan.description?.slice(0, 200)}
        {plan.description?.length > 200 ? "..." : ""}
      </p>

      <div className="mt-3 text-sm">
        <div>Dates: {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</div>
        {plan.budgetMin != null && <div>Budget: {plan.budgetMin} - {plan.budgetMax}</div>}
      </div>

      <div className="mt-3 flex justify-between items-center">
        <Link href={`/dashboard/plan/${plan._id}`}>
          <Button size="sm">View</Button>
        </Link>

        {showActions && (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={onEdit}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={onDelete}>Delete</Button>
          </div>
        )}
      </div>
    </div>
  );
}
