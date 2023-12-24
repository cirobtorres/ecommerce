"use client";

import { useState } from "react";
import Link from "next/link";

import { FaGoogle, FaSpotify, FaFacebook } from "react-icons/fa";

import { validatePassword } from "@/functions/validatePassword";
import { Field } from "@/components/Field";
import Checkbox from "@/components/Checkbox";
import ConfirmationButton from "@/components/ConfirmationButton";

export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
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
    <div className="mx-auto flex h-full max-w-3xl flex-col justify-center text-center">
      <h2 className="mb-8 uppercase text-theme-07">
        Criar Conta
      </h2>
      <div className="flex flex-row justify-center gap-1">
        <button
          className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01"
        >
          Cadastrar com <FaFacebook size="1.25rem" /> Facebook
        </button>
        <button
          className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01"
        >
          Cadastrar com <FaGoogle size="1.25rem" /> Google
        </button>
        <button
          className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01"
        >
          Cadastrar com <FaSpotify size="1.25rem" /> Spotify
        </button>
      </div>
      <div className="relative">
        <hr
          className="my-4 border-theme-02"
        />
        <span
          className="absolute left-1/2 top-0 flex h-full w-12 -translate-x-1/2 items-center justify-center bg-theme-01 text-theme-02"
        >
          ou
        </span>
      </div>
      <form>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <Field.Root>
              <Field.Content.Input
                type="text"
                id="floating_name"
                onChange={setName}
                isRequired
              >
                <Field.Content.Label label="Nome" />
              </Field.Content.Input>
              <Field.Error errorText="É necessário informar seu nome" />
            </Field.Root>
            <Field.Root>
              <Field.Content.Input
                type="text"
                id="floating_last_name"
                onChange={setLastName}
              >
                <Field.Content.Label label="Sobrenome" />
              </Field.Content.Input>
            </Field.Root>
          </div>
          <div className="flex flex-row gap-1">
            <Field.Root>
              <Field.Content.Input
                type="text"
                id="floating_birth_label"
                onChange={setBirth}
              >
                <Field.Content.Label label="Data de Nascimento" />
              </Field.Content.Input>
            </Field.Root>
            <Field.Root>
              <Field.Content.Input
                type="text"
                id="floating_cpf_label"
                onChange={setCpf}
                isRequired
              >
                <Field.Content.Label label="CPF" />
              </Field.Content.Input>
              <Field.Error errorText="CPF é um campo obrigatório" />
            </Field.Root>
          </div>
          <div className="flex flex-row gap-1">
            <Field.Root>
              <Field.Content.Input
                type="text"
                id="floating_cel_label"
                onChange={setCel}
                isRequired
              >
                <Field.Content.Label label="Telefone Celular" />
              </Field.Content.Input>
              <Field.Error errorText="É necessário informar um telefone" />
            </Field.Root>
            <Field.Root>
              <Field.Content.Input
                type="email"
                id="floating_email_label"
                onChange={setEmail}
                isRequired
              >
                <Field.Content.Label label="E-mail" />
              </Field.Content.Input>
              <Field.Error errorText="Informe um endereço de e-mail" />
            </Field.Root>
          </div>
          <div className="flex flex-row gap-1">
            <Field.Root>
              <Field.Content.Input
                type="password"
                id="floating_pass_label"
                onChange={setPassword}
                errorFunction={validatePassword}
                isRequired
              >
                <Field.Content.Label label="Criar Senha" />
              </Field.Content.Input>
              <Field.Help />
              <Field.Error errorText="É necessário criar uma senha" />
            </Field.Root>
            <Field.Root>
              <Field.Content.Input
                type="password"
                id="floating_pass_conf_label"
                onChange={setPasswordConfirmation}
                isRequired
              >
                <Field.Content.Label label="Confirmar Senha" />
              </Field.Content.Input>
              <Field.Error errorText="É necessário confirmar sua senha" />
            </Field.Root>
          </div>
        </div>
        <div className="my-4 text-left">
          <div className="inline-flex items-center gap-2">
            <Checkbox
              label="Quero receber ofertas e novidades por e-mail, SMS ou WhatsApp"
              checked={true}
            />
          </div>
          <div className="inline-flex items-center gap-2">
            <Checkbox
              label="Aceito os termos de uso e a política de privacidade"
              checked={true}
            />
          </div>
        </div>
        <ConfirmationButton text="Cadastrar" onClick={handleSubmit} />
      </form>
      <span className="my-4 text-theme-03">
        Já possui cadastro?{" "}
        <Link
          href="/login"
          className="font-bold text-theme-07 underline"
        >
          Entrar
        </Link>
      </span>
    </div>
  );
}
