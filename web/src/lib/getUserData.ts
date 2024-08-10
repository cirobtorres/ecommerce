import { User } from "@supabase/supabase-js";
import { createClient } from "../utils/supabase/server";
import {
  AddressData,
  PersonData,
  PersonType,
  RefrigelUser,
} from "@/types/user-types";

export const getUserData = async () => {
  const supabase = createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authData && authData.user) {
    const { data: refrigelData, error: refrigelError } = await supabase
      .from("refrigel_users")
      .select("*")
      .eq("auth_user_id", authData.user.id)
      .single<PersonType>();

    if (refrigelError) throw refrigelError;

    delete refrigelData.auth_user_id;

    const { data: personData, error: personError } = await supabase
      .from("person_data")
      .select("*")
      .eq("refrigel_user_id", refrigelData.id)
      .single<PersonData>();

    if (personError) throw personError;

    delete personData.refrigel_user_id;

    const { data: addressData, error: addressError } = await supabase
      .from("addresses")
      .select("*")
      .eq("refrigel_user_id", refrigelData.id);

    if (
      addressError &&
      addressError.message !== 'relation "public.address" does not exist'
    ) {
      throw addressError;
    }

    const user: RefrigelUser = {
      ...authData.user,
      refrigel_users: {
        ...refrigelData,
        person_data: { ...personData },
        address: addressData || [],
      },
    };

    return { user };
  } else {
    // console.log(
    //   "lib/getUserData.ts error ------------------------------\n",
    //   authError
    // );
    return { user: null };
  }
};
