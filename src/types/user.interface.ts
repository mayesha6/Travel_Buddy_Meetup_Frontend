import { UserRole } from "@/lib/auth-utils";


export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IAuthProvider {
  provider: "google" | "credentials";
  providerId: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  picture?: string;
  bio?: string;
  travelInterests?: string[];
  visitedCountries?: string[];
  address?: string;
  role: UserRole;
  isActive?: IsActive;
  isDeleted?: boolean;
  isVerified?: boolean;
  auths?: IAuthProvider[];
  createdAt?: string;
  updatedAt?: string;
}
