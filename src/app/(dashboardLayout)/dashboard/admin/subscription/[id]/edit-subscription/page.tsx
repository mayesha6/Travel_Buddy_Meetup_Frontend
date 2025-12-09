/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ISubscription } from "@/types/subscription";
import { fetchSubscription, updateSubscription } from "@/services/subscription/subscription.service";
import SubscriptionForm from "@/components/modules/Subscription/SubscriptionForm";
import { toast } from "sonner";

const EditSubscriptionPage = () => {
  const params = useParams();
  const router = useRouter();
  const rawId = params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [subscription, setSubscription] = useState<ISubscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

useEffect(() => {
  if (!id) return;

  const loadSubscription = async () => {
    try {
      setLoading(true);
      const subscriptionData = await fetchSubscription(id); // already the subscription object
      setSubscription(subscriptionData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch subscription");
    } finally {
      setLoading(false);
    }
  };

  loadSubscription();
}, [id]);


  if (loading) return <p>Loading subscription...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!subscription) return <p>Subscription not found.</p>;

  const handleUpdate = async (data: ISubscription) => {
    try {
      await updateSubscription(subscription._id!, data);
      toast.success("Subscription updated successfully");
      router.push("/dashboard/admin/subscription");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update subscription");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Subscription</h1>
      <SubscriptionForm subscription={subscription} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditSubscriptionPage;
