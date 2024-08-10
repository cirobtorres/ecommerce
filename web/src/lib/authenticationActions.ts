"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const signInWithEmail = async (formData: FormData) => {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};

const signInMagicLink = async (formData: FormData) => {
  const supabase = createClient();
  // https://supabase.com/docs/guides/auth/auth-email-passwordless
};

const signInWithGoogle = async () => {
  const supabase = createClient();

  let { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

const signInWithFacebook = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

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

const handleSignOut = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
};

export {
  signInWithEmail,
  signInMagicLink,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  handleSignOut,
};
