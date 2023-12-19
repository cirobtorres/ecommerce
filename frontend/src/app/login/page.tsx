"use client";

import ConfirmationButton from "@/components/ConfirmationButton";
import Field from "@/components/Field";
import { facebook, google, spotify } from "@/icons";
import Link from "next/link";
import { useState } from "react";

export default function Login(): JSX.Element {
  const [loginCredentials, setLoginCredentials] = useState();
  const [password, setPassword] = useState();

  return (
    <div
      className={
        "mx-auto flex h-full max-w-md flex-col justify-center text-center"
      }
    >
      <h2
        className={
          "mb-8 uppercase text-theme-07-dark-blue dark:text-theme-01-light-gray"
        }
      >
        Fazer Login
      </h2>
      <div>
        <form className={"mb-4 flex flex-col gap-4"}>
          <Field
            type="text"
            id="login_input_field"
            label="Login"
            onChange={setLoginCredentials}
          />
          <Field
            type="password"
            id="password_input_field"
            label="Senha"
            onChange={setPassword}
          />
          <ConfirmationButton
            text="Entrar"
            padding="p-3"
            width="w-full"
            onClick={() => {}}
          />
        </form>
        <Link href="" className={"dark:text-theme-01-light-gray"}>
          Esqueci minha senha
        </Link>
      </div>
      <hr className={"my-4 dark:border-theme-03-medium-gray"} />
      <div className={"mb-4"}>
        <span className={"dark:text-theme-01-light-gray"}>
          Acessar com redes sociais
        </span>
        <div className={"flex flex-row justify-center gap-1"}>
          <button
            className={
              "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01-light-gray"
            }
          >
            {facebook(20, 20, "#fff")} Facebook
          </button>
          <button
            className={
              "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01-light-gray"
            }
          >
            {google(20, 20, "#fff")} Google
          </button>
          <button
            className={
              "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01-light-gray"
            }
          >
            {spotify(20, 20, "#fff")} Spotify
          </button>
        </div>
      </div>
      <Link
        href="/register"
        className={
          "text-lg font-bold text-theme-07-dark-blue dark:text-theme-01-light-gray"
        }
      >
        Crie uma conta
      </Link>
    </div>
  );
}
