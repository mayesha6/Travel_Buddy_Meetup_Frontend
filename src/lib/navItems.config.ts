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
          roles: ["USER", "ADMIN", "PREMIUM"],
        },
        {
          title: "My Profile",
          href: "/profile",
          icon: "User",
          roles: ["USER", "ADMIN", "PREMIUM"],
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
          roles: ["USER", "ADMIN", "PREMIUM"],
        },
      ],
    },
  ];
};

/**
 * NAV ITEMS FOR NORMAL USER & PREMIUM USERS
 */
export const premiumUserNavItems: NavSection[] = [
  {
    title: "Travel Plans",
    items: [
      {
        title: "My Travel Plans",
        href: "/dashboard/my-plan",
        icon: "Map",
        roles: ["USER", "PREMIUM"],
      },
      {
        title: "Create New Plan",
        href: "/dashboard/create-plan",
        icon: "PlusCircle",
        roles: ["USER", "PREMIUM"],
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
        roles: ["USER", "PREMIUM"],
      },
      {
        title: "Meetups",
        href: "/dashboard/meetups",
        icon: "Handshake",
        roles: ["USER", "PREMIUM"],
      },
      // {
      //   title: "My Matches",
      //   href: "/dashboard/matches",
      //   icon: "HeartHandshake",
      //   roles: ["USER", "PREMIUM"],
      // },
    ],
  },
    
];
export const userNavItems: NavSection[] = [
    {
    title: "Subscription Management",
    items: [
      {
        title: "Subscription",
        href: "/dashboard/user/subscription",
        icon: "CreditCard",
        roles: ["USER"],
      }
    ],
  },
];

/**
 * NAV ITEMS ONLY FOR ADMIN
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
      // {
      //   title: "Suspended Accounts",
      //   href: "/dashboard/admin/suspended-users",
      //   icon: "UserX",
      //   roles: ["ADMIN"],
      // },
    ],
  },

  {
    title: "Travel Management",
    items: [
      {
        title: "Travel Plans",
        href: "/dashboard/admin/travel-plan",
        icon: "Map",
        roles: ["ADMIN"],
      },
      // {
      //   title: "Meetups",
      //   href: "/dashboard/admin/meetups",
      //   icon: "Calendar",
      //   roles: ["ADMIN"],
      // },
    ],
  },

  {
    title: "Subscription Management",
    items: [
      {
        title: "Subscription",
        href: "/dashboard/admin/subscription",
        icon: "CreditCard",
        roles: ["ADMIN"],
      },
      {
        title: "Create Subscription",
        href: "/dashboard/admin/subscription/create-subscription",
        icon: "Plus",
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
      return [...commonNav, ...userNavItems, ...premiumUserNavItems];

    case "PREMIUM":
      return [...commonNav, ...premiumUserNavItems];

    default:
      return [];
  }
};