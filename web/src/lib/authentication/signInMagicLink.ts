"use server";

import { createClient } from "@/utils/supabase/server";

const signInMagicLink = async (formData: FormData) => {
  const supabase = createClient();
  // https://supabase.com/docs/guides/auth/auth-email-passwordless

  const { data, error } = await supabase.auth.signInWithOtp({
    email: "example@email.com",
    options: {
      // set this to false if you do not want the user to be automatically signed up
      shouldCreateUser: false,
    },
  });
};

export { signInMagicLink };
