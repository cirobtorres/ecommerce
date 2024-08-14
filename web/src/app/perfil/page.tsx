import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Body from "../../components/Body";
import { handleSignOut } from "../../lib/authentication/auth";
import { getUserData } from "../../lib/getUserData";

export default async function PrivatePage() {
  const supabase = createClient();

  // const { data, error } = await supabase.auth.getUser();
  const { user, error } = await getUserData();

  if (error || !user) {
    redirect("/");
  }

  return (
    <Body user={user}>
      <main className="flex flex-col items-center justify-center">
        <form>
          <button formAction={handleSignOut}>Sair</button>
        </form>
      </main>
    </Body>
  );
}
