import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandler";
import { ModeToggle } from "../ModeToggle";

const PublicNavbar = async () => {
  const accessToken = await getCookie("accessToken");
  const isLoggedIn = !!accessToken;

  const navItems = isLoggedIn
    ? [
        { href: "/users", label: "Explore Travelers" },
        { href: "/travel-plan", label: "Travel Plans" },
        { href: "/travel-request", label: "Travel Requests / Meetups" },
        { href: "/subscription", label: "Upgrade to Premium" },
        { href: "/profile", label: "Profile" },
      ]
    : [
        { href: "/users", label: "Explore Travelers" },
        { href: "/travel-plan", label: "Travel Plans" },
        { href: "/register", label: "Register" },
      ];

  const dashboardHref = isLoggedIn ? "/dashboard" : "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-linear-to-r from-white to-blue-50 dark:from-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Dream.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href={dashboardHref}
            className="text-foreground hover:text-primary transition-colors"
          >
            Dashboard
          </Link>

          <ModeToggle />
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {isLoggedIn ? <LogoutButton /> : <Link href="/login"><Button>Login</Button></Link>}
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
              
            </SheetTrigger>
            
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <div className="pt-4">
                  <ModeToggle />
                </div>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link key={link.label} href={link.href} className="text-lg font-medium">
                    {link.label}
                  </Link>
                ))}

                <Link href={dashboardHref} className="text-lg font-medium">
                  Dashboard
                </Link>

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {isLoggedIn ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login">
                      <Button>Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
