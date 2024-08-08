import Body from "../components/Body";
import { createClient } from "../utils/supabase/server";

export default async function RefrigelHomePage() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  return (
    <Body user={data.user}>
      <main className="flex items-center justify-center">
        {/* <RefrigelLogo size="720" color="#dadada" /> */}
      </main>
    </Body>
  );
}
