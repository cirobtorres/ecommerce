import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoTicketSharp, IoHeart, IoApps, IoCartSharp } from "react-icons/io5";
import { MdEmail, MdLocalShipping } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { getUserData } from "@/lib/user-data";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function UserPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <>
      <UserData token={session.accessToken} />
      <Resume />
      <Shorcuts />
    </>
  );
}

const UserData = async ({ token }: { token: string }) => {
  const user = await getUserData(token);
  return <Greetings {...user} />;
};

const Greetings = ({
  id,
  firstName,
  lastName,
  birthAt,
  cpf,
  phone,
  email,
  password,
  createdAt,
  updatedAt,
  privacyPolicy,
  privileges,
  active,
}: {
  id: number;
  firstName: string;
  lastName: string;
  birthAt: string;
  cpf: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  privacyPolicy: boolean;
  privileges: number;
  active: boolean;
}) => {
  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-1 flex-row items-center justify-between gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
        <div className="relative rounded-full overflow-hidden cursor-pointer hover:shadow-darker transition ease-in duration-300 group">
          <Image
            // src={image ?? "/images/user-not-signed-in/1281x1281-user-icon.png"}
            src={"/images/user-not-signed-in/1281x1281-user-icon.png"}
            alt={`Avatar de ${firstName} ${lastName}`}
            width={64}
            height={64}
          />
          <FaCamera className="absolute bottom-2 left-1/2 -translate-x-1/2 text-transparent group-hover:text-white transition ease-in duration-300" />
        </div>
        <div className="flex-1">
          <h2 id="userName" className="text-2xl font-bold">
            <strong className="text-theme-07">{`${firstName} ${lastName}`}</strong>
          </h2>
          <span id="userEmail" className="flex flex-row items-center gap-1">
            <MdEmail />
            <strong>{email}</strong>
          </span>
        </div>
        <Link href="/">
          <FaGear className="text-2xl text-theme-07" />
        </Link>
      </div>
      <div className="flex flex-1 flex-col gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
        <h2 className="text-2xl font-bold">Endereço atual</h2>
        <div className="flex flex-col text-sm text-theme-03">
          <span>Rua João das Dores</span>
          <span>Número 123, Doutor Socorro Nascimento</span>
          <span>Comércio</span>
          <span>CEP 47500-150 - São Paulo, SP</span>
        </div>
      </div>
    </div>
  );
};

// const Greetings = ({
//   user: { name, email, image },
// }: {
//   user: {
//     name: string;
//     email: string;
//     image: string | null;
//   };
// }) => {
//   return (
//     <div className="flex flex-row gap-3">
//       <div className="flex flex-1 flex-row items-center justify-between gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
//         <div className="relative rounded-full overflow-hidden cursor-pointer hover:shadow-darker transition ease-in duration-300 group">
//           <Image
//             src={image ?? "/images/user-not-signed-in/1281x1281-user-icon.png"}
//             alt={`Avatar de ${name}`}
//             width={64}
//             height={64}
//           />
//           <FaCamera className="absolute bottom-2 left-1/2 -translate-x-1/2 text-transparent group-hover:text-white transition ease-in duration-300" />
//         </div>
//         <div className="flex-1">
//           <h2 id="userName" className="text-2xl font-bold">
//             <strong className="text-theme-07">{name}</strong>
//           </h2>
//           <span id="userEmail" className="flex flex-row items-center gap-1">
//             <MdEmail />
//             <strong>{email}</strong>
//           </span>
//         </div>
//         <Link href="/">
//           <FaGear className="text-2xl text-theme-07" />
//         </Link>
//       </div>
//       <div className="flex flex-1 flex-col gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
//         <h2 className="text-2xl font-bold">Endereço atual</h2>
//         <div className="flex flex-col text-sm text-theme-03">
//           <span>Rua João das Dores</span>
//           <span>Número 123, Doutor Socorro Nascimento</span>
//           <span>Comércio</span>
//           <span>CEP 47500-150 - São Paulo, SP</span>
//         </div>
//       </div>
//     </div>
//   );
// };

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
