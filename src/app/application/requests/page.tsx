"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";
import RequestsContent from "./requests-content";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRequestServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useRequests } from "@/hooks/useOrders";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Requests() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [error, setError] = useState(false);
  const { getRequest, currentRequestData } = useRequests();

  // useEffect(() => {
  //   const initialFetch = async () => {
  //     const result = getRequest(currentUser);
  //     if (result) setError(result);
  //   };
  //   initialFetch();
  //   if (!currentUser) {
  //     redirect("/auth");
  //   }
  // }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`service-mobile-orders-follow-up-${currentUser.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requests",
            filter: `mobile_user_id=eq.${currentUser.id}`,
          },
          (payload: any) => {
            getRequest(currentUser);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full place-items-center justify-start px-4 relative">
      <div className="w-full h-fit flex flex-col justify-between px-2 relative">
        <div className="w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]">
          <h1 className="text-start text-2xl text-white font-bold">
            Recent Requests
          </h1>
          <p className="text-white text-sm">
            View all your recent request here.
          </p>
        </div>

        <RequestsContent request={currentRequestData} />
      </div>
    </div>
  );
}
