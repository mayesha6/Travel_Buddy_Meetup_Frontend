import { getAllUsers } from "@/services/user/user.service";
import UsersClient from "./UserClient";
import ViewAllButton from "./ViewAllButton";

interface UserServerProps {
  limit?: number; 
}
export default async function UserServer({ limit }: UserServerProps) {
  const res = await getAllUsers();
  const users = res?.data;
  const slicedUsers = limit ? users.slice(0, limit) : users;
  return (
    <section className="bg-linear-to-r from-white to-blue-50">
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Travelers</h2>
        <UsersClient users={slicedUsers} />

        <div className="mt-6">
          <ViewAllButton label="View All Travellers" href="/users" />
        </div>
      </div>
    </section>
  );
}
