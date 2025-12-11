/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SubscriptionClientProps {
  subscriptions: any[];
  loggedIn: boolean;
}

export default function SubscriptionClient({ subscriptions, loggedIn }: SubscriptionClientProps) {
  const router = useRouter();

  const handleBuy = (id: string) => {
    if (!loggedIn) {
      toast("Please login to buy subscription");
      router.push("/login");
      return;
    }
    else{
      router.push("/dashboard/plan");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {subscriptions.map((sub) => (
        <Card key={sub._id}>
          <CardHeader>
            <CardTitle>{sub.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Price: {sub.price} BDT</p>
            <p>Duration: {sub.durationInDays} days</p>
            <Button className="mt-2" onClick={() => handleBuy(sub._id)}>
              Buy
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}