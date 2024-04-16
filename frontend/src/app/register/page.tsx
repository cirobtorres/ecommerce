"use client";

import Link from "next/link";
import { FaFacebook, FaGoogle, FaSpotify } from "react-icons/fa";
import { Checkbox } from "@/components/Checkbox";
import { IoIosWarning } from "react-icons/io";
import Input from "@/components/Inputs/Input";
import { useState } from "react";
import PasswordInput from "@/components/Inputs/PasswordInput";
import PasswordConfirm from "@/components/Inputs/PasswordConfirm";
import Loader from "@/components/Loader";
import { fetchRegister } from "@/lib/authentication";
import { formatDate, formatDocument, formatPhone } from "@/utils/formatStrings";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [radioType, setRadioType] = useState<"PF" | "PJ">("PF");

  // PF Entity
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthAt, setBirthAt] = useState("");

  // PJ Entity
  const [legalName, setLegalName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [ie, setIe] = useState("");
  const [im, setIm] = useState("");
  const [establishmentAt, setEstablishmentAt] = useState("");

  // User Entity
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirmation, setPassConfirmation] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState<number>(1); // 1 | -1

  const [checkBoxError, setCheckBoxError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const pFObj = {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    cpf,
    setCpf,
    birthAt,
    setBirthAt,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    passConfirmation,
    setPassConfirmation,
  };

  const pJObj = {
    legalName,
    setLegalName,
    brandName,
    setBrandName,
    cnpj,
    setCnpj,
    establishmentAt,
    setEstablishmentAt,
    ie,
    setIe,
    im,
    setIm,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    passConfirmation,
    setPassConfirmation,
  };

  const handleRegistration = async (form: FormProps) => {
    const register = await fetchRegister(form);
    if (register.status === 400) {
      setError(
        "Ocorreu um erro durante o cadastro. Por favor, tente mais tarde."
      );
      setLoading(false);
      throw new Error(`${register.status} ${register.statusText}`);
    }
    return;
  };

  const handleSubmit = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    setCheckBoxError(false);
    if (privacyPolicy === -1) {
      setCheckBoxError(true);
      setLoading(false);
      return false;
    }
    let form: FormProps | null = null;
    if (radioType === "PF") {
      form = {
        phone: formatPhone(phone),
        email,
        password,
        privacyPolicy: privacyPolicy === 1,
        PF: {
          firstName,
          lastName,
          cpf: formatDocument(cpf),
          birthAt: formatDate(birthAt),
        },
      };
    } else if (radioType === "PJ") {
      form = {
        phone: formatPhone(phone),
        email,
        password,
        privacyPolicy: privacyPolicy === 1,
        PJ: {
          legalName,
          brandName,
          cnpj: formatDocument(cnpj),
          establishmentAt: formatDate(establishmentAt),
          ie,
          im,
        },
      };
    } else {
      setLoading(false);
      return;
    }
    await handleRegistration(form);
    const responseLogin = await signIn("credentials", {
      login: email,
      password,
      redirect: false,
    });
    if (!responseLogin?.ok) {
      // setError("E-mail, CPF, CNPJ ou senha inválido!");
      return;
    }
    setLoading(false);
    router.push("/");
  };

  return (
    <main className="mx-auto mt-8 mb-auto flex flex-col w-full max-w-register-form min-w-register-form text-center p-4">
      <h2 className="mb-8 uppercase text-theme-07">Criar Conta</h2>
      <div className="mb-4 mx-auto flex gap-3">
        <label
          htmlFor="PF"
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setRadioType("PF")}
        >
          <div>
            <input
              type="radio"
              name="person_type"
              id="PF"
              value="PF"
              defaultChecked
              hidden
            />
            <div
              className={`size-[0.85rem] rounded-full outline outline-offset-2 outline-1 ${
                radioType === "PF"
                  ? "bg-theme-07 outline-theme-07"
                  : "bg-white outline-white"
              }`}
            />
          </div>
          <span>Pessoa Física</span>
        </label>
        <label
          htmlFor="PJ"
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setRadioType("PJ")}
        >
          <div>
            <input type="radio" name="person_type" id="PJ" value="PJ" hidden />
            <div
              className={`size-[0.85rem] rounded-full outline outline-offset-2 outline-1 ${
                radioType === "PJ"
                  ? "bg-theme-07 outline-theme-07"
                  : "bg-white outline-white"
              }`}
            />
          </div>
          <span>Pessoa Jurídica</span>
        </label>
      </div>
      <div>
        {radioType === "PF" ? (
          <>
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
          </>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {radioType === "PF" ? <PFForm {...pFObj} /> : <PJForm {...pJObj} />}
          </div>
          <div className="my-4 text-left">
            <Checkbox
              id="policyCheckbox"
              name="policyCheckbox"
              label="Aceito os termos de uso e a política de privacidade"
              checked={true}
              error={checkBoxError}
              value={privacyPolicy}
              setValue={setPrivacyPolicy}
            />
            {checkBoxError && (
              <h4 className="mt-1 flex items-center gap-1 text-red-500">
                <IoIosWarning /> É necessário estar de acordo com as políticas
                de privacidade da empresa.
              </h4>
            )}
          </div>
          <button
            type="submit"
            className={`mx-auto flex items-center justify-center p-4 w-80 h-14 text-theme-01 bg-theme-07 rounded hover:shadow-dark outline-none ${
              loading ? "shadow-dark" : null
            }`}
            disabled={loading}
          >
            {loading ? <Loader width={8} height={8} /> : "Confirmar"}
          </button>
          {error ? (
            <h4 className="mt-4 flex justify-center items-center gap-1 text-red-500">
              <IoIosWarning /> {error}
            </h4>
          ) : null}
        </form>
        <span className="mt-4 mb-14 text-theme-03">
          Já possui cadastro?{" "}
          <Link href="/login" className="font-bold text-theme-07 underline">
            Entrar
          </Link>
        </span>
      </div>
    </main>
  );
}

