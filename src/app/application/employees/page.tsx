/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEmployees } from "@/hooks/useEmployees";
import { useRoles } from "@/hooks/useRoles";
import { useDispatch } from "react-redux";
import EmployeesContent from "./employees-content";
import Loading from "./skeleton";
import { toast } from "@/components/ui/use-toast";
import { toast as sonner } from "sonner";
import { useEffect } from "react";
import createSupabaseBrowserClient from "@/lib/supabase/client";

export default function Page() {
  const dispatch = useDispatch();
  const { getEmployees, allEmployeesData } = useEmployees();
  const { getRoles, allRolesData } = useRoles();

  useEffect(() => {
    const { error } = getEmployees();
    if (error?.message) {
      toast({
        variant: "destructive",
        title: "⚠️ Error",
        description: error.message,
      });
    }
    getRoles();
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    const subscribedChannel = supabase
      .channel("employees-follow-up")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "employees" },
        (payload: any) => {
          getEmployees();
          sonner("Announcment", {
            description: `${payload.new.first_name} ${payload.new.last_name} has been updated`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscribedChannel);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-start place-items-center w-full h-full gap-0 p-0">
        <div className="space-y-2 w-[90%] h-fit bg-opacity-85 p-4 rounded-2xl">
          <div className="w-full flex justify-center py-3.5 no-scrollbar ">
            {allEmployeesData.length === 0 ? (
              <Loading />
            ) : (
              <EmployeesContent
                dataEmployees={allEmployeesData}
                roles={allRolesData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
