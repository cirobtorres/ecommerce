"use client";

import { useState } from "react";
import Link from "next/link";

import { validatePassword } from "@/functions/validatePassword";
import Field from "@/components/Field";
import { facebook, google, spotify } from "@/icons";
import Checkbox from "@/components/Checkbox";
import ConfirmationButton from "@/components/ConfirmationButton";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState("");
  const [cel, setCel] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    if (password !== passwordConfirmation) {
      // throw new Error('Senha e confirmação de senha não conferem!');
      console.log("Senha e confirmação de senha não conferem!");
    }
  }

  return (
    <div
      className={
        "mx-auto flex h-full max-w-3xl flex-col justify-center text-center"
      }
    >
      <h2
        className={
          "mb-8 uppercase text-theme-07-dark-blue dark:text-theme-01-light-gray"
        }
      >
        Criar Conta
      </h2>
      <div className={"flex flex-row justify-center gap-1"}>
        <button
          className={
            "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01-light-gray"
          }
        >
          Cadastrar com {facebook(20, 20, "#fff")} Facebook
        </button>
        <button
          className={
            "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01-light-gray"
          }
        >
          Cadastrar com {google(20, 20, "#fff")} Google
        </button>
        <button
          className={
            "flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01-light-gray"
          }
        >
          Cadastrar com {spotify(20, 20, "#fff")} Spotify
        </button>
      </div>
      <div className={"relative"}>
        <hr
          className={
            "my-4 border-theme-02-light-gray dark:border-theme-04-medium-gray"
          }
        />
        <span
          className={`
					absolute left-1/2 top-0 flex h-full w-12 -translate-x-1/2 items-center
					justify-center bg-theme-01-light-gray text-theme-02-light-gray dark:bg-slate-800 dark:text-theme-03-medium-gray
				`}
        >
          ou
        </span>
      </div>
      <form>
        <div className={"flex flex-col gap-2"}>
          <div className={"flex flex-row gap-1"}>
            <Field
              type="text"
              id="floating_name_label"
              label="Nome"
              required
              onChange={setFullName}
            />
            <Field
              type="text"
              id="floating_name_label"
              label="Sobrenome"
              required
              onChange={setFullName}
            />
          </div>
          <div className={"flex flex-row gap-1"}>
            <Field
              type="text"
              id="floating_cpf_label"
              label="CPF"
              required
              onChange={setCpf}
            />
            <Field
              type="text"
              id="floating_birth_label"
              label="Data de Nascimento"
              required
              onChange={setBirth}
            />
          </div>
          <div className={"flex flex-row gap-1"}>
            <Field
              type="text"
              id="floating_cel_label"
              label="Telefone Celular"
              required
              onChange={setCel}
            />
            <Field
              type="email"
              id="floating_email_label"
              label="E-mail"
              required
              onChange={setEmail}
            />
          </div>
          <div className={"flex flex-row gap-1"}>
            <Field
              type="password"
              id="floating_pass_label"
              label="Criar Senha"
              required
              onChange={setPassword}
              errorFunction={validatePassword}
            />
            <Field
              type="password"
              id="floating_pass_conf_label"
              label="Confirmar Senha"
              required
              onChange={setPasswordConfirmation}
            />
          </div>
        </div>
        <div className={"my-4 text-left"}>
          <div className={"inline-flex items-center gap-2"}>
            <Checkbox
              label="Quero receber ofertas e novidades por e-mail, SMS ou WhatsApp"
              checked={true}
            />
          </div>
          <div className={"inline-flex items-center gap-2"}>
            <Checkbox
              label="Aceito os termos de uso e a política de privacidade"
              checked={true}
            />
          </div>
        </div>
        <ConfirmationButton text="Cadastrar" onClick={handleSubmit} />
      </form>
      <span className={"my-4 text-theme-03-medium-gray"}>
        Já possui cadastro?{" "}
        <Link
          href="/login"
          className={"font-bold text-theme-07-dark-blue underline"}
        >
          Entrar
        </Link>
      </span>
    </div>
  );
}
