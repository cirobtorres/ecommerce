"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidChevronLeft } from "react-icons/bi";
import Input from "../Inputs/Input";
import InputCEP from "../Inputs/InputCEP";
import { fetchCreateAddress } from "../../lib/create-address";

const chevronHover = {
  initial: { x: 0, opacity: 0 },
  animate: { x: "-5px", opacity: 1 },
};

interface ZipCodeResponseProps {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export default function Address({
  user,
  addresses,
  token,
}: {
  user: any;
  addresses: any;
  token: string;
}) {
  const [registerAddress, setRegisterAddress] = useState(false);

  const [zipCode, setZipCode] = useState("");
  const [zipCodeResponse, setZipCodeResponse] =
    useState<ZipCodeResponseProps | null>(null);

  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [place, setPlace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData: Address = {
      zipCode: zipCode.replace("-", ""),
      street,
      number: Number(number),
      place,
      neighborhood,
      city,
      state,
      user,
    };
    await fetchCreateAddress(formData, token);
    setRegisterAddress(false);
  };

  useEffect(() => {
    if (zipCodeResponse) {
      setCity(zipCodeResponse.localidade);
      setState(zipCodeResponse.uf);
      setStreet(zipCodeResponse.logradouro);
      setNeighborhood(zipCodeResponse.bairro);
    }
  }, [zipCodeResponse]);

  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
      {registerAddress ? (
        <>
          <motion.div
            onClick={() => setRegisterAddress(false)}
            initial="initial"
            animate="initial"
            whileHover="animate"
            transition={{ ease: "easeInOut", duration: 0.15 }}
            className="relative flex items-center cursor-pointer hover:text-theme-08 transition-all w-fit"
          >
            <motion.div variants={chevronHover} className="absolute -left-4">
              <BiSolidChevronLeft size="1.25rem" />
            </motion.div>
            <h4 className="text-lg font-bold">Voltar</h4>
          </motion.div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-row gap-2 flex-[4_2_0%]">
                  <InputCEP
                    id="zipCode"
                    name="zipCode"
                    label="CEP"
                    value={zipCode}
                    setValue={setZipCode}
                    bgColor="bg-white"
                    flexSize="flex-1"
                    onBlur={setZipCodeResponse}
                  />
                  <Input
                    id="city"
                    name="city"
                    label="Cidade"
                    value={city}
                    setValue={setCity}
                    bgColor="bg-white"
                    flexSize="flex-[2_2_0%]"
                  />
                </div>
                <Input
                  id="state"
                  name="state"
                  label="UF"
                  value={state}
                  setValue={setState}
                  bgColor="bg-white"
                  flexSize="flex-1"
                />
              </div>
              <Input
                id="street"
                name="street"
                label="Logradouro"
                value={street}
                setValue={setStreet}
                bgColor="bg-white"
              />
              <Input
                id="neighborhood"
                name="neighborhood"
                label="Bairro"
                value={neighborhood}
                setValue={setNeighborhood}
                bgColor="bg-white"
              />
              <div className="flex flex-row gap-2">
                <Input
                  id="place"
                  name="place"
                  label="Complemento"
                  value={place}
                  setValue={setPlace}
                  placeholder="Ex: Ap-401, bloco A"
                  bgColor="bg-white"
                  flexSize="flex-[4_2_0%]"
                />
                <Input
                  id="number"
                  name="number"
                  label="Número"
                  value={number}
                  setValue={setNumber}
                  bgColor="bg-white"
                  flexSize="flex-1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-3 bg-theme-07 text-theme-01 rounded"
            >
              Criar Endereço
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2 pr-2 text-sm overflow-y-auto">
            {addresses.map(
              (
                {
                  id,
                  street,
                  number,
                  neighborhood,
                  city,
                  state,
                  zipCode,
                  place,
                  defaultAddress,
                }: {
                  id: number;
                  street: string;
                  number: number;
                  neighborhood: string;
                  city: string;
                  state: string;
                  zipCode: string;
                  place: string;
                  defaultAddress: boolean;
                },
                index: number
              ) =>
                defaultAddress ? (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-l-4 border-b-4 border-theme-07 bg-blue-100"
                  >
                    <div className="flex flex-col text-theme-03">
                      <span>{street}</span>
                      <span>
                        Número {number}, {neighborhood}
                      </span>
                      <span>{place}</span>
                      <span>
                        CEP {zipCode} - {city}, {state}
                      </span>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <span className="text-theme-07 uppercase">
                        <b>Padrão</b>
                      </span>
                      <button>Editar</button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-transparent border-l-4 border-b-4 hover:border-theme-07 hover:border-l-4 hover:border-b-4 hover:bg-blue-100"
                  >
                    <div className="flex flex-col text-theme-03">
                      <span>{street}</span>
                      <span>
                        Número {number}, {neighborhood}
                      </span>
                      <span>{place}</span>
                      <span>
                        CEP {zipCode} - {city}, {state}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2 items-end">
                      <button>Excluir</button>
                      <button>Editar</button>
                    </div>
                  </div>
                )
            )}
          </div>
          <button
            className="px-4 py-3 bg-theme-07 text-theme-01 rounded"
            onClick={() => setRegisterAddress(true)}
          >
            Cadastrar Endereço
          </button>
        </div>
      )}
    </div>
  );
}
