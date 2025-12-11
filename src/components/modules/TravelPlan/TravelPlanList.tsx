/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TravelPlanCard from "./TravelPlanCard";

export default function TravelPlanList({ plans }: { plans: any[] }) {
  if (!plans?.length) return <p>No plans found.</p>;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {plans.map((p) => <TravelPlanCard key={p._id} plan={p} />)}
    </div>
  );
}
