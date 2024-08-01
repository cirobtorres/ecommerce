import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/Buttons";
import { handleSignOut } from "@/lib/authenticationActions";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/entrar");
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <p className="text-white">{data.user.email}</p>
      <p className="text-white">{data.user.created_at}</p>
      <LogoutButton formAction={handleSignOut} />
    </main>
  );
}
