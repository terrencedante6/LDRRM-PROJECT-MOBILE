"use client";

import Image from "next/image";

import type { Viewport } from "next";
import Link from "next/link";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { redirect } from "next/navigation";
import { useRequestServices } from "@/hooks/useOrderService";
import { toast } from "@/components/ui/use-toast";
import createSupabaseBrowserClient from "@/lib/supabase/client";
// import RequestForm from "./rescuemepage-content";
import { useRequests } from "@/hooks/useOrders";
import LocationSearch from "./LocationSearch";
import form from "antd/es/form";
import { allPurchaseRequestsDisplay } from "@/types";
import { cn } from "@/lib/utils";
import router from "next/router";
import { useForm } from "react-hook-form";
// import LocateDevice from "./locatedevice";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Page() {
  const { data: requests, error } = useRequests(); // Step 2
  const { getItem } = useLocalStorage("value");
  const currentUser = getItem();

  const [notificationCounter, setNotificationCounter] = useState(0);
  const { getRequestServicesLatest, latestRequestServiceData } =
    useRequestServices();

  useEffect(() => {
    const initialFetch = async () => {
      const result = getRequestServicesLatest(currentUser);
    };
    initialFetch();
    if (!currentUser) {
      redirect("/auth");
    }
  }, []);

  useEffect(() => {
    if (latestRequestServiceData.length > 0) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel(`latest-service-requests-follow-up-${currentUser.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requests",
            filter: `mobile_user_id=eq.${currentUser.id}`,
          },
          (payload: any) => {
            getRequestServicesLatest(currentUser);
          }
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "requests",
            filter: `request_id=eq.${latestRequestServiceData[0].id}`,
          },
          (payload: any) => {
            getRequestServicesLatest(currentUser, 0);
            setNotificationCounter((prev) => prev + 1);

            setTimeout(() => {
              toast({
                className: cn(
                  "top-0 left-0 right-0 mx-auto max-w-[350px] rounded-2xl py-3 px-7 flex fixed top-3 md:top-4 bg-applicationPrimary text-white shadow-xl border-transparent font-medium"
                ),
                title: "📣 Notification",
                description: `Latest request has been updated!`,
              });
            }, 500);
          }
        )
        .subscribe();
      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, [latestRequestServiceData]);

  const { control } = useForm();

  return (
    <div className="flex flex-row gap-4 px-4 py-2 w-full">
      <div className="flex flex-col">
        <div
          className="flex flex-col gap-4 w-full place-items-center justify-start p-6 relative"
          style={{ backgroundColor: "rgb(18,18,18)" }}
        >
          <h1 className="text-white font-bold text-3xl">Rescuers</h1>

          <div className="w-full h-fit flex flex-col gap-4">
            {requests &&
              requests.map(
                (
                  request: {
                    id: Key | null | undefined;
                    title:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                    description:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<AwaitedReactNode>
                      | null
                      | undefined;
                  } // Step 4
                ) => (
                  <div key={request.id}>
                    <h2>{request.title}</h2>
                    <p>{request.description}</p>
                  </div>
                )
              )}

            <LocationSearch control={control} />
          </div>
        </div>
      </div>
    </div>
  );
}