const PFForm = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  cpf,
  setCpf,
  birthAt,
  setBirthAt,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  passConfirmation,
  setPassConfirmation,
}: {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
  cpf: string;
  setCpf: (cpf: string) => void;
  birthAt: string;
  setBirthAt: (birthAt: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passConfirmation: string;
  setPassConfirmation: (passConfirmation: string) => void;
}) => {
  return (
    <>
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
          isRequired={[true, "Informe um endereço de e-mail"]}
          value={email}
          setValue={setEmail}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1">
          <PasswordInput
            id="password"
            name="password"
            label="Criar senha"
            help={true}
            value={password}
            setValue={setPassword}
          />
          <PasswordConfirm
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirmar senha"
            value={passConfirmation}
            setValue={setPassConfirmation}
            passwordValue={password}
          />
        </div>
      </div>
    </>
  );
};

const PJForm = ({
  legalName,
  setLegalName,
  brandName,
  setBrandName,
  cnpj,
  setCnpj,
  establishmentAt,
  setEstablishmentAt,
  ie,
  setIe,
  im,
  setIm,
  phone,
  setPhone,
  email,
  setEmail,
  password,
  setPassword,
  passConfirmation,
  setPassConfirmation,
}: {
  legalName: string;
  setLegalName: (legalName: string) => void;
  brandName: string;
  setBrandName: (brandName: string) => void;
  cnpj: string;
  setCnpj: (cnpj: string) => void;
  establishmentAt: string;
  setEstablishmentAt: (establishmentAt: string) => void;
  ie: string;
  setIe: (ie: string) => void;
  im: string;
  setIm: (im: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  passConfirmation: string;
  setPassConfirmation: (passConfirmation: string) => void;
}) => {
  return (
    <>
      <Input
        id="legalName"
        name="legalName"
        label="Razão Social"
        isRequired={[true, "É necessário informar a Razão Social"]}
        value={legalName}
        setValue={setLegalName}
      />
      <Input
        id="brandName"
        name="brandName"
        label="Nome Fantasia"
        isRequired={[true, "É necessário informar o Nome Fantasia"]}
        value={brandName}
        setValue={setBrandName}
      />
      <div className="flex flex-row gap-1">
        <Input
          id="cnpj"
          name="cnpj"
          label="CNPJ"
          mask="cnpj"
          isRequired={[true, "Informe o CNPJ"]}
          value={cnpj}
          setValue={setCnpj}
        />
        <Input
          mask="date"
          id="establishmentAt"
          name="establishmentAt"
          label="Data de Abertura"
          isRequired={[true, "Informe a data de abertura da empresa"]}
          value={establishmentAt}
          setValue={setEstablishmentAt}
        />
      </div>
      <div className="flex flex-row gap-1">
        <Input
          id="ie"
          name="ie"
          label="Inscrição Estadual"
          isRequired={[true, "Informe a inscrição estadual"]}
          value={ie}
          setValue={setIe}
        />
        <Input
          id="im"
          name="im"
          label="Inscrição Municipal"
          value={im}
          setValue={setIm}
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
          isRequired={[true, "Informe um endereço de e-mail"]}
          value={email}
          setValue={setEmail}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1">
          <PasswordInput
            id="password"
            name="password"
            label="Criar senha"
            help={true}
            value={password}
            setValue={setPassword}
          />
          <PasswordConfirm
            id="passwordConfirmation"
            name="passwordConfirmation"
            label="Confirmar senha"
            value={passConfirmation}
            setValue={setPassConfirmation}
            passwordValue={password}
          />
        </div>
      </div>
    </>
  );
};
