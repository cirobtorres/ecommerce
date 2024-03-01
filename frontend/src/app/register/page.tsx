"use client";

import Link from "next/link";
import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";
import { Checkbox } from "@/components/Checkbox";
import { useFormState } from "react-dom";
import { registerForm } from "@/lib/forms";
import { IoIosWarning } from "react-icons/io";
import SubmitButton from "@/components/SubmitButton";
import Input from "@/components/Inputs/Input";
import { useState } from "react";
import PasswordInput from "@/components/Inputs/PasswordInput";
import PasswordConfirm from "@/components/Inputs/PasswordConfirm";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthAt, setBirthAt] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [checkBox, setCheckBox] = useState<number>(1); // 1 | -1

  const [checkBoxError, setCheckBoxError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setCheckBoxError(false);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (checkBox === -1) {
      setCheckBoxError(true);
      setLoading(false);
      return false;
    }
    // Code here...
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-8 mb-auto flex w-full max-w-register-form min-w-register-form flex-col text-center p-4">
      <h2 className="mb-8 uppercase text-theme-07">Criar Conta</h2>
      <div className="flex flex-row justify-center gap-1">
        <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#0165E1] p-4 text-xs text-theme-01">
          Cadastrar com <FaFacebook size="1.25rem" /> Facebook
        </button>
        <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#db4437] p-4 text-xs text-theme-01">
          Cadastrar com <FaGoogle size="1.25rem" /> Google
        </button>
        <button className="flex flex-1 flex-row items-center justify-center gap-1 rounded bg-[#1db954] p-4 text-xs text-theme-01">
          Cadastrar com <FaSpotify size="1.25rem" /> Spotify
        </button>
      </div>
      <div className="relative">
        <hr className="my-4 border-light-gray" />
        <span className="absolute left-1/2 top-0 flex h-full w-12 -translate-x-1/2 items-center justify-center bg-theme-01 text-theme-02">
          ou
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-1">
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              label="Nome"
              isRequired={[true, "É necessário informar seu nome"]}
              value={firstName}
              setValue={setFirstName}
            />
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              label="Sobrenome"
              value={lastName}
              setValue={setLastName}
            />
          </div>
          <div className="flex flex-row gap-1">
            <Input
              id="birthAt"
              name="birthAt"
              label="Data de Nascimento"
              mask="date"
              value={birthAt}
              setValue={setBirthAt}
            />
            <Input
              id="cpf"
              name="cpf"
              label="CPF"
              mask="cpf"
              isRequired={[true, "CPF é um campo obrigatório"]}
              value={cpf}
              setValue={setCpf}
            />
          </div>
          <div className="flex flex-row gap-1">
            <Input
              id="phone"
              name="phone"
              label="Telefone Celular"
              mask="phone"
              isRequired={[true, "Informe um telefone de contato"]}
              value={phone}
              setValue={setPhone}
            />
            <Input
              type="email"
              id="email"
              name="email"
              label="E-mail"
              placeholder="johndoe@email.com"
              isRequired={[true, "Informe um endereço de e-mail"]}
              value={email}
              setValue={setEmail}
            />
          </div>
          <div className="flex flex-row gap-1">
            <PasswordInput
              id="password"
              name="password"
              label="Criar senha"
              value={pass}
              setValue={setPass}
            />
            <PasswordConfirm
              id="passwordConfirmation"
              name="passwordConfirmation"
              label="Confirmar senha"
              value={passConfirm}
              setValue={setPassConfirm}
              passwordValue={pass}
            />
          </div>
        </div>
        <div className="my-4 text-left">
          <Checkbox
            id="policyCheckbox"
            name="policyCheckbox"
            label="Aceito os termos de uso e a política de privacidade"
            checked={true}
            error={checkBoxError}
            value={checkBox}
            setValue={setCheckBox}
          />
          {checkBoxError && (
            <h4 className="mt-1 flex items-center gap-1 text-red-500">
              <IoIosWarning /> É necessário estar de acordo com as políticas de
              privacidade da empresa.
            </h4>
          )}
        </div>
        {/* <SubmitButton text="Cadastrar" /> */}
        <button
          className={`p-4 w-80 text-theme-01 bg-theme-07 rounded hover:shadow-dark outline-none ${
            loading ? "shadow-dark" : null
          }`}
          disabled={loading}
        >
          {loading ? "Carregando..." : "Confirmar"}
        </button>
      </form>
      <span className="my-4 text-theme-03">
        Já possui cadastro?{" "}
        <Link href="/login" className="font-bold text-theme-07 underline">
          Entrar
        </Link>
      </span>
    </div>
  );
}
