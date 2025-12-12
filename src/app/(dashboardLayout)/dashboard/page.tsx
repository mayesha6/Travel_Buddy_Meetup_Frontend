import DashboardClient from "@/components/modules/Dashboard/DashboardClient";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function DashboardPage() {
  const user = await getUserInfo(); // works because runs on server

  return <DashboardClient user={user} />;
}
