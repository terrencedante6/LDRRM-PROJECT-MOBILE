/* eslint-disable react-hooks/rules-of-hooks */
//navbar for mobile view
"use client";

import React from "react";
import { GoAlert, GoHomeFill } from "react-icons/go";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { pathNameFilter } from "@/hooks/pathNameFilter";
import Link from "next/link";

export default function page() {
  const router = useRouter();
  const navItems = [
    {
      id: 1,
      icon: <GoHomeFill className="text-xl text-white" />,
      title: "Application",
      link: "/application",
    },
    {
      id: 2,
      icon: <GoAlert className="text-xl text-white" />,
      title: "Requests",
      link: "/application/requests",
    },
    {
      id: 3,
      icon: <FaHandHoldingMedical className="text-xl text-white" />,
      title: "Services",
      link: "/application/rescuemepage",
    },
    {
      id: 4,
      icon: <FaRegUserCircle className="text-xl text-white" />,
      title: "Profile",
      link: "/application/profile",
    },
  ];

  const pathname = usePathname();

  return (
    <div
      className="w-full h-[100px] flex justify-center place-items-center fixed bottom-0 py-5 px-[1.25rem] rounded-t-[15px] z-50"
      style={{ backgroundColor: "rgb(31,31,31)" }}
    >
      <div className="w-full h-full flex px-.8 justify-between place-items-center">
        {navItems.map((item) => {
          const { link } = item;
          return (
            <span
              key={item.id}
              onClick={() => router.push(link)}
              className={`flex flex-col justify-center place-items-center hover:bg-applicationPrimary primary-glow transition-all duration-300 w-14 h-14 rounded-2xl hover:scale-110 cursor-pointer active:scale-95 bg-${
                link.toLowerCase() === pathname
                  ? "applicationPrimary scale-110"
                  : link
                      .toLowerCase()
                      .includes(pathNameFilter(pathname).toLowerCase())
                  ? "applicationPrimary scale-110"
                  : "transparent"
              }`}
            >
              {item.icon}
            </span>
          );
        })}
      </div>
    </div>
  );
}
