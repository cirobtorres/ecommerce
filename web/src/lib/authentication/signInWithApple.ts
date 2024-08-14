"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const signInWithApple = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export { signInWithApple };
