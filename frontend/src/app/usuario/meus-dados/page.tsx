import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Address from "@/components/Address";
import MyDataPF from "@/components/Inputs/MyDataPF";
import { getUserData } from "@/lib/user-data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaClipboardList } from "react-icons/fa";
import MyDataPJ from "../../../components/Inputs/MyDataPJ";

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
      <div className="flex gap-3 max-h-[50rem]">
        {user.PF ? <MyDataPF {...user} /> : <MyDataPJ {...user} />}
        <Address
          user={user}
          addresses={user.address.sort(
            (addressA: AddressProps, addressB: AddressProps) =>
              addressA.id - addressB.id
          )}
          token={session.accessToken}
        />
      </div>
    </section>
  );
}
