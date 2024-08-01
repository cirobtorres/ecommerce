import RefrigelLogo from "../icons/logo";

export default async function RefrigelHomePage() {
  // https://supabase.com/dashboard/project/vlkhjudlrddavrkxdzkd/api?page=users
  // https://supabase.com/dashboard/project/vlkhjudlrddavrkxdzkd/auth/providers
  // https://supabase.com/docs/guides/auth/server-side/nextjs

  return (
    <main className="flex min-h-screen items-center justify-center">
      <RefrigelLogo color="#dadada" />
    </main>
  );
}
