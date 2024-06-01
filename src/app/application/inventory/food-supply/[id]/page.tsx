/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import FoodSupplyContent from "./food-supply-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useFoodSupplies } from "@/hooks/useFoodSupplies";
import FoodSuppliesNotFound from "./not-found";

export default function FoodSupplies({ params }: { params: any }) {
  const { getFoodSupply, currentFoodSupplyData } = useFoodSupplies();
  const [error, setError] = useState(false);

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getFoodSupply(params.id, 2000);
      if (result) setError(result);
      // getBrands();
    };

    initialFetch();
  }, []);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("food-supply-follow-up")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "food_supplies" },
          (payload: any) => {
            getFoodSupply(params.id, 0);
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
        <FoodSuppliesNotFound />
      ) : currentFoodSupplyData.length === 0 ? (
        <Loading />
      ) : (
        <FoodSupplyContent params={params} foodSupply={currentFoodSupplyData} />
      )}
    </div>
  );
}
