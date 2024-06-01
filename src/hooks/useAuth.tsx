import { z } from "zod";
import { employeeSchema } from "@/app/application/employees/add-employee/employee-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";

export function useAuth() {
  const signUpWithEmailAndPassword = async (
    data: z.infer<typeof employeeSchema>
  ) => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          storageKey: "s1",
        },
      }
    );

    const result = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          image_url: data.image_url,
          address: data.address,
          contact_number: data.contact_number,
          gender: data.gender,
          dob: data.dob,
          role: data.role,
        },
      },
    });

    return JSON.stringify(result);
  };

  async function signInWithEmailAndPassword(data: {
    email: string;
    password: string;
  }) {
    const supabase = await createSupabaseServerClient();
    const result = await supabase.auth.signInWithPassword(data);
    return JSON.stringify(result);
  }

  return { signUpWithEmailAndPassword, signInWithEmailAndPassword };
}
