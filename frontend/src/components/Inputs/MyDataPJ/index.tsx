"use client";

import Input from "@/components/Inputs/Input";
import { formatDate, formatDocument, formatPhone } from "@/utils/formatStrings";
import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function MyDataPJ({
  id,
  email,
  phone,
  src,
  createdAt,
  updatedAt,
  privileges,
  active,
  PJ: { id: userId, legalName, brandName, cnpj, ie, im, establishmentAt },
}: {
  id: number;
  email: string;
  phone: string;
  src: string;
  createdAt: string;
  updatedAt: string;
  privileges: number;
  active: boolean;
  PJ: {
    id: number;
    legalName: string;
    brandName: string;
    cnpj: string;
    ie: string;
    im: string;
    establishmentAt: string;
  };
}) {
  const [clientLegalName, setClientLegalName] = useState(legalName ?? "");
  const [clientBrandName, setClientBrandName] = useState(brandName ?? "");
  const [clientEstablishmentAt, setClientEstablishmentAt] = useState(
    establishmentAt ? formatDate(establishmentAt, "backend", "/") : ""
  );
  const [clientCnpj, setClientCnpj] = useState(
    cnpj ? formatDocument(cnpj, "backend") : ""
  );
  const [clientIe, setClientIe] = useState(ie ?? "");
  const [clientIm, setClientIm] = useState(im ?? "");
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
          id="updateLegalName"
          name="updateLegalName"
          label="Razão Social"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientLegalName}
          setValue={setClientLegalName}
        />
        <Input
          id="updateBrandName"
          name="updateBrandName"
          label="Nome Fantasia"
          bgColor="bg-white"
          value={clientBrandName}
          setValue={setClientBrandName}
        />

        <Input
          id="updateEstablishmentAt"
          name="updateEstablishmentAt"
          label="Data de Constituição"
          bgColor="bg-white"
          mask="date"
          value={clientEstablishmentAt}
          setValue={setClientEstablishmentAt}
        />
        <Input
          id="updateCNPJ"
          name="updateCNPJ"
          label="CNPJ"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientCnpj}
          setValue={setClientCnpj}
        />
        <Input
          id="ie"
          name="ie"
          label="Inscrição Estadual"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={clientIe}
          setValue={setClientIe}
        />
        <Input
          id="im"
          name="im"
          label="Inscrição Municipal"
          bgColor="bg-white"
          value={clientIm}
          setValue={setClientIm}
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
