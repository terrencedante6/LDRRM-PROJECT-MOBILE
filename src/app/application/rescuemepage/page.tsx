"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useRequestServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import RequestForm from "./rescuemepage-content";
import { useRequests } from "@/hooks/useOrders";
import LocateDevice from "./locatedevice";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Requests() {
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [error, setError] = useState(false);
  const { getRequests, requestsData } = useRequests();
  useEffect(() => {
    const initialFetch = async () => {
      const result = getRequests(currentUser);
      if (result) setError(result);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const requests = await getRequests(currentUser);
      if (requests && requests.length > 0) {
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
              getRequests(currentUser);
            }
          )
          .subscribe();
        return () => {
          supabase.removeChannel(subscribedChannel);
        };
      }
    };

    fetchRequests();
  }, [getRequests, currentUser]);

  return (
    <div className="flex flex-col gap-4 w-full place-items-center justify-start px-4 relative">
      <div className="w-full h-fit flex flex-col justify-between px-2 relative">
        <div className="w-full flex flex-col py-6 sticky top-0 bg-darkBg z-[50]">
          <h1 className="text-start text-2xl text-white font-bold">Forms</h1>
          <p className="text-white text-sm">
            Forms for requesting rescue & also options to call the line
          </p>
        </div>

        <div>
          <RequestForm requestData={requestsData} />
        </div>

        <div className="flex flex-col gap-3">
          <label className="text-sm font-bold text-white pointer-events-none mt-4">
            Call for help
          </label>
          <p className="text-base text-white italic">
            Would you like to call Amlan Emergency Hotlines Directly for help?
            Click the button below.
          </p>
          <Link href="./rescuemepage/callforhelp">
            <button className="w-[30%] rounded-md h-[40px] bg-emerald-600 transform active:scale-95 transition-transform text-sm text-white font-bold text-center cursor-pointer">
              Call for help
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
