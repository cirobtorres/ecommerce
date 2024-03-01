"use client";

import Link from "next/link";

import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";

import { Field } from "@/components/Field";
import { loginForm } from "@/lib/forms";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";
import SubmitButton from "@/components/SubmitButton";

// https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/

export default function Login(): JSX.Element {
  // @ts-expect-error https://github.com/vercel/next.js/issues/56041
  const [data, formAction] = useFormState(loginForm, {
    loginInput: null,
    password: null,
    message: null,
  });

  return (
    <div className="mx-auto mt-8 mb-auto flex w-full h-full max-w-login-form flex-col text-center">
      {data?.message}
      <h2 className="mb-8 uppercase text-theme-07">Fazer Login</h2>
      <div>
        <form action={formAction} className="mb-4 flex flex-col gap-4">
          <Field.Root>
            <Field.Content.Input
              type="text"
              id="loginInputField"
              name="loginInput"
              isRequired
            >
              <Field.Content.Label label="E-mail, CPF ou CNPJ" />
            </Field.Content.Input>
          </Field.Root>
          <Field.Root>
            <Field.Content.Input
              type="password"
              id="passwordInputField"
              name="password"
              isRequired
            >
              <Field.Content.Label label="Senha" />
            </Field.Content.Input>
          </Field.Root>
          <SubmitButton text="Entrar" width="w-full" />
          {/* <button onClick={() => signIn("Credentials")}>Entrar</button> */}
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
