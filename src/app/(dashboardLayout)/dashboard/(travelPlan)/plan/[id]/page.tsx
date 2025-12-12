/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/user/user.service";
import { createRequest, getPlanById } from "@/services/travelPlan/travelPlan.service";
import { getReviewsByPlan } from "@/services/reviews/review.service";
import RequestForm from "@/components/modules/TravelPlan/RequestForm";
import ReviewForm from "@/components/modules/Reviews/ReviewForm";
import ReviewList from "@/components/modules/Reviews/ReviewList";

export default function PlanDetailPage() {
  const params = useParams();
  const router = useRouter();

  // Normalize id to string
  let planId: string | undefined;
  if (Array.isArray(params?.id)) {
    planId = params.id[0];
  } else if (typeof params?.id === "string") {
    planId = params.id;
  }

  const [plan, setPlan] = useState<any | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [showRequest, setShowRequest] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch current user
  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      }
    })();
  }, []);

  // Fetch plan and reviews
  useEffect(() => {
    if (!planId) return;
    (async () => {
      try {
        const planRes = await getPlanById(planId);
        setPlan(planRes.data);

        const reviewRes = await getReviewsByPlan(planId);
        setReviews(reviewRes.data);
      } catch (err: any) {
        toast.error("Failed to load plan or reviews");
      }
    })();
  }, [planId]);

  const handleSendRequest = async (message?: string) => {
    if (!planId) return;
    try {
      await createRequest(planId, message);
      toast.success("Request sent!");
      setShowRequest(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to send request");
    }
  };

  const handleViewRequests = () => {
    if (!planId) return;
    router.push(`/dashboard/plan/${planId}/requests`);
  };

  const refreshReviews = async () => {
    if (!planId) return;
    const res = await getReviewsByPlan(planId);
    setReviews(res.data);
    setShowReviewForm(false);
  };

  if (!plan) return <p>Loading...</p>;

  const isHost = currentUser && plan.host?._id === currentUser._id;
  const today = new Date();
  const endDate = new Date(plan.endDate);
  const isTripDone = today > endDate;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{plan.title}</h1>
      <p className="text-sm text-gray-600">{plan.destination}</p>

      <div className="mt-4 prose">
        <p>{plan.description}</p>
      </div>

      <div className="mt-4">
        <p>
          Dates: {new Date(plan.startDate).toLocaleDateString()} -{" "}
          {new Date(plan.endDate).toLocaleDateString()}
        </p>
        <p>Host: {plan.host?.name || "Unknown"}</p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {/* Request / View / Review buttons */}
        {isHost ? (
          <Button onClick={handleViewRequests}>View Requests</Button>
        ) : !isTripDone && !showRequest ? (
          <Button onClick={() => setShowRequest(true)}>Request to Join</Button>
        ) : !isTripDone && showRequest ? (
          <RequestForm planId={planId!} onSent={() => setShowRequest(false)} />
        ) : (
          <div>
            <p className="text-red-500 mb-2">
              Trip is completed! You can leave a review.
            </p>
            <Button onClick={() => setShowReviewForm(!showReviewForm)}>
              {showReviewForm ? "Cancel Review" : "Write Review"}
            </Button>
            {showReviewForm && <ReviewForm planId={planId!} onSuccess={refreshReviews} />}
          </div>
        )}
      </div>

      {/* Reviews */}
      <ReviewList reviews={reviews} />
    </div>
  );
}
