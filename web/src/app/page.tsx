import { getUserData } from "@/lib/getUserData";
import Body from "../components/Body";
import { createClient } from "../utils/supabase/server";

export default async function RefrigelHomePage() {
  // const { data, error } = await supabase.auth.getUser();
  const supabase = createClient();
  const { user } = await getUserData();

  return (
    <Body user={user}>
      <main className="flex items-center justify-center"></main>
    </Body>
  );
}
