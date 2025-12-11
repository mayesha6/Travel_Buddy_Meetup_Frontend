/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TravelPlanClientProps {
  plans: any[];
  loggedIn: boolean;
}

export default function TravelPlanClient({ plans, loggedIn }: TravelPlanClientProps) {
  const router = useRouter();

  const handleRequest = (planId: string) => {
    if (!loggedIn) {
      toast("Please login to send request");
      router.push("/login");
      return;
    }
    router.push(`/dashboard/plan/${planId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {plans.map((plan) => (
        <Card key={plan._id}>
          <CardHeader>
            <CardTitle>{plan.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Destination: {plan.destination}</p>
            <p>Budget: {plan.budgetMin} - {plan.budgetMax} BDT</p>
            <Button className="mt-2" onClick={() => handleRequest(plan._id)}>
              Request
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
