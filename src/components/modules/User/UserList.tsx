import { UserCard } from "./UserCard";
import { IUser } from "@/types/user.interface";

interface Props {
  users: IUser[];
}

export const UserList = ({ users }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {users.map((user) => (
      <UserCard key={user._id} user={user} />
    ))}
  </div>
);
