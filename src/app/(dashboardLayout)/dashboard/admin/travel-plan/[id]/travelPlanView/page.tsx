/* eslint-disable @typescript-eslint/no-explicit-any */

import { getPlanById } from "@/services/travelPlan/travelPlan.service";
import Image from "next/image";

export default async function TravelPlanViewPage(props: any) {
  // FIX: params is a Promise, so await it
  const params = await props.params;
  const { id } = params;

  console.log("Travel Plan ID:", id);

  let plan = await getPlanById(id);
  console.log("Travel Plan ID:", plan);
  plan=plan.data

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{plan.title}</h1>

      {/* Basic Info Card */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Basic Information</h2>

        <p><strong>Description:</strong> {plan.description}</p>
        <p><strong>Destination:</strong> {plan.destination}</p>

        <p><strong>Start Date:</strong> {new Date(plan.startDate).toDateString()}</p>
        <p><strong>End Date:</strong> {new Date(plan.endDate).toDateString()}</p>

        <p>
          <strong>Budget:</strong> {plan.budgetMin} - {plan.budgetMax} BDT
        </p>

        <p><strong>Travel Type:</strong> {plan.travelType}</p>

        <p><strong>Visibility:</strong> {plan.visibility}</p>
      </div>

      {/* Interests */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">Interests</h2>
        <div className="flex gap-2 flex-wrap">
          {plan.interests?.map((item: string) => (
            <span
              key={item}
              className="px-3 py-1 bg-blue-100 rounded-full text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Host / Created By */}
      <div className="bg-white p-6 rounded-lg shadow">
  <h2 className="text-xl font-semibold mb-2">Created By</h2>

  <div className="flex items-center gap-4">
    <div className="relative w-16 h-16">
      <Image
        src={plan.host?.photo || "/default-user.png"}
        alt={plan.host?.name || "Host"}
        fill
        className="rounded-full object-cover border"
      />
    </div>

    <div>
      <p className="text-lg font-semibold">{plan.host?.name}</p>
      <p className="text-gray-600">{plan.host?.location}</p>
    </div>
  </div>
</div>
    </div>
  );
}
