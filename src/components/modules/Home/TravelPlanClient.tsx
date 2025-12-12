/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TravelPlanClientProps {
  plans: any[];
  loggedIn: boolean;
  currentUserId?: string; // pass current user ID from parent
}

export default function TravelPlanClient({ plans, loggedIn, currentUserId }: TravelPlanClientProps) {
  const router = useRouter();

  const handleRequest = (planId: string) => {
    if (!loggedIn) {
      toast("Please login to send request");
      router.push("/login");
      return;
    }
    router.push(`/dashboard/plan/${planId}`);
  };

  const handleReview = (planId: string) => {
    router.push(`/dashboard/plan/${planId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan) => {
        const isHost = currentUserId && plan.host && plan.host._id?.toString() === currentUserId.toString();
        const today = new Date();
        const endDate = new Date(plan.endDate);
        const isTripDone = today > endDate;

        return (
          <Card key={plan._id}>
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Destination: {plan.destination}</p>
              <p>Budget: {plan.budgetMin} - {plan.budgetMax} BDT</p>
              <p>Dates: {new Date(plan.startDate).toLocaleDateString()} - {endDate.toLocaleDateString()}</p>

              {!isHost && !isTripDone && (
                <Button className="mt-2" onClick={() => handleRequest(plan._id)}>
                  Request
                </Button>
              )}

              {!isHost && isTripDone && (
                <div className="mt-2">
                  <p className="text-red-500 mb-1">Trip is completed! You can leave a review.</p>
                  <Button onClick={() => handleReview(plan._id)}>Write Review</Button>
                </div>
              )}

              {isHost && (
                <p className="text-sm text-gray-500 mt-2">This is my own plan</p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
