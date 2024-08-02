"use client";

import Link from "next/link";
import { useState } from "react";
import { signUpWithEmail } from "@/lib/authenticationActions";
import {
  AppleLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
  SignUpFormActionButton,
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
import { FaCheck } from "react-icons/fa";
import Styles from "./SignUpForm.module.css";
import Radio from "./Radio.module.css";
import Check from "./CheckBox.module.css";
import zxcvbn from "zxcvbn";

export default function SignUpForm() {
  const [radioVal, setRadioVal] = useState<"PF" | "PJ">("PF");
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
            value="PF"
            setVal={setRadioVal}
            defaultChecked
          />
          <RadioInput
            id="signup-pj-radio-input"
            label="Pessoa Jurídica"
            name="type"
            value="PJ"
            setVal={setRadioVal}
          />
        </form>
        {radioVal === "PF" ? <Person /> : <Company />}
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
      <form className={Styles["form-container"]}>
        <Credentials />
        <div className={Styles["minor-heading-container"]}>
          <h2 className={Styles["minor-heading"]}>Informações pessoais</h2>
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
        <SignUpFormActionButton text="Criar" formAction={signUpWithEmail} />
      </form>
      <div className={Styles["oauth-buttons-container"]}>
        <GoogleLoginButton />
        <FacebookLoginButton />
        <AppleLoginButton />
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
    <form className={Styles["form-container"]}>
      <Credentials />
      <div className={Styles["minor-heading-container"]}>
        <h2 className={Styles["minor-heading"]}>Informações pessoais</h2>
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
      <SignUpFormActionButton text="Criar" formAction={signUpWithEmail} />
    </form>
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
      <div className={Styles["minor-heading-container"]}>
        <h2 className={Styles["minor-heading"]}>Credenciais de autenticação</h2>
      </div>
      <EmailInput
        text="E-mail"
        placeholder="meu.contato@email.com"
        value={email}
        setValue={setEmail}
      />
      <div className={Styles["signup-split-inputs"]}>
        <PasswordInput
          value={pass1}
          setValue={handleProgressBar}
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
      <PasswordRules
        message={message}
        progress={progress}
        pass1={pass1}
        pass2={pass2}
      />
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
            className="text-[#1d4f91] underline hover:text-[#171c8f] outline-offset-2 outline-[#14b8a6]"
          >
            Políticas de Privacidade da Refrigel
          </Link>
        </p>
      </CheckBox>
    </div>
  );
};

const RadioInput = ({
  id,
  name,
  label,
  defaultChecked,
  value,
  setVal,
}: {
  id: string;
  name: string;
  label?: string;
  defaultChecked?: boolean;
  value: "PF" | "PJ";
  setVal: (radioVal: "PF" | "PJ") => void;
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
        onClick={() => setVal(value)}
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
        <div className={Check["checkbox-container"]} tabIndex={0}>
          <FaCheck className={Check["checkbox-element"]} />
        </div>
        {children}
      </label>
    </div>
  );
};
