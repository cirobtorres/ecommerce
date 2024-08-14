"use server";

import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import {
  AddressData,
  CompanyData,
  PersonData,
  PersonType,
  RefrigelUser,
} from "@/types/user-types";

export const getUserData = async () => {
  async function getUserType(refrigel_user_id: string, user_type: "F" | "J") {
    if (user_type === "F") {
      const { data: personData, error: personError } = await supabase
        .from("person_data")
        .select("*")
        .eq("refrigel_user_id", refrigel_user_id)
        .single<PersonData>();
      delete personData?.refrigel_user_id;
      return {
        company_data: null,
        person_data: personData,
        userError: personError,
      };
    } else if (user_type === "J") {
      const { data: companyData, error: companyError } = await supabase
        .from("company_data")
        .select("*")
        .eq("refrigel_user_id", refrigel_user_id)
        .single<CompanyData>();
      delete companyData?.refrigel_user_id;
      return {
        company_data: companyData,
        person_data: null,
        userError: companyError,
      };
    } else {
      return {
        person_data: null,
        company_data: null,
        userError: "invalid user_type",
      };
    }
  }

  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authData && authData.user) {
    const { data: refrigelData, error: refrigelError } = await supabase
      .from("refrigel_users")
      .select("*")
      .eq("auth_user_id", authData.user.id)
      .single<PersonType>();

    if (refrigelError) {
      return { user: null, error: refrigelError };
    }

    const { data: addressData, error: addressError } = await supabase
      .from("addresses")
      .select("*")
      .eq("refrigel_user_id", refrigelData.id);

    if (
      addressError &&
      addressError.message !== 'relation "public.address" does not exist'
    ) {
      return { user: null, error: addressError };
    }

    delete refrigelData.auth_user_id;
    const user_type = refrigelData.user_type;

    const { person_data, company_data, userError } = await getUserType(
      refrigelData.id,
      user_type
    );

    if (userError || !(person_data || company_data)) {
      return { user: null, error: userError };
    }

    const user: RefrigelUser = {
      ...authData.user,
      refrigel_users: {
        ...refrigelData,
        person_data: { ...person_data },
        company_data: { ...company_data },
        address: addressData || [],
      },
    };

    return { user, error: null };
  } else {
    return { user: null };
  }
};
