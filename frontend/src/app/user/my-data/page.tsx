import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Address from "@/components/Address";
import MyData from "@/components/Inputs/MyData";
import { getUserData } from "@/lib/user-data";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FaClipboardList } from "react-icons/fa";

const ADDRESSES = [
  {
    responsible: "Jubileu Pereira",
    street: "Rua dos Bobos",
    num: 123,
    district: "Dr Bestão da Silva",
    reference: "Comércio",
    cep: "47500-150",
    city: "São Paulo",
    state: "SP",
    standard: true,
  },
  {
    responsible: "Exemplo da Silva Albuquerque",
    street: "Av 2 de Julho",
    num: 22,
    district: "Duque da Paixão",
    reference: "Casa",
    cep: "46123-456",
    city: "Rio de Janeiro",
    state: "RJ",
    standard: false,
  },
];

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
      <div className="flex gap-3 h-[42rem]">
        <MyData {...user} />
        <Address addresses={ADDRESSES} />
      </div>
    </section>
  );
}
