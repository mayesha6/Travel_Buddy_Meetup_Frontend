/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import TravelPlansList from "@/components/modules/TravelPlan/TravelPlanList";
import { getAllPlans } from "@/services/travelPlan/travelPlan.service";
import { getCurrentUser } from "@/services/user/user.service";

export default async function MyPlansPage({ searchParams }: { searchParams?: any }) {
  // fetch all plans
  const res = await getAllPlans({});
  const { data: plans } = res;

  // fetch current user
  const currentUser = await getCurrentUser();
  const currentUserId = currentUser?._id;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Travel Plans</h1>
      {currentUserId ? (
        <TravelPlansList plans={plans} currentUserId={currentUserId} />
      ) : (
        <p className="text-gray-500">Please login to see your plans.</p>
      )}
    </div>
  );
}
