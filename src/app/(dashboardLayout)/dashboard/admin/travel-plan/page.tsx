// import TravelPlanTable from "@/components/modules/TravelPlans/TravelPlanTable";
// import { getAllTravelPlans } from "@/services/travel-plan/travelPlan.service";

import TravelPlanTable from "@/components/modules/TravelPlan/TravelPlanTable";
import { getAllPlans } from "@/services/travelPlan/travelPlan.service";

export default async function AdminTravelPlansPage() {
  const res = await getAllPlans();

  const plans = Array.isArray(res.data) ? res.data : [];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Travel Plans</h1>
      <TravelPlanTable plans={plans} />
    </div>
  );
}
