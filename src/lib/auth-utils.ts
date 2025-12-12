export type UserRole = "ADMIN" | "USER" | "PREMIUM";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/register"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/profile/edit", "/travel-plans", "/travel-plans/add"],
  patterns: [/^\/profile\//, /^\/travel-plans\//],
};

export const userProtectedRoutes: RouteConfig = {
  exact: ["/dashboard"],
  patterns: [/^\/dashboard/], // /dashboard/* 
};

export const adminProtectedRoutes: RouteConfig = {
  exact: ["/admin"],
  patterns: [/^\/admin/], // /admin/*
};

// Include PREMIUM users in userProtectedRoutes
export const premiumProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/premium/], // Optional: premium-specific pages
};

export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.includes(pathname);
};

export const isRouteMatches = (pathname: string, routes: RouteConfig): boolean => {
  if (routes.exact.includes(pathname)) return true;
  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string
): "ADMIN" | "USER" | "PREMIUM" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return "ADMIN";
  if (isRouteMatches(pathname, userProtectedRoutes)) return "USER";
  if (isRouteMatches(pathname, premiumProtectedRoutes)) return "PREMIUM";
  if (isRouteMatches(pathname, commonProtectedRoutes)) return "COMMON";

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") return "/dashboard";
  if (role === "PREMIUM") return "/dashboard"; 
  if (role === "USER") return "/dashboard";
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") return true;

  return routeOwner === role || (role === "PREMIUM" && routeOwner === "USER"); 
  // PREMIUM can access USER routes
};