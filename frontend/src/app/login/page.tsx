"use client";

import Link from "next/link";
import { useState } from "react";

import { FaGoogle, FaSpotify, FaFacebook } from "react-icons/fa";

import { Field } from "@/components/Field";
import ConfirmationButton from "@/components/ConfirmationButton";

export default function Login(): JSX.Element {
  const [loginCredentials, setLoginCredentials] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="mx-auto flex h-full max-w-md flex-col justify-center text-center">
      <h2 className="mb-8 uppercase text-theme-07">Fazer Login</h2>
      <div>
        <form className="mb-4 flex flex-col gap-4">
          <Field.Root>
            <Field.Content.Input
              type="text"
              id="login_input_field"
              onChange={setLoginCredentials}
              isRequired
            >
              <Field.Content.Label label="Login" />
            </Field.Content.Input>
          </Field.Root>
          <Field.Root>
            <Field.Content.Input
              type="password"
              id="password_input_field"
              onChange={setPassword}
              isRequired
            >
              <Field.Content.Label label="Senha" />
            </Field.Content.Input>
          </Field.Root>
          <ConfirmationButton
            text="Entrar"
            padding="p-3"
            width="w-full"
            onClick={() => {}}
          />
        </form>
        <Link href="">Esqueci minha senha</Link>
      </div>
      <hr className="my-4" />
      <div className="mb-4">
        <span>Acessar com redes sociais</span>
        <div className="flex flex-row justify-center gap-1">
          <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01">
            <FaFacebook size="1.25rem" /> Facebook
          </button>
          <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01">
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
