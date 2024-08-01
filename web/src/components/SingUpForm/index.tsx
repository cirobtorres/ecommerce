"use client";

import { signUpWithEmail } from "@/lib/authenticationActions";
import {
  AppleLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
  SignUpFormActionButton,
} from "../Buttons";
import {
  BirthInput,
  CPFInput,
  EmailInput,
  NameInput,
  PhoneInput,
} from "../Inputs";
import { FaCheck } from "react-icons/fa";
import {
  GenderInput,
  PasswordInput,
  PasswordRules,
} from "../Inputs/ClientInputs";
import Styles from "./SignUpForm.module.css";
import Radio from "./Radio.module.css";
import Check from "./CheckBox.module.css";
import Link from "next/link";
import { useState } from "react";

export default function SignUpForm() {
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  return (
    <div className={Styles["signup-outter-container"]}>
      <div className={Styles["inner-container"]}>
        <div className={Styles["heading-container"]}>
          <h1 className={Styles["heading"]}>Criar Conta</h1>
        </div>
        <form className={Styles["signup-radio-container"]}>
          <RadioInput
            id="signup-pf-radio-input"
            label="Pessoa Física"
            name="type"
            value="1"
            defaultChecked
          />
          <RadioInput
            id="signup-pj-radio-input"
            label="Pessoa Jurídica"
            name="type"
            value="2"
          />
        </form>
        <form className={Styles["form-container"]}>
          <div className={Styles["minor-heading-container"]}>
            <h2 className={Styles["minor-heading"]}>
              Credenciais de autenticação
            </h2>
          </div>
          <EmailInput text="E-mail" placeholder="johndoe@email.com" />
          <div className={Styles["signup-split-inputs"]}>
            <PasswordInput
              value={pass1}
              setValue={setPass1}
              text="Senha"
              placeholder=""
            />
            <PasswordInput
              value={pass2}
              setValue={setPass2}
              text="Confirmar Senha"
              placeholder=""
            />
          </div>
          <PasswordRules password1={pass1} password2={pass2} />
          <div className={Styles["minor-heading-container"]}>
            <h2 className={Styles["minor-heading"]}>Informações pessoais</h2>
          </div>
          <NameInput text="Nome" placeholder="John Doe" />
          <div className={Styles["signup-split-inputs"]}>
            <CPFInput text="CPF" placeholder="123.456.789-00" />
            <BirthInput text="Data de Nascimento" placeholder="" />
          </div>
          <div className={Styles["signup-split-inputs"]}>
            <GenderInput />
            <PhoneInput text="Telefone" placeholder="" />
          </div>
          <div className={Styles["signup-checkbox-container"]}>
            <CheckBox id="refrigel-newsletter" value="refrigel-newsletter">
              <p className="text-sm">
                Desejo receber novidades e promoções de Refrigel
              </p>
            </CheckBox>
            <CheckBox id="refrigel-privacy-policies" value="refrigel-policies">
              <p className="text-sm">
                Concordo com as{" "}
                <Link
                  href="/"
                  className="text-[#1d4f91] underline hover:text-[#171c8f]"
                >
                  Políticas de Privacidade da Refrigel
                </Link>
              </p>
            </CheckBox>
          </div>
          <SignUpFormActionButton text="Criar" formAction={signUpWithEmail} />
        </form>
        <div className={Styles["oauth-buttons-container"]}>
          <GoogleLoginButton />
          <FacebookLoginButton />
          <AppleLoginButton />
        </div>
        <div className={Styles["signup-form-has-account-container"]}>
          <p className={Styles["signup-form-has-account-element"]}>
            Já possui cadastro?{" "}
            <Link href="/entrar">
              <u>Entrar</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const RadioInput = ({
  id,
  name,
  value,
  label,
  defaultChecked,
}: {
  id: string;
  name: string;
  value: string;
  label?: string;
  defaultChecked?: boolean;
}) => {
  return (
    <label htmlFor={id} className={Radio["radio-label-container"]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden"
        defaultChecked={defaultChecked}
      />
      <div className={Radio["radio-container"]}>
        <div className={Radio["radio-toggle-element"]} />
      </div>
      {label}
    </label>
  );
};

const CheckBox = ({
  children,
  id,
  value,
}: {
  children: React.ReactNode;
  id: string;
  value: string;
}) => {
  return (
    <div className={Check["checkbox-main-container"]}>
      <input
        id={id}
        name={id}
        value={value}
        type="checkbox"
        className="hidden"
      />
      <label htmlFor={id} className={Check["checkbox-label-container"]}>
        <div className={Check["checkbox-container"]}>
          <FaCheck className={Check["checkbox-element"]} />
        </div>
        {children}
      </label>
    </div>
  );
};
