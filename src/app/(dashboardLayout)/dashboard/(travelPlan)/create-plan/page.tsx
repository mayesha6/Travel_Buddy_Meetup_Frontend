/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import TravelPlanForm from "@/components/modules/TravelPlan/TravelPlanForm";
import { toast } from "sonner";
import { createPlan } from "@/services/travelPlan/travelPlan.service";

export default function CreatePlanPage() {
  const router = useRouter();

  const handleCreate = async (payload: any) => {
    try {
      await createPlan(payload);
      toast.success("Plan created");
      router.push("/dashboard/my-plans");
    } catch (err: any) {
      toast.error(err.message || "Failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create Travel Plan</h1>
      <TravelPlanForm onSubmit={handleCreate} />
    </div>
  );
}
