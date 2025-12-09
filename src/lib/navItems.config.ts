import { NavSection } from "@/types/dashboard.interface";
import { UserRole, getDefaultDashboardRoute } from "./auth-utils";

/**
 * COMMON NAV FOR ALL ROLES
 */
export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["USER", "ADMIN"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "User",
          roles: ["USER", "ADMIN"],
        },
      ],
    },

    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
          roles: ["USER", "ADMIN"],
        },
      ],
    },
  ];
};

/**
 * NAV ITEMS FOR NORMAL USER / TRAVELER
 */
export const userNavItems: NavSection[] = [
  {
    title: "Travel Plans",
    items: [
      {
        title: "My Travel Plans",
        href: "/dashboard/my-plans",
        icon: "Map",
        roles: ["USER"],
      },
      {
        title: "Create New Plan",
        href: "/dashboard/create-plan",
        icon: "PlusCircle",
        roles: ["USER"],
      },
    ],
  },

  {
    title: "Meetups & Buddies",
    items: [
      {
        title: "Find Travel Buddies",
        href: "/dashboard/find-buddies",
        icon: "Users",
        roles: ["USER"],
      },
      {
        title: "Meetups",
        href: "/dashboard/meetups",
        icon: "Handshake",
        roles: ["USER"],
      },
      {
        title: "My Matches",
        href: "/dashboard/matches",
        icon: "HeartHandshake",
        roles: ["USER"],
      },
    ],
  },
];

/**
 * NAV ITEMS FOR ADMIN
 */
export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/dashboard/admin/users",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "Suspended Accounts",
        href: "/admin/dashboard/suspended-users",
        icon: "UserX",
        roles: ["ADMIN"],
      },
    ],
  },

  {
    title: "Travel Management",
    items: [
      {
        title: "Travel Plans",
        href: "/admin/dashboard/travel-plans",
        icon: "Map",
        roles: ["ADMIN"],
      },
      {
        title: "Meetups",
        href: "/admin/dashboard/meetups",
        icon: "Calendar",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Subscription Management",
    items: [
      {
        title: "Subscription",
        href: "/dashboard/admin/subscription",
        icon: "Subscription",
        roles: ["ADMIN"],
      },
      {
        title: "Create Subscription",
        href: "/dashboard/admin/subscription/create-subscription",
        icon: "Add",
        roles: ["ADMIN"],
      },
    ],
  },
];

/**
 * GET NAV BASED ON ROLE
 */
export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNav = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNav, ...adminNavItems];
    case "USER":
      return [...commonNav, ...userNavItems];
    default:
      return [];
  }
};
