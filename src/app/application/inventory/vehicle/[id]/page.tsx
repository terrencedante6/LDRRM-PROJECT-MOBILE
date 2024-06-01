/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import VehicleContent from "./vehicle-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useVehicles } from "@/hooks/useVehicles";
import VehicleNotFound from "./not-found";

export default function Vehicle({ params }: { params: any }) {
  const { getVehicle, currentVehicleData } = useVehicles();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getVehicle(params.id, 2000);
      if (result) setError(result);
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("vehicle-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "vehicles" },
          (payload: any) => {
            getVehicle(params.id, 0);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(subscribedChannel);
      };
    }
  }, []);

  return (
    <div className="w-full flex justify-center place-items-center">
      {error ? (
        <VehicleNotFound />
      ) : currentVehicleData.length === 0 ? (
        <Loading />
      ) : (
        <VehicleContent params={params} vehicle={currentVehicleData} />
      )}
    </div>
  );
}
