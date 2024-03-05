"use client";

import Input from "@/components/Inputs/Input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaClipboardList } from "react-icons/fa";

export default function MyDataPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const [firstName, setFirstName] = useState(
    session?.user.name.split(" ")[0] ?? ""
  );
  const [lastName, setLastName] = useState(
    session?.user.name.split(" ").splice(1).join(" ") ?? ""
  );
  const [birthAt, setBirthAt] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(session?.user.email ?? "");

  return status === "loading" ? null : (
    <section className="flex flex-col gap-3 mx-60">
      <h1 className="flex items-center gap-3 text-theme-07 text-2xl my-4">
        <FaClipboardList /> Hello World
      </h1>
      <form className="flex flex-col gap-3 shadow-generic rounded p-12 bg-white">
        <Input
          id="updateFirstName"
          name="updateFirstName"
          label="Nome"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={firstName}
          setValue={setFirstName}
        />
        <Input
          id="updateLastName"
          name="updateLastName"
          label="Sobrenome"
          bgColor="bg-white"
          value={lastName}
          setValue={setLastName}
        />

        <Input
          id="updateBirthAt"
          name="updateBirthAt"
          label="Data de Nascimento"
          bgColor="bg-white"
          value={birthAt}
          setValue={setBirthAt}
        />
        <Input
          id="updateCPF"
          name="updateCPF"
          label="CPF"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={cpf}
          setValue={setCpf}
        />

        <Input
          id="updatePhone"
          name="updatePhone"
          label="Telefone"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={phone}
          setValue={setPhone}
        />
        <Input
          id="updateEmail"
          name="updateEmail"
          label="E-mail"
          bgColor="bg-white"
          isRequired={[true, ""]}
          value={email}
          setValue={setEmail}
        />
        <div className="flex gap-3">
          <button className="px-4 py-3 bg-theme-07 text-theme-01 rounded flex-1">
            Mudar E-mail
          </button>
          <button className="px-4 py-3 bg-theme-07 text-theme-01 rounded flex-1">
            Mudar Senha
          </button>
        </div>
      </form>
    </section>
  );
}
