/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { listRequests } from "@/services/travelPlan/travelPlan.service";

export default function PlanRequests() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await listRequests(id);
        setRequests(res.data);
      } catch (err: any) {
        toast.error("Failed to load requests");
      }
    })();
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Requests</h1>
      <div className="space-y-3">
        {requests.map((r) => (
          <div key={r._id} className="p-3 border rounded">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{r.requester?.name}</div>
                <div className="text-sm text-gray-600">{r.message}</div>
              </div>
              <div className="text-sm">{new Date(r.createdAt).toLocaleString()}</div>
            </div>
            {/* You can add accept/decline actions here using your backend endpoints */}
          </div>
        ))}
      </div>
    </div>
  );
}
