"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const signInWithEmail = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error: backendError } = await supabase.auth.signInWithPassword(data);

  if (backendError) {
    if (backendError.status === 400)
      if (backendError.message === "Email not confirmed") {
        return {
          errors: {
            emailNotConfirmed: true,
          },
        };
      } else if (backendError.message === "Invalid login credentials") {
        return { errors: { invalidCredentials: true } };
      }
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};

export { signInWithEmail };
