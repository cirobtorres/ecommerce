import { createClient } from "../utils/supabase/server";

export const getUserData = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};
