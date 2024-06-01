import dashboardIcon from "@/icons/dashboard-icon.svg";
import transactionsIcon from "@/icons/transactions-icon.svg";
import inventoryIcon from "@/icons/inventory-icon.svg";
import announcementIcon from "@/icons/announcements-icon.svg";
import managementIcon from "@/icons/management-icon.svg";
import analyticsIcon from "@/icons/analytics-icon.svg";
import reportsIcon from "@/icons/reports-icon.svg";

import settingsIcon from "@/icons/settings-icon.svg";

export const sideLinks = [
  {
    title: "Dashboard",
    href: "/application",
    icon: dashboardIcon,
  },
  {
    title: "Requests",
    href: "/application/requests",
    icon: transactionsIcon,
  },
  {
    title: "Inventory",
    href: "/application/inventory",
    icon: inventoryIcon,
  },
  {
    title: "Employees",
    href: "/application/employees",
    icon: managementIcon,
  },
  {
    title: "Announcements",
    href: "/application/announcements",
    icon: announcementIcon,
  },
];

export const systemLinks = [
  {
    title: "Settings",
    href: "/application/settings",
    icon: settingsIcon,
  },
];
