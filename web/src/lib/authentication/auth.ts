"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

const handleSignOut = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
};

const GenerateNewConfirmationLink = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const newEmailLinkResponse = await fetch(
    "http://localhost:8000/api/auth/person/generate-email-link",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const { properties, user, error } = await newEmailLinkResponse.json();

  if (error) {
    throw error;
  }

  properties.action_link;
  return newEmailLinkResponse.ok;
};

export { handleSignOut, GenerateNewConfirmationLink };
