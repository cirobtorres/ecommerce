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
          <Field.Root>
            <Field.Content.Input
              type="text"
              id="login_input_field"
              setValue={setLoginCredentials}
              isRequired
            >
              <Field.Content.Label label="Login" />
            </Field.Content.Input>
          </Field.Root>
          <Field.Root>
            <Field.Content.Input
              type="password"
              id="password_input_field"
              setValue={setPassword}
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
            <FaFacebook size="1.25rem" /> Facebook
          </button>
          <button
            className={
              "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01-light-gray"
            }
          >
            <FaGoogle size="1.25rem" /> Google
          </button>
          <button
            className={
              "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01-light-gray"
            }
          >
            <FaSpotify size="1.25rem" /> Spotify
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
