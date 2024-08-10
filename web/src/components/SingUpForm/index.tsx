"use client";

import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";
import { signUpWithEmail } from "../../lib/authentication/signUpWithEmail";
import {
  AppleSignIn,
  FacebookSignIn,
  GoogleSignIn,
  SignUpButton,
} from "../Buttons";
import Styles from "./Styles.module.css";
import CheckBox from "../Inputs/CheckBox";
import RadioInput from "../Inputs/RadioInput";
import PasswordSignUp from "../Inputs/PasswordRules";
import NameInput from "../Inputs/NameInput";
import CpfInput from "../Inputs/CpfInput";
import EmailInput from "../Inputs/EmailInput";
import DateInput from "../Inputs/DateInput";
import PhoneInput from "../Inputs/PhoneInput";
import SelectInput from "../Inputs/SelectInput";
import CNPJInput from "../Inputs/CnpjInput";
import DisableInput from "../Inputs/DisableInput";

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
        <form
          // autoComplete="off"
          // aria-autocomplete="none"
          className={Styles["form-container"]}
          action={formAction}
        >
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
          {radioVal === "PF" ? (
            <Person state={state} />
          ) : (
            <Company state={state} />
          )}
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

const Person = ({ state }: { state: State }) => {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  // Gender setup ------------------------------------------------------------
  const genderPlaceholder = "Não especificado";
  const [gender, setGender] = useState(genderPlaceholder);
  const genderOptions = ["Feminino", "Masculino", "Outro"];
  function enumParser(gender: string) {
    switch (gender) {
      case "Feminino":
        return "F";
      case "Masculino":
        return "M";
      case "Outro":
        return "O";
      default:
        return "N"; // Não especificado / Not specified
    }
  }

  return (
    <>
      <Credentials state={state} />
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Informações pessoais</h2>
      </div>
      <NameInput
        id="name"
        text="Nome Completo"
        placeholder="John Doe"
        state={{ blankError: state?.errors?.nameBlankError || false }}
        value={name}
        setValue={setName}
      />
      <div className={Styles["signup-split-inputs"]}>
        <CpfInput
          text="CPF"
          placeholder="123.456.789-00"
          state={state}
          value={cpf}
          setValue={setCpf}
        />
        <DateInput
          id="date"
          text="Data de Nascimento"
          placeholder="01/06/2002"
          state={state}
          value={birthDate}
          setValue={setBirthDate}
        />
      </div>
      <div className={Styles["signup-split-inputs"]}>
        <SelectInput
          id="gender"
          option={gender}
          options={genderOptions}
          setOption={setGender}
          parser={enumParser}
          error={state.errors?.genderNotSpecifiedError || false}
          errorText="Opção inválida"
          placeholder={genderPlaceholder}
        />
        <PhoneInput
          id="phone"
          text="Telefone"
          placeholder="(11) 99985-1234"
          state={state}
          value={phone}
          setValue={setPhone}
        />
      </div>
      <Policies state={state} />
      <SignUpButton text="Criar" />
      <div className={Styles["oauth-buttons-container"]}>
        <GoogleSignIn />
        <FacebookSignIn />
        {/* <AppleSignIn /> */}
      </div>
    </>
  );
};

const Company = ({ state }: { state: State }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [brandName, setBrandName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [stablishmentAt, setStablishmentAt] = useState("");
  // Tax info (situação tributária) ------------------------------------------------------------
  const taxInfoPlaceholder = "Situação tributária";
  const [ie, setIe] = useState("");
  const [taxInfo, setTaxInfo] = useState(taxInfoPlaceholder);
  const taxInfoOptions = ["Contribuinte do ICMS", "Isento de ICMS"];

  function enumParser(taxInfo: string) {
    switch (taxInfo) {
      case "Contribuinte do ICMS":
        return 1;
      case "Isento de ICMS":
        return 2;
      default:
        return 3;
    }
  }

  return (
    <>
      <Credentials state={state} />
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Informações da empresa</h2>
      </div>
      <NameInput
        id="legal-name"
        text="Razão Social"
        placeholder=""
        state={{ blankError: state?.errors?.legalNameBlankError || false }}
        value={legalName}
        setValue={setLegalName}
      />
      <div className={Styles["signup-split-inputs"]}>
        <NameInput
          id="brand-name"
          text="Nome Fantasia"
          placeholder=""
          state={{ blankError: state?.errors?.brandNameBlankError || false }}
          value={brandName}
          setValue={setBrandName}
        />
        <CNPJInput
          text="CNPJ"
          placeholder="12.345.678/0001-00"
          state={state}
          value={cnpj}
          setValue={setCnpj}
        />
      </div>
      <NameInput
        id="name"
        text="Nome Completo"
        placeholder="John Doe"
        state={{ blankError: state?.errors?.nameBlankError || false }}
        value={name}
        setValue={setName}
      />
      <div className={Styles["signup-split-inputs"]}>
        <SelectInput
          id="tax-info"
          option={taxInfo}
          options={taxInfoOptions}
          setOption={setTaxInfo}
          parser={enumParser}
          error={state.errors?.taxInfoInvalidError || false}
          errorText="Opção inválida"
          placeholder={taxInfoPlaceholder}
        />
        <DisableInput
          id="ie"
          text="Inscrição Estadual"
          placeholder=""
          state={{ blankError: state?.errors?.ieBlankError || false }}
          value={ie}
          setValue={setIe}
          disable={taxInfo === taxInfoOptions[1]}
        />
      </div>
      <div className={Styles["signup-split-inputs"]}>
        <PhoneInput
          id="phone"
          text="Telefone"
          placeholder="(11)99999-1234"
          state={state}
          value={stablishmentAt}
          setValue={setStablishmentAt}
        />
        <DateInput
          id="date"
          text="Data de Constituição"
          placeholder="01/06/2002"
          value={phone}
          setValue={setPhone}
          state={state}
        />
      </div>
      <Policies state={state} />
      <SignUpButton text="Criar" />
    </>
  );
};

const Credentials = ({ state }: { state: State }) => {
  const [email, setEmail] = useState("");

  return (
    <>
      <div className={Styles["form-heading-container"]}>
        <h2 className={Styles["form-heading"]}>Credenciais de autenticação</h2>
      </div>
      <EmailInput
        id="email"
        text="E-mail"
        placeholder="meu.contato@email.com"
        state={state}
        value={email}
        setValue={setEmail}
      />
      <PasswordSignUp state={state} />
    </>
  );
};

const Policies = ({ state }: { state: State }) => {
  return (
    <div className={Styles["signup-checkbox-container"]}>
      <CheckBox
        id="refrigel-newsletter"
        value="refrigel-newsletter"
        checked={true}
      >
        <p className="text-sm">
          Aceito receber novidades e ofertas da Refrigel
        </p>
      </CheckBox>
      <CheckBox
        id="refrigel-privacy-policies"
        value="refrigel-policies"
        error={state.errors?.agreedDataPolicies}
      >
        <p className="text-sm">
          Concordo com as{" "}
          <Link
            href="/politicas"
            target="_blank"
            className="text-[#1d4f91] underline hover:text-[#34619c] outline-offset-2 outline-[#14b8a6]"
          >
            Políticas de Privacidade da Refrigel
          </Link>
        </p>
      </CheckBox>
    </div>
  );
};
