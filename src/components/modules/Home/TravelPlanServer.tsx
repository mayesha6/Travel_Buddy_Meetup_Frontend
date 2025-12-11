import { getAllPlans } from "@/services/travelPlan/travelPlan.service";
import TravelPlanClient from "./TravelPlanClient";
import ViewAllButton from "./ViewAllButton";
import ServerWrapper from "./ServerWrapper";

interface TravelPlanServerProps {
  limit?: number;
}

export default async function TravelPlanServer({ limit }: TravelPlanServerProps) {
  const res = await getAllPlans();
  const plans = res?.data || [];
  const slicedPlans = limit ? plans.slice(0, limit) : plans;

  return (
    <ServerWrapper data={slicedPlans}>
      {({ data, loggedIn }) => (
        <section className="bg-muted py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-semibold mb-4">Travel Plans</h2>
            <TravelPlanClient plans={data} loggedIn={loggedIn} />
            <div className="mt-6">
              <ViewAllButton label="View All Travel Plans" href="/travel-plan" />
            </div>
          </div>
        </section>
      )}
    </ServerWrapper>
  );
}
