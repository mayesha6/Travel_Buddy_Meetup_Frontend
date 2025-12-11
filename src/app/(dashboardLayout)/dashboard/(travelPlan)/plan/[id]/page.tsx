/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import RequestForm from "@/components/modules/TravelPlan/RequestForm";
import { toast } from "sonner";
import { createRequest, getPlanById } from "@/services/travelPlan/travelPlan.service";
import { getCurrentUser } from "@/services/user/user.service"; // fetch logged in user

export default function PlanDetailPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [plan, setPlan] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [showRequest, setShowRequest] = useState(false);

  const router = useRouter();

  // fetch current user
  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        setCurrentUser(null);
      }
    })();
  }, []);
 
  // fetch plan
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await getPlanById(id);
        setPlan(res.data);
      } catch (err: any) {
        toast.error("Failed to fetch plan");
      }
    })();
  }, [id]);

  const handleSendRequest = async (message?: string) => {
    try {
      await createRequest(id!, message);
      toast.success("Request sent");
      setShowRequest(false);
    } catch (err: any) {
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Failed to send request");
      }
    }
  };

  const handleViewRequests = () => {
    router.push(`/dashboard/plan/${id}/requests`);
  };

  if (!plan) return <p>Loading...</p>;

  const isHost = currentUser && plan.host?._id === currentUser._id;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold">{plan.title}</h1>
      <p className="text-sm text-gray-600">{plan.destination}</p>
      <div className="mt-4 prose">
        <p>{plan.description}</p>
      </div>

      <div className="mt-4">
        <div>Dates: {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}</div>
        <div>Host: {plan.host?.name || "Unknown"}</div>
      </div>

      <div className="mt-4">
        {isHost ? (
          <Button onClick={handleViewRequests}>View Requests</Button>
        ) : !showRequest ? (
          <Button onClick={() => setShowRequest(true)}>Request to Join</Button>
        ) : (
          <RequestForm planId={id!} onSent={() => setShowRequest(false)} />
        )}
      </div>
    </div>
  );
}
