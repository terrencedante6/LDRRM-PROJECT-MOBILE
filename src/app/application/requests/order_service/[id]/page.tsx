/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import EquipmentContent from "./part-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useEquipments } from "@/hooks/useEquipments";
// import { useBrands } from "@/hooks/useBrands";
import EquipmentNotFound from "./not-found";

export default function Equipment({ params }: { params: any }) {
  const { getEquipment, currentEquipmentData } = useEquipments();
  // const { getBrands, allBrandsData } = useBrands();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getEquipment(params.id, 2000);
      if (result) setError(result);
      // getBrands();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("part-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "equipments" },
          (payload: any) => {
            getEquipment(params.id, 0);
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
        <EquipmentNotFound />
      ) : currentEquipmentData.length === 0 ? (
        <Loading />
      ) : (
        <EquipmentContent
          params={params}
          equipment={currentEquipmentData}
          // brands={allBrandsData}
        />
      )}
    </div>
  );
}
