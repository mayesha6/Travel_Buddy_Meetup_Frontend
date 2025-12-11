"use client";

import { deletePlan } from "@/services/travelPlan/travelPlan.service";
import { ITravelPlan } from "@/types/travelPlan.interface";
import { useRouter } from "next/navigation";
import { toast } from "sonner";




export default function TravelPlanTable({ plans }: { plans: ITravelPlan[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deletePlan(id); 

      toast.success("Plan deleted!");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete plan!");
    }
  };

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Destination</th>
            <th className="p-3 text-left">Budget</th>
            <th className="p-3 text-left">Created By</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan, i) => (
              <tr key={plan._id} className="border-t">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{plan.title}</td>
                <td className="p-3">{plan.destination}</td>

                <td className="p-3">
                  ৳{plan.budgetMin} - ৳{plan.budgetMax}
                </td>

                <td className="p-3">
                  {plan.host?.name || "Unknown"}
                </td>

                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/admin/travel-plan/${plan._id}/travelPlanView`)
                    }
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleDelete(plan._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                No travel plans found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
