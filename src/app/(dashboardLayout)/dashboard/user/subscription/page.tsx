import SubscriptionUserTable from "@/components/modules/Subscription/SubscriptionUserTable";
import { fetchSubscriptions } from "@/services/subscription/subscription.service";

export default async function SubscriptionPage() {
  const subscriptions = await fetchSubscriptions();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Subscriptions</h1>
      </div>

      <SubscriptionUserTable data={subscriptions} />
    </div>
  );
}