"use client";

import { useEffect, useState } from "react";
import Loading from "./skeleton";
import UserContent from "./user-content";
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useEmployees } from "@/hooks/useEmployees";
import { useRoles } from "@/hooks/useRoles";
import EmployeeNotFound from "./not-found";
import { useRouter } from "next/navigation";
import { ROLES } from "@/lib/actions/roles";
import { useDispatch, useSelector } from "react-redux";
import { useAuthMiddleware } from "@/lib/actions/useMiddleware";

export default function Page({ params }: { params: any }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { ADMINISTRATOR, STAFF } = ROLES;
  const currentSession = useSelector((state: any) => state.currentSession);
  const access = useAuthMiddleware([ADMINISTRATOR, STAFF], currentSession);
  if (params.id !== currentSession?.id) {
    router.push(access.defaultRoute);
    return (
      <div className="w-full h-full flex justify-center place-items-center">
        <h1 className="text-xl font-semibold text-slate-200 text-center">
          Unauthorized
        </h1>
      </div>
    );
  }

  const [error, setError] = useState(null);
  const { getEmployee, currentEmployeeData } = useEmployees();
  const { getRoles, allRolesData } = useRoles();

  useEffect(() => {
    const initialFetch = async () => {
      const result = await getEmployee(params.id, 1000);
      if (result) setError(result);
      getRoles();
    };

    initialFetch();
  }, [params]);

  useEffect(() => {
    if (!error) {
      const supabase = createSupabaseBrowserClient();
      const subscribedChannel = supabase
        .channel("employee-follow-up")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "employees",
            filter: `id=eq.${params.id}`,
          },
          (payload: any) => {
            getEmployee(params.id, 0);
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
        <EmployeeNotFound />
      ) : currentEmployeeData.length === 0 ? (
        <Loading />
      ) : (
        <UserContent
          params={params}
          employee={currentEmployeeData}
          roles={allRolesData}
          currentSession={currentSession}
        />
      )}
    </div>
  );
}
