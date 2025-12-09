import { IUser } from "@/types/user.interface";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props {
  user: IUser;
}

export const UserCard = ({ user }: Props) => (
  <Card className="mb-4">
    <CardHeader>
      <h3 className="font-bold">{user.name}</h3>
      <p className="text-sm text-muted-foreground">{user.email}</p>
    </CardHeader>
    <CardContent>
      <p>Phone: {user.phone || "N/A"}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.isActive}</p>
    </CardContent>
  </Card>
);
