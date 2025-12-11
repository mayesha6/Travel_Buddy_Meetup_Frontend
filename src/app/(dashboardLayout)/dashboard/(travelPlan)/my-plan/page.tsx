/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelPlanList from "@/components/modules/TravelPlan/TravelPlanList";
import { getAllPlans } from "@/services/travelPlan/travelPlan.service";

export default async function MyPlansPage({ searchParams }: { searchParams?: any }) {
  // server-side fetch (since this file is server component by default)
  const q = {}; // convert searchParams if needed
  const res = await getAllPlans(q);
  const { data } = res;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Travel Plans</h1>
      <TravelPlanList plans={data} />
    </div>
  );
}
