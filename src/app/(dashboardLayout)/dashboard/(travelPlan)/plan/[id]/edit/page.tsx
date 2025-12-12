/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getPlanById, updatePlan } from "@/services/travelPlan/travelPlan.service";

export default function EditPlanPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.id;

  const [plan, setPlan] = useState<any>({
    title: "",
    destination: "",
    description: "",
    startDate: "",
    endDate: "",
    budgetMin: 0,
    budgetMax: 0,
  });

  useEffect(() => {
    if (!planId) return;

    (async () => {
      try {
        const res = await getPlanById(planId as string);
        setPlan(res.data);
      } catch (err: any) {
        toast.error("Failed to fetch plan");
      }
    })();
  }, [planId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePlan(planId as string, plan);
      toast.success("Plan updated successfully!");
      router.push("/travel-plan");
    } catch (err: any) {
      toast.error(err.message || "Failed to update plan");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Travel Plan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={plan.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="destination"
          value={plan.destination}
          onChange={handleChange}
          placeholder="Destination"
          className="w-full border rounded p-2"
        />
        <textarea
          name="description"
          value={plan.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border rounded p-2"
        />
        <div className="flex gap-2">
          <input
            type="date"
            name="startDate"
            value={plan.startDate?.slice(0, 10)}
            onChange={handleChange}
            className="border rounded p-2 flex-1"
          />
          <input
            type="date"
            name="endDate"
            value={plan.endDate?.slice(0, 10)}
            onChange={handleChange}
            className="border rounded p-2 flex-1"
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            name="budgetMin"
            value={plan.budgetMin}
            onChange={handleChange}
            placeholder="Budget Min"
            className="border rounded p-2 flex-1"
          />
          <input
            type="number"
            name="budgetMax"
            value={plan.budgetMax}
            onChange={handleChange}
            placeholder="Budget Max"
            className="border rounded p-2 flex-1"
          />
        </div>
        <Button type="submit">Update Plan</Button>
      </form>
    </div>
  );
}
