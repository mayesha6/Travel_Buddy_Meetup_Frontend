/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TravelPlanCard from "./TravelPlanCard";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePlan } from "@/services/travelPlan/travelPlan.service";

interface TravelPlansProps {
  plans: any[];
  currentUserId?: string | null; // <-- allow undefined / null
}

export default function TravelPlansList({
  plans,
  currentUserId,
}: TravelPlansProps) {
  const router = useRouter();

  // If user is NOT logged in → these become empty arrays
  const myPlans = currentUserId
    ? plans.filter((plan) => plan.host?._id === currentUserId)
    : [];

  const otherPlans = currentUserId
    ? plans.filter((plan) => plan.host?._id !== currentUserId)
    : plans; // if no login → show all as explore plans

  const handleDelete = async (planId: string) => {
    if (!confirm("Are you sure you want to delete this plan?")) return;

    try {
      await deletePlan(planId);
      toast.success("Plan deleted successfully!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete plan");
    }
  };

  return (
    <div className="space-y-8">
      {/* Show My Plans only if logged in */}
      {currentUserId && (
        <div>
          <h2 className="text-2xl font-bold mb-4">My Plans</h2>
          {myPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myPlans.map((plan) => (
                <TravelPlanCard
                  key={plan._id}
                  plan={plan}
                  showActions
                  onEdit={() => router.push(`/dashboard/plan/${plan._id}/edit`)}
                  onDelete={() => handleDelete(plan._id)}
                  isLoggedIn={!!currentUserId} // <-- pass login state
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">You have not created any plans yet.</p>
          )}
        </div>
      )}

      {/* Explore Plans - always visible (even logged out users) */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Explore Plans</h2>

        {otherPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherPlans.map((plan) => (
              <TravelPlanCard
                key={plan._id}
                plan={plan}
                isLoggedIn={!!currentUserId} // <-- added
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No plans available.</p>
        )}
      </div>
    </div>
  );
}
