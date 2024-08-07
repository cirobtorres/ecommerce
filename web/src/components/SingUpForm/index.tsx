"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/authenticationActions";
import {
  AppleSignIn,
  FacebookSignIn,
  GoogleSignIn,
  SignUpButton,
} from "../Buttons";
import {
  DateInput,
  CNPJInput,
  CPFInput,
  EmailInput,
  NameInput,
  PhoneInput,
  GenderInput,
  PasswordInput,
  PasswordRules,
} from "../Inputs";
import zxcvbn from "zxcvbn";
import Styles from "./Styles.module.css";
import CheckBox from "../Inputs/CheckBox";
import RadioInput from "../Inputs/RadioInput";
import { useFormState, useFormStatus } from "react-dom";

interface State {
  errors: { [k: string]: boolean } | null;
}

export default function SignUpForm() {
  const [radioVal, setRadioVal] = useState<"PF" | "PJ">("PF");
  const [state, formAction] = useFormState<State, FormData>(signUpWithEmail, {
    errors: null,
  });
  return (
    <div className={Styles["signup-outter-container"]}>
      <div className={Styles["signup-inner-container"]}>
        <div className={Styles["signup-heading-container"]}>
          <h1 className={Styles["signup-heading"]}>Criar Conta</h1>
        </div>
        <form className={Styles["form-container"]} action={formAction}>
          <div className={Styles["signup-radio-container"]}>
            <RadioInput
              id="signup-pf-radio-input"
              label="Pessoa Física"
              name="radio_type"
              value="PF"
              setVal={setRadioVal}
              checked
            />
            <RadioInput
              id="signup-pj-radio-input"
              label="Pessoa Jurídica"
              name="radio_type"
              value="PJ"
              setVal={setRadioVal}
            />
          </div>
          {radioVal === "PF" ? <Person /> : <Company />}
        </form>
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

const Person = () => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <Credentials />
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Informações pessoais</h2>
      </div>
      <NameInput
        text="Nome"
        placeholder="John Doe"
        value={name}
        setValue={setName}
      />
      <div className={Styles["signup-split-inputs"]}>
        <CPFInput
          text="CPF"
          placeholder="123.456.789-00"
          value={cpf}
          setValue={setCpf}
        />
        <DateInput
          text="Data de Nascimento"
          placeholder="01/06/2002"
          value={birthDate}
          setValue={setBirthDate}
        />
      </div>
      <div className={Styles["signup-split-inputs"]}>
        <GenderInput />
        <PhoneInput
          text="Telefone"
          placeholder="(11) 99985-1234"
          value={phone}
          setValue={setPhone}
        />
      </div>
      <Policies />
      <SignUpButton text="Criar" />
      {/* <SignUp text="Criar" formAction={signUpWithEmail} /> */}
      <div className={Styles["oauth-buttons-container"]}>
        <GoogleSignIn />
        <FacebookSignIn />
        {/* <AppleSignIn /> */}
      </div>
    </>
  );
};

const Company = () => {
  const [brandName, setBrandName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [stablishmentAt, setStablishmentAt] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <>
      <Credentials />
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Informações pessoais</h2>
      </div>
      <div className={Styles["signup-split-inputs"]}>
        <NameInput
          text="Nome Fantasia"
          placeholder=""
          value={brandName}
          setValue={setBrandName}
        />
        <CNPJInput
          text="CNPJ"
          placeholder="12.345.678/0001-00"
          value={cnpj}
          setValue={setCnpj}
        />
      </div>
      <NameInput
        text="Razão Social"
        placeholder=""
        value={legalName}
        setValue={setLegalName}
      />
      <div className={Styles["signup-split-inputs"]}>
        <PhoneInput
          text="Telefone"
          placeholder="(11) 99985-1234"
          value={stablishmentAt}
          setValue={setStablishmentAt}
        />
        <DateInput
          text="Data de Constituição"
          placeholder="01/06/2002"
          value={phone}
          setValue={setPhone}
        />
      </div>
      <Policies />
      <SignUpButton text="Criar" />
    </>
  );
};

const Credentials = () => {
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [progress, setProgress] = useState("");
  const [message, setMessage] = useState("");

  const handleProgressBar = (pass: string) => {
    const passwordMeter = zxcvbn(pass);

    let strength =
      passwordMeter.score >= 4
        ? "muito forte"
        : passwordMeter.score >= 3
          ? "forte"
          : passwordMeter.score >= 2
            ? "médio"
            : passwordMeter.score >= 1
              ? "fraco"
              : "muito fraco";

    setPass1(pass);
    setProgress(`${passwordMeter.score * 25}%`);
    setMessage(strength);
  };

  return (
    <>
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Credenciais de autenticação</h2>
      </div>
      <EmailInput
        text="E-mail"
        placeholder="meu.contato@email.com"
        value={email}
        setValue={setEmail}
      />
      <div>
        <div className={`${Styles["signup-split-inputs"]} mb-3`}>
          <PasswordInput
            id="password1"
            value={pass1}
            setValue={handleProgressBar}
            text="Senha"
            placeholder=""
          />
          <PasswordInput
            id="password2"
            value={pass2}
            setValue={setPass2}
            text="Confirmar Senha"
            placeholder=""
          />
        </div>
        <PasswordRules
          message={message}
          progress={progress}
          pass1={pass1}
          pass2={pass2}
        />
      </div>
    </>
  );
};

const Policies = () => {
  return (
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
            className="text-[#1d4f91] underline hover:text-[#34619c] outline-offset-2 outline-[#14b8a6]"
          >
            Políticas de Privacidade da Refrigel
          </Link>
        </p>
      </CheckBox>
    </div>
  );
};
