"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function signInWithEmail(formData: FormData) {
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
}

export async function signInMagicLink(formData: FormData) {
  const supabase = createClient();
  // https://supabase.com/docs/guides/auth/auth-email-passwordless
}

interface FormState {
  errors: { [k: string]: boolean } | null;
}

export async function signUpWithEmail(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createClient();

  const invalidDatas = {
    email: false,
    password: false,
    passwordsNotMatch: false,
    name: false,
    cpf: false,
    birthDate: false,
    gender: false,
    phone: false,
    agreedDataPolicies: false,
  };

  const userType = formData.get("radio_type") as string;

  if (userType === "PF") {
    const email = formData.get("email") as string;
    const password = formData.get("password1") as string;
    const passwordConfirmation = formData.get("password2") as string;
    const name = formData.get("name") as string;
    const cpf = formData.get("cpf") as string;
    const birthDate = formData.get("birth-date") as string;
    const gender = formData.get("gender") as string;
    const phone = formData.get("phone") as string;
    const agreedDataPolicies = formData.get("refrigel-privacy-policies")
      ? true
      : false;
    const allowEmailNewsletter = formData.get("refrigel-newsletter")
      ? true
      : false; // Optional

    if (!email) invalidDatas.password = true;
    if (!password) invalidDatas.password = true;
    if (password !== passwordConfirmation)
      invalidDatas.passwordsNotMatch = true;
    if (!name) invalidDatas.name = true;
    if (!cpf) invalidDatas.cpf = true;
    if (!birthDate) invalidDatas.birthDate = true;
    if (gender === "Gênero") invalidDatas.gender = true;
    if (!phone) invalidDatas.phone = true;
    if (!agreedDataPolicies) invalidDatas.agreedDataPolicies = true;

    const errors = Object.fromEntries(
      Object.entries(invalidDatas).filter((attr) => {
        if (attr[1]) return attr;
      })
    );

    if (Object.keys(errors).length !== 0) return { errors };

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: password,
    });

    if (authError) {
      redirect("/error");
    }

    const authUserId = authData.user?.id;

    const { data: refrigelUser, error: refrigelUserError } = await supabase
      .from("refrigel_users")
      .insert([
        {
          auth_user_id: authUserId,
          user_type: "F",
          privileges: 1,
          allow_email_newsletter: allowEmailNewsletter,
          agreed_data_policies: agreedDataPolicies,
        },
      ])
      .select()
      .single();

    if (refrigelUserError) {
      redirect("/error");
    }

    const refrigelUserId = refrigelUser.id;

    const { error: personDataError } = await supabase
      .from("person_data")
      .insert([
        {
          user_id: refrigelUserId,
          name,
          cpf,
          // rg,
          birth_date: birthDate,
          gender,
        },
      ]);

    if (personDataError) {
      redirect("/error");
    }
  } else if (userType === "PJ") {
  } else {
    throw new Error("Something went wrong");
  }

  // return { errors: {} };
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGoogle() {
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
}

export async function signInWithFacebook() {
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
}

export async function signInWithApple() {
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
}

export async function handleSignOut() {
  const supabase = createClient();
  let { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  // revalidatePath("/", "layout");
  // redirect("/");
}
