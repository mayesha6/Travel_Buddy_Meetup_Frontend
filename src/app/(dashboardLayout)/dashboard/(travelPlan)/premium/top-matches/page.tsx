/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TravelPlanList from "@/components/modules/TravelPlan/TravelPlanList";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { matchPlans } from "@/services/travelPlan/travelPlan.service";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default function TopMatchesPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await getUserInfo();
        const role = me.role;
        if (role !== "PREMIUM" && role !== "ADMIN") {
          toast.error("Premium only");
          redirect("/upgrade");
          return;
        }
        const res = await matchPlans();
        setPlans(res.data);
      } catch (err: any) {
        toast.error(err.message || "Failed");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Top Matches (Premium)</h1>
      <TravelPlanList plans={plans} />
    </div>
  );
}
