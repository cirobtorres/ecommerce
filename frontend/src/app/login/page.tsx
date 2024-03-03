"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import Input from "@/components/Inputs/Input";
import Loader from "@/components/Loader";
import PasswordInput from "@/components/Inputs/PasswordInput";
import {
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

// https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

export default function LoginPage(): JSX.Element {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (login: string, password: string) => {
    if (!login || !password) {
      setError("Preencha os campos de login");
      return;
    }
    const response = await signIn("credentials", {
      login,
      password,
      redirect: false,
    });
    if (!response?.ok) {
      setError("E-mail, CPF, CNPJ ou senha inválido!");
      return;
    }
    router.push("/");
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    await handleLogin(login, password);
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-8 mb-auto flex w-full h-full max-w-login-form flex-col text-center">
      <h2 className="mb-8 uppercase text-theme-07">Fazer Login</h2>
      <div>
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
          <Input
            id="loginInput"
            name="loginInput"
            label="E-mail, CPF ou CNPJ"
            value={login}
            setValue={setLogin}
          />
          <PasswordInput
            id="passowrd"
            name="passowrd"
            label="Senha"
            isRequired={false}
            value={password}
            setValue={setPassword}
          />
          <button
            type="submit"
            className={`mx-auto flex items-center justify-center p-4 w-full h-14 text-theme-01 bg-theme-07 rounded hover:shadow-dark outline-none ${
              loading ? "shadow-dark" : null
            }`}
            disabled={loading}
          >
            {loading ? <Loader width={8} height={8} /> : "Entrar"}
          </button>
          {error ? (
            <h4 className="mx-auto flex items-center gap-1 text-red-500">
              <IoIosWarning /> {error}
            </h4>
          ) : null}
        </form>
        <Link href="/">Esqueci minha senha</Link>
      </div>
      <div className="relative">
        <hr className="my-4 border-light-gray" />
        <span className="absolute left-1/2 top-0 flex h-full w-12 -translate-x-1/2 items-center justify-center bg-theme-01 text-theme-02">
          ou
        </span>
      </div>
      <div className="mb-4">
        <span>Acessar com redes sociais</span>
        <div className="flex flex-row justify-center gap-1">
          <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01">
            <FaFacebook size="1.25rem" /> Facebook
          </button>
          <button
            // onClick={() =>
            //   window.open(
            //     "/api/auth/signin",
            //     "newwindow",
            //     "width=450,height=500"
            //   )
            // }
            onClick={() => signIn("google")}
            className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01"
          >
            <FaGoogle size="1.25rem" /> Google
          </button>
          <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01">
            <FaSpotify size="1.25rem" /> Spotify
          </button>
        </div>
      </div>
      <Link href="/register" className="text-lg font-bold text-theme-07">
        Crie uma conta
      </Link>
    </div>
  );
}
