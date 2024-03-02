"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";
import Input from "@/components/Inputs/Input";
import Loader from "@/components/Loader";
import PasswordInput from "@/components/Inputs/PasswordInput";

// https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

export default function Login(): JSX.Element {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
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
            className="mx-auto flex items-center justify-center p-4 w-full h-14 text-theme-01 bg-theme-07 rounded hover:shadow-dark outline-none"
            disabled={loading}
          >
            {loading ? <Loader /> : "Entrar"}
          </button>
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
