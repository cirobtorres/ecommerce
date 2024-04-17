"use client";

import Input from "@/components/Inputs/Input";
import { formatDate, formatDocument, formatPhone } from "@/utils/formatStrings";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function MyDataPF({
  id,
  phone,
  email,
  privileges,
  active,
  PF: { id: userId, firstName, lastName, birthAt, cpf },
}: {
  id: number;
  phone: string;
  email: string;
  privileges: number;
  active: boolean;
  PF: {
    id: number;
    firstName: string;
    lastName: string;
    birthAt: string;
    cpf: string;
  };
}) {
  const [clientFirstName, setClientFirstName] = useState(firstName ?? "");
  const [clientLastName, setClientLastName] = useState(lastName ?? "");
  const [clientBirthAt, setClientBirthAt] = useState(
    birthAt ? formatDate(birthAt, "backend", "/") : ""
  );
  const [clientCpf, setClientCpf] = useState(
    cpf ? formatDocument(cpf, "backend") : ""
  );
  const [clientPhone, setClientPhone] = useState(
    phone ? formatPhone(phone, "backend") : ""
  );
  const [clientEmail, setClientEmail] = useState(email ?? "");

  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaInfoCircle /> Dados
      </h2>
      <form>
        <div className="flex gap-3">
          <button className="ml-auto w-96 border border-theme-07 rounded text-theme-07 bg-white uppercase font-bold px-4 py-2">
            Mudar E-mail
          </button>
          <button className="ml-auto w-96 border border-theme-07 rounded text-theme-07 bg-white uppercase font-bold px-4 py-2">
            Mudar Senha
          </button>
        </div>
      </form>
      <form className="flex flex-col gap-3">
        <Input
          id="updateFirstName"
          name="updateFirstName"
          label="Nome"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientFirstName}
          setValue={setClientFirstName}
        />
        <Input
          id="updateLastName"
          name="updateLastName"
          label="Sobrenome"
          bgColor="bg-white"
          value={clientLastName}
          setValue={setClientLastName}
        />

        <Input
          id="updateBirthAt"
          name="updateBirthAt"
          label="Data de Nascimento"
          bgColor="bg-white"
          mask="date"
          value={clientBirthAt}
          setValue={setClientBirthAt}
        />
        <Input
          id="updateCPF"
          name="updateCPF"
          label="CPF"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientCpf}
          setValue={setClientCpf}
        />

        <Input
          id="updatePhone"
          name="updatePhone"
          label="Telefone"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientPhone}
          setValue={setClientPhone}
        />
        <Input
          id="updateEmail"
          name="updateEmail"
          label="E-mail"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientEmail}
          setValue={setClientEmail}
        />
        <div className="flex gap-3">
          <button className="px-4 py-3 text-theme-07 font-extrabold flex-1">
            Excluir Conta
          </button>
          <button className="px-4 py-3 bg-theme-07 text-theme-01 rounded flex-1">
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}
