import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

type RequestProps = {
  requester_first_name: string | null;
  requester_last_name: string | null;
  requester_contact_number: string | null;
  coordinates: string;
  mobile_user_id: string;
  calamity_type: string;
};

export const useRequests = () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
  );
  const [requestsData, setRequestsData] = useState<any[]>([]);
  const [currentRequestData, setCurrentRequestData] = useState<any>(null);

  useEffect(() => {
    console.log("useRequests hook initialized");
  }, []);

  const createRequest = async (props: RequestProps, duration: number = 0) => {
    console.log("Inserting request:", props);

    try {
      const result = await supabase.from("requests").insert({
        requester_first_name: props.requester_first_name,
        requester_last_name: props.requester_last_name,
        requester_contact_number: props.requester_contact_number,
        coordinates: props.coordinates,
        mobile_user_id: props.mobile_user_id,
        status: "Ongoing",
        employees_id: null,
        calamity_type: props.calamity_type,
      });

      console.log("Insert result:", result);

      if (result.error) {
        console.error("Error inserting request:", result.error);
        return result.error;
      }

      await new Promise((resolve) => setTimeout(resolve, duration));
      console.log("Request creation delay completed");

      return result;
    } catch (error) {
      console.error("Exception caught:", error);
    }
  };

  const getRequests = async () => {
    console.log("Fetching requests");
    const result = await supabase
      .from("requests")
      .select(
        "*, employees(*, roles(*)), use_foodsupplies(*), use_equipments(*), use_vehicles(*)"
      )
      .order("created_at", { ascending: false });
    console.log("Fetch result:", result);

    if (result.error) {
      console.error("Error fetching requests:", result.error);
      return;
    }
    const { data } = result;
    setRequestsData(data);
    console.log("Requests data updated");
  };

  return {
    // states
    requestsData,
    currentRequestData,

    // methods
    createRequest,
    getRequests,
  };
};
