import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { handleSignOut } from "../../lib/authenticationActions";
import Body from "../../components/Body";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <Body user={data.user}>
      <main className="flex flex-col items-center justify-center">
        <form>
          <button formAction={handleSignOut}>Sair</button>
        </form>
      </main>
    </Body>
  );
}
