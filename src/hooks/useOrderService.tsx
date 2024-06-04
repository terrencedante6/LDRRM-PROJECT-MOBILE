/* eslint-disable react-hooks/rules-of-hooks */
import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useRequestServices: any = () => {
  const supabase = createSupabaseBrowserClient();

  const [requestServicesData, setRequestServicesData] = useState<any>([]);
  const [latestRequestServiceData, setLatestRequestServiceData] = useState<any>(
    []
  );
  const [currentRequestServiceData, setCurrentRequestServiceData] =
    useState<any>([]);
  const [
    currentRequestServiceDataTracking,
    setCurrentRequestServiceDataTracking,
  ] = useState<any>([]);

  const getRequestServicesLatest = async (props?: any) => {
    const result = await supabase
      .from("requests")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        employee:employees!public_requests_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!requests_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
    `
      )
      .eq("mobile_user_id", props.id)
      .order("created_at", { ascending: false })
      .limit(1);
    const { data, error } = result;
    if (error) {
      return error;
    }
    setLatestRequestServiceData(data);
    return result;
  };

  const getRequestServices = async (props: any, duration?: number) => {
    const { data, error } = await supabase
      .from("requests")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        redeemed,
        redeem_code,
        remarks,
        employee:employees!public_requests_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!requests_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_user:mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
        `
      )
      .eq("mobile_user_id", props.id)
      .order("created_at", { ascending: false });

    await new Promise((resolve) => setTimeout(resolve, duration));
    if (data?.length === 0) return true;
    setRequestServicesData(data);
    return error;
  };

  const getRequestServiceTracking = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .select(
        `
        id,
        customer_first_name,
        customer_last_name,
        customer_contact_number,
        customer_email,
        remarks,
        employee:employees!public_requests_employee_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          )
        ),
        supervisor:employees!requests_supervisor_id_fkey(
          id,
          first_name,
          last_name,
          image_url,
          contact_number,
          email,
          roles(
            role
          ),
          created_at
        ),
        inventory(
          id,
          branches("*"
          )
        ),
        purchase_products("*"
        ),
        purchase_parts("*"
        ),
        purchase_services("*"
        ),
        mobile_users("*"),
        mechanic_entries("*",
          mechanic:employees!mechanic_entries_employee_id_fkey(
            id,
            first_name,
            last_name,
            image_url,
            contact_number,
            email,
            roles(
              role
            )
          )
        ),
        vehicle_entries("*"),
        progress_entries("*"),
        image_entries("*"),
        subtotal,
        total_price,
        amount_paid,
        status,
        discount,
        tracking_id,
        rating,
        payment_method,
        created_at
    `
      )
      .eq("id", props.id)
      .order("created_at", { ascending: false })
      .limit(1);

    const { data, error } = result;
    if (error) {
      return error;
    }
    setCurrentRequestServiceData(data);
    return result;
  };

  const updateRequestServiceRating = async (props: any, duration?: number) => {
    const { setItem } = useLocalStorage("value");
    const result = await supabase
      .from("requests")
      .update({
        rating: props.rating,
      })
      .eq("id", props.id);

    const pointsResult = await supabase.rpc("increment_user_points", {
      user_id: props.user.id,
    });

    const userResult = await supabase
      .from("mobile_users")
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        password,
        image_url,
        dob,
        gender,
        address,
        contact_number,    
        created_at
      `
      )
      .eq("email", props.user.email)
      .select();

    setItem(userResult?.data?.[0]);
    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  const redeemRequestsService = async (props: any, duration?: number) => {
    const result = await supabase
      .from("requests")
      .select("id,redeem_code,redeemed")
      .eq("redeem_code", props.redeem_code);

    if (result?.data?.length === 0) {
      return { error: { message: "Invalid redeem code." } };
    }

    if (result?.data && result.data[0]?.redeemed === true) {
      return { error: { message: "Already redeemed." } };
    }

    const updateResult = await supabase
      .from("requests")
      .update({
        customer_email: props.user.email,
        customer_first_name: props.user.first_name,
        customer_last_name: props.user.last_name,
        customer_contact_number: props.user.contact_number,
        mobile_user_id: props.user.id,
        redeemed: true,
      })
      .eq("redeem_code", props.redeem_code);

    await new Promise((resolve) => setTimeout(resolve, duration));

    return result;
  };

  return {
    // states
    requestServicesData,
    currentRequestServiceData,
    currentRequestServiceDataTracking,
    latestRequestServiceData,

    // methods
    getRequestServices,
    getRequestServiceTracking,
    getRequestServicesLatest,

    updateRequestServiceRating,
  };
};
