"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/application" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        {/* <Dead-end>*/}
        <NavigationMenuItem>
          <Link href="/application/requests" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Requests
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* <Dead-end>*/}
        <NavigationMenuItem>
          <Link href="/application/employees" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Employees
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* <Dead-end>*/}
        <NavigationMenuItem>
          <Link href="/application/inventory" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Inventory
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        {/* <Dead-end>*/}
        {/* <NavigationMenuItem>
          <Link href="/application/announcement" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Announcements
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {/* <Dead-end>*/}
        {/* <NavigationMenuItem>
          <Link href="/application/settings" legacyBehavior passHref>
            <NavigationMenuLink
              className={`bg-transparent ${navigationMenuTriggerStyle()}`}
            >
              Settings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem> */}
        {/* <Dead-end>*/}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
