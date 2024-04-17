import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoTicketSharp, IoHeart, IoApps, IoCartSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { getUserData } from "@/lib/user-data";
import { authOptions } from "../api/auth/[...nextauth]/route";
import GreetingsPF from "../../components/UserSession/GreetingsPF";
import GreetingsPJ from "../../components/UserSession/GreetingsPJ";

interface AddressProps {
  id: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  place: string;
  defaultAddress: boolean;
}

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const user = await getUserData(session.accessToken);
  const defaultAddress = user.address.filter(
    (address: AddressProps) => address.defaultAddress
  )[0];

  return (
    <>
      {user.PF ? <GreetingsPF {...user} /> : <GreetingsPJ {...user} />}
      <Resume />
      <Shorcuts />
    </>
  );
}

const Resume = () => {
  return (
    <div className="flex flex-col gap-3 mb-4">
      <h1 className="flex items-center gap-3 text-theme-07 text-2xl">
        <IoCartSharp />
        Resumo dos últimos pedidos
      </h1>
      <div className="flex flex-col bg-white rounded p-12 border border-light-gray shadow-generic">
        <div className="flex justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-sm uppercase font-bold">
              Número do Pedido
            </h2>
            <span className="text-center text-sm text-theme-03">
              #123456789
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-sm uppercase font-bold">Status</h2>
            <span className="text-center text-sm text-theme-08 font-bold">
              Concluído
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-sm uppercase font-bold">Data</h2>
            <span className="text-center text-sm text-theme-03">
              04/11/2020
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-center text-sm uppercase font-bold">
              Método de Pagamento
            </h2>
            <span className="text-center text-sm text-theme-07 font-bold">
              PIX
            </span>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col gap-3">
          <h2 className="text-sm uppercase font-bold">Endereço</h2>
          <div className="flex flex-col text-sm text-theme-03">
            <span>Rua João das Dores</span>
            <span>Número 123, Doutor Socorro Nascimento</span>
            <span>Comércio</span>
            <span>CEP 47500-150 - São Paulo, SP</span>
          </div>
        </div>
        <hr className="my-6" />
        <button className="ml-auto w-96 border border-theme-07 rounded text-theme-07 bg-white uppercase font-bold px-4 py-2">
          Ver todos os pedidos
        </button>
      </div>
    </div>
  );
};

const Shorcuts = () => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="flex items-center gap-3 text-theme-07 text-2xl">
        <IoApps />
        Atalhos
      </h1>
      <div className="flex flex-row justify-center gap-3">
        <Link
          href="/"
          className="text-theme-03 text-base font-bold flex flex-row justify-center items-center gap-1 bg-white rounded p-12 flex-1 border border-light-gray shadow-generic"
        >
          <MdLocalShipping className="text-theme-07" />
          Meus Pedidos
        </Link>
        <Link
          href="/"
          className="text-theme-03 text-base font-bold flex flex-row justify-center items-center gap-1 bg-white rounded p-12 flex-1 border border-light-gray shadow-generic"
        >
          <IoTicketSharp className="text-theme-07" />
          Protocolos
        </Link>
        <Link
          href="/"
          className="text-theme-03 text-base font-bold flex flex-row justify-center items-center gap-1 bg-white rounded p-12 flex-1 border border-light-gray shadow-generic"
        >
          <IoHeart className="text-theme-07" />
          Favoritos
        </Link>
      </div>
    </div>
  );
};
