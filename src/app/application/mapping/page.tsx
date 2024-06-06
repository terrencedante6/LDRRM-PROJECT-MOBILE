"use client";

import Image from "next/image";

import type { Viewport } from "next";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Profile() {
  const [isPending, startTransition] = useTransition();
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();
  const { removeItem } = useLocalStorage("value");
  const onSignOut = async () => {
    toast({
      className: cn(
        "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-blue-600 text-white shadow-xl border-transparent font-medium"
      ),
      title: "Logging out...",
      description: `Come back soon!`,
    });
    startTransition(async () => {
      // wait for 2 seconds
      await new Promise((resolve) => setTimeout(resolve, 2000));
      removeItem();
      redirect("/auth/login");
    });
  };

  return (
    <div className="flex flex-col gap-4 min-h-[80vh] w-full place-items-center justify-between py-8 p-4 relative">
      <div className="w-full flex flex-col gap-4 place-items-center justify-center">
        <div className="w-full flex flex-col gap-1">
          <h1 className="text-3xl font-bold w-full text-center text-white">
            Coming Soon..
          </h1>
        </div>
      </div>
    </div>
  );
}
