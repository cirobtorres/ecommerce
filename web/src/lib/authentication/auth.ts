"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const handleSignOut = async () => {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
};

const handlePasswordReset = async (email: string) => {
  const supabase = createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "http://localhost:3000/reset-password",
  });
};

const handleNewConfirmationLink = async ({
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

  return newEmailLinkResponse.ok;
};

const handlePasswordResetLink = async ({ data }: { data: string }) => {
  const newEmailLinkResponse = await fetch(
    "http://localhost:8000/api/auth/person/reset-password",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }
  );
};

const handlePasswordChange = async (state: State, formData: FormData) => {
  function searchForAnyErrors(errorObj: { [key: string]: boolean }) {
    // Errors --------------------------------------------------
    // Loop through invalidDatas object and filter for any true atribute
    // rebuilding a new object called error and return it if any exists
    const errors = Object.fromEntries(
      Object.entries(errorObj).filter((attr) => {
        if (attr[1]) return attr;
      })
    );

    if (Object.keys(errors).length !== 0) return { errors };

    return false;
  }

  const password1 = formData.get("password1");
  const passwordConfirmation = formData.get("password2");
  const passwordRules: PassErrorState = JSON.parse(
    formData.get("password-rules") as string
  );

  const invalidDatas = {
    passwordBlankError: false,
    passwordsNotMatchError: false,
    ...passwordRules,
  };

  if (!password1) {
    invalidDatas.passwordBlankError = true;
  }
  if (password1 !== passwordConfirmation) {
    invalidDatas.passwordsNotMatchError = true;
  }

  // Errors --------------------------------------------------
  const errors = searchForAnyErrors(invalidDatas);
  if (errors) return errors;

  // Fetch --------------------------------------------------
  const passwordResetResponse = await fetch(
    "http://localhost:8000/api/auth/user/password-update",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: password1 }),
    }
  );

  if (!passwordResetResponse.ok)
    throw new Error(
      `${passwordResetResponse.status} ${passwordResetResponse.statusText}`
    );

  revalidatePath("/", "layout");
  redirect("/");
};

export {
  handleSignOut,
  handlePasswordResetLink,
  handlePasswordChange,
  handleNewConfirmationLink,
};
