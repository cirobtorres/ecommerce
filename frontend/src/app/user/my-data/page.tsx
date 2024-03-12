import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MyData from "@/components/Inputs/MyData";
import { getUserData } from "@/lib/user-data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaClipboardList } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";

export default async function MyDataPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const user = await getUserData(session.accessToken);

  return (
    <section className="flex flex-col gap-3">
      <h1 className="flex items-center gap-3 text-theme-07 text-2xl my-4">
        <FaClipboardList /> Meus Dados
      </h1>
      <div className="flex gap-3">
        <MyData {...user} />
        <Address />
      </div>
    </section>
  );
}

const Address = () => {
  return (
    <div className="flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
    </div>
  );
};
