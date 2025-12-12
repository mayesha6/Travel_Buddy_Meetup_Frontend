/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelPlansList from "@/components/modules/TravelPlan/TravelPlanList";
import { getAllPlans } from "@/services/travelPlan/travelPlan.service";
import { getCurrentUser } from "@/services/user/user.service";

export default async function AllTravelPlan({ searchParams }: { searchParams?: any }) {
  const res = await getAllPlans({});
  const { data: plans } = res;

  let currentUserId = null;
  try {
    const currentUser = await getCurrentUser();
    currentUserId = currentUser?._id ?? null;
  } catch {
    currentUserId = null; 
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Travel Plans</h1>

      
      <TravelPlansList plans={plans} currentUserId={currentUserId} />
    </div>
  );
}
