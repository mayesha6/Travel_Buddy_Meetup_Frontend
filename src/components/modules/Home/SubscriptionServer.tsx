import { fetchSubscriptions } from "@/services/subscription/subscription.service";
import SubscriptionClient from "./SubscriptionClient";
import ViewAllButton from "./ViewAllButton";
import ServerWrapper from "./ServerWrapper";

interface SubscriptionServerProps {
  limit?: number;
}

export default async function SubscriptionServer({ limit }: SubscriptionServerProps) {
  const res = await fetchSubscriptions();
  const subscriptions = res || [];
  const slicedSubscriptions = limit ? subscriptions.slice(0, limit) : subscriptions;

  return (
    <ServerWrapper data={slicedSubscriptions}>
      {({ data, loggedIn }) => (
        <section className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Subscriptions</h2>
          <SubscriptionClient subscriptions={data} loggedIn={loggedIn} />
          <div className="mt-6">
            <ViewAllButton label="View All Subscriptions" href="/subscription" />
          </div>
        </section>
      )}
    </ServerWrapper>
  );
}