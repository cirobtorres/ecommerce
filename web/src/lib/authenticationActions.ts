"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { fetchSignUp } from "./fetchUserData";

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

const clearCpfMask = (cpf: string) => {
  return cpf.replace(/\D/g, "");
};

const formatDate = (date: string) => {
  const dateTemplate = date.split("/");
  return dateTemplate[2] + "/" + dateTemplate[1] + "/" + dateTemplate[0];
};

const clearPhoneMask = (phone: string) => {
  return phone.replace(/\D/g, "");
};

const signUpWithEmail = async (
  state: State,
  formData: FormData
): Promise<State> => {
  const userType = formData.get("radio_type") as string;

  if (userType === "PF") {
    // Get datas --------------------------------------------------
    const email = formData.get("email") as string;
    const password = formData.get("password1") as string;
    const passwordConfirmation = formData.get("password2") as string;
    const passwordRules: PassErrorState = JSON.parse(
      formData.get("password-rules") as string
    );
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

    // Validations --------------------------------------------------
    // A value of true means there is an error on the form
    const invalidDatasInitialState = {
      emailBlankError: false,
      emailExistError: false,
      passwordBlankError: false,
      passwordsNotMatchError: false,
      nameBlankError: false,
      cpfBlankError: false,
      cpfInvalidError: false,
      cpfExistError: false,
      birthDateBlankError: false,
      birthDateInvalidError: false,
      phoneBlankError: false,
      agreedDataPolicies: false,
    };

    const invalidDatas = { ...invalidDatasInitialState, ...passwordRules };

    // Password --------------------------------------------------
    if (!password) invalidDatas.passwordBlankError = true;
    if (password !== passwordConfirmation) {
      invalidDatas.passwordsNotMatchError = true;
    }

    if (!email) {
      // Email --------------------------------------------------
      invalidDatas.emailBlankError = true;
    } else {
      const doesEmailExists = await fetch(
        "http://localhost:8000/api/auth/person/exists/email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!doesEmailExists.ok) {
        invalidDatas.emailExistError = true;
      }
    }

    // CPF --------------------------------------------------
    if (!cpf) {
      invalidDatas.cpfBlankError = true;
    } else {
      const doesCpfExists = await fetch(
        "http://localhost:8000/api/auth/person/exists/cpf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cpf: clearCpfMask(cpf) }),
        }
      );

      if (!doesCpfExists.ok) {
        await doesCpfExists.json().then((error) => {
          if (error.message === "CPF invalid")
            invalidDatas.cpfInvalidError = true;
          if (error.message === "CPF exists") invalidDatas.cpfExistError = true;
        });
      }
    }

    if (!name) {
      invalidDatas.nameBlankError = true;
    }

    // Birth date --------------------------------------------------
    if (!birthDate) {
      invalidDatas.birthDateBlankError = true;
    } else {
      const dateRegex =
        /^(?:(?:(?:19|20)\d\d)[\-\/](?:(?:0[13578]|1[02])[\-\/](?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)[\-\/](?:0[1-9]|[12]\d|30)|02[\-\/](?:0[1-9]|1\d|2[0-8]))|(?:19|20)(?:[02468][048]|[13579][26])[\-\/]02[\-\/]29)$/;

      // The backend only accepts date on these following formats: yyyy/mm/dd or yyyy-mm-dd
      if (!dateRegex.test(formatDate(birthDate))) {
        invalidDatas.birthDateInvalidError = true;
      }
    }

    // Phone --------------------------------------------------
    if (!phone) {
      invalidDatas.phoneBlankError = true;
    }

    // Data Policies --------------------------------------------------
    if (!agreedDataPolicies) invalidDatas.agreedDataPolicies = true;

    // Errors --------------------------------------------------
    // Loop through invalidDatas object and filter for any true atribute
    // rebuilding a new object called error and return it if any exists
    const errors = Object.fromEntries(
      Object.entries(invalidDatas).filter((attr) => {
        if (attr[1]) return attr;
      })
    );

    if (Object.keys(errors).length !== 0) return { errors };

    // Fetch --------------------------------------------------
    const body = {
      email,
      password,
      phone: clearPhoneMask(phone),
      name,
      cpf: clearCpfMask(cpf),
      gender,
      birth_date: formatDate(birthDate),
      allow_email_newsletter: allowEmailNewsletter,
      agreed_data_policies: agreedDataPolicies,
    };

    // const signUpResponse = await fetchSignUp(body);

    // console.log(signUpResponse);
  } else if (userType === "PJ") {
  } else {
    throw new Error("Something went wrong");
  }

  revalidatePath("/", "layout");
  redirect("/");
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
  signUpWithEmail,
  signInWithGoogle,
  signInWithFacebook,
  signInWithApple,
  handleSignOut,
};
