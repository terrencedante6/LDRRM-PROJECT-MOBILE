import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavigationMenuDemo } from "../layouts/nav-bar/Navigation-menu";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <h1 className="font-black text-lg text-blue-600">LDRRMS</h1>
      <NavigationMenuDemo />
    </nav>
  );
}
