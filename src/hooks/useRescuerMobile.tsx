import createSupabaseBrowserClient from "@/lib/supabase/client";
import { useState } from "react";

export const useRescuers: any = () => {
  const supabase = createSupabaseBrowserClient();
  const [allRescuerData, setAllRescuerData] = useState<any>([]);
  const [currentRescuerData, setCurrentRescuerData] = useState<any>([]);

  const getRescuers = async () => {
    const result = await supabase.from("employees").select(`
        id,
        email,
        first_name,
        last_name,
        image_url,
        address,
        contact_number,
        gender,
        roles:roles(id, role),
        status,
        dob
    `);

    const { data, error } = result;
    if (error) {
      return error;
    }
    return setAllRescuerData(data);
  };

  const signInWithEmailAndPassword = async (props: any, duration?: number) => {
    const result = await supabase
      .from("employees")
      .select(
        `
        id,
        email,
        first_name,
        last_name,
        image_url,
        address,
        contact_number,
        gender,
        roles:roles(id, role),
        status,
        dob
      `
      )
      .eq("email", props.email);
    if (result.error) return result;
    await new Promise((resolve) => setTimeout(resolve, duration));
    setCurrentRescuerData(result.data);
    return result;
  };

  const signUpWithEmailAndPassword = async (props: any, duration?: number) => {
    const result = await supabase
      .from("employees")
      .insert({
        first_name: props.first_name,
        last_name: props.last_name,
        email: props.email,
        position: props.position, // Ensure 'position' is still relevant or adjust accordingly
      })
      // Removed the redundant select() after insert as it's not needed for this operation
      .single(); // Use .single() if you're inserting one record and want to return it directly
    if (result.error) return result;
    await new Promise((resolve) => setTimeout(resolve, duration));
    return result;
  };

  const getRescuer = async (props: any, duration?: number) => {
    const { data, error } = await supabase
      .from("employees")
      .select(
        `
        id,
        email,
        first_name,
        last_name,
        image_url,
        address,
        contact_number,
        gender,
        roles:roles(id, role),
        status,
        dob
      `
      )
      .eq("email", props.email);
    if (error) return error;

    await new Promise((resolve) => setTimeout(resolve, duration));
    return setCurrentRescuerData(data);
  };

  return {
    // states
    allRescuerData,
    currentRescuerData,

    // methods
    getRescuer,
    getRescuers,
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
  };
};
