import Link from "next/link";

import Image from "next/image";
import { FaUser } from "react-icons/fa6";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserLoginRegisterSection() {
  const { data: session } = useSession();
  return (
    <div className="relative flex gap-3 h-full flex-row items-center">
      {session?.user ? (
        <>
          <Link
            href="/"
            className="rounded-full border-2 border-theme-01 overflow-hidden"
          >
            <Image
              src={
                session.user.image ??
                "/images/user-not-signed-in/1281x1281-user-icon.png"
              }
              alt={`Avatar de ${session.user.name}`}
              width={32}
              height={32}
            />
          </Link>
          <div className="flex flex-col">
            {session.user.name}
            <div>
              <Link
                href="/"
                className="font-bold hover:underline uppercase after:border-r after:border-white after:mx-1"
              >
                Minha Conta
              </Link>
              <button onClick={() => signOut()} className="hover:underline">
                Sair
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <FaUser className="border-2 border-theme-01 p-0.5 rounded-full w-8 h-8" />
          <div className="flex h-full flex-col text-sm items-start justify-center">
            <Link href="/login" className="font-bold hover:underline">
              Entrar
            </Link>
            <Link href="/register" className="hover:underline">
              Criar uma conta
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
