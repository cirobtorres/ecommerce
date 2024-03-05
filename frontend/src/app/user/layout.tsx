import QuickSideBar from "@/components/QuickSideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session || !session.user) redirect("/");

  return (
    <main className="relative flex w-full flex-1">
      <QuickSideBar />
      <div className="flex-1 mx-auto mb-12 max-w-userpage p-4">{children}</div>
    </main>
  );
}
