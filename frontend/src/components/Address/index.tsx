"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAddressCard } from "react-icons/fa";
import { BiSolidChevronLeft } from "react-icons/bi";
import Input from "../Inputs/Input";
import InputCEP from "../Inputs/InputCEP";
import { fetchCreateAddress } from "../../lib/create-address";
import {
  MdMarkEmailRead,
  MdPhoneIphone,
  MdLocalShipping,
} from "react-icons/md";
import ChildrenModal from "../ChildrenModal";

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
  const [editAddress, setEditAddress] = useState<null | [boolean, number]>(
    null
  );
  const [addressModal, setAddressModal] = useState(false);

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

  const hideEmail = (email: string) => {
    const [b, a] = email.split("@");
    const substringOne = b[0] + "..." + b.slice(-1);
    const [_b, _a] = a.split(".");
    const substringTwo = _b[0] + "..." + _a;
    return substringOne + "@" + substringTwo;
  };

  const hidePhone = (phone: string) => {
    return `(${phone.slice(0, 2)})#####-${phone.slice(-4)}`;
  };

  const handleAddressModal = (event: any) => {
    if (event.target.tagName !== "BUTTON") setAddressModal(!addressModal);
  };

  useEffect(() => {
    /* 
    Quando usuário "clica fora" do input de CEP com um CEP válido
    o método onBlur do InputCEP entra em ação. Se a API dos correios retornar
    um objeto válido, o método onBlur simplesmente "seta" o valor de zipCodeResponse.
    Esse useEffect então é disparado
    */
    if (zipCodeResponse) {
      setCity(zipCodeResponse.localidade);
      setState(zipCodeResponse.uf);
      setStreet(zipCodeResponse.logradouro);
      setNeighborhood(zipCodeResponse.bairro);
    }
  }, [zipCodeResponse]);

  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      {addressModal && (
        <ChildrenModal
          icon={MdLocalShipping}
          modalTitle="Alterar Endereço"
          closeModal={setAddressModal}
        >
          <p className="text-theme-03">
            Por questões de segurança, para alteração do endereço de entrega
            enviaremos um código de validação para seu endereço de <b>e-mail</b>{" "}
            ou <b>telefone de contato</b>.
          </p>
          <div className="flex gap-3">
            <ConfirmationButton
              icon={MdMarkEmailRead}
              toHide={hideEmail(user.email)}
              confirmClick={() => console.log("Email")}
            />
            <ConfirmationButton
              icon={MdPhoneIphone}
              toHide={hidePhone(user.phone)}
              confirmClick={() => console.log("Phone")}
            />
          </div>
        </ChildrenModal>
      )}
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
      {registerAddress && (
        <>
          <motion.div
            onClick={() => {
              setEditAddress(null);
              setRegisterAddress(false);
            }}
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
      )}
      {!registerAddress && !editAddress && (
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
                    key={id}
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
                      <button
                        type="button"
                        onClick={() => console.log("Editar")}
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    key={id}
                    // onClick={() => setAddressModal(!addressModal)}
                    onClick={handleAddressModal}
                    className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-transparent border-l-4 border-b-4" // hover:border-theme-07 hover:border-l-4 hover:border-b-4 hover:bg-blue-100
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
                      <button
                        type="button"
                        onClick={() => console.log("Excluir")}
                        className="transition-all duration-200 hover:text-theme-08"
                      >
                        Excluir
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          setEditAddress([true, id]);
                          setRegisterAddress(false);
                        }}
                        className="transition-all duration-200 hover:text-theme-08"
                      >
                        Editar
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
          <button
            className="px-4 py-3 bg-theme-07 text-theme-01 rounded"
            onClick={() => {
              setEditAddress(null);
              setRegisterAddress(true);
            }}
          >
            Cadastrar Endereço
          </button>
        </div>
      )}
      {editAddress && (
        <>
          <motion.div
            onClick={() => {
              setEditAddress(null);
              setRegisterAddress(false);
            }}
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
          <EditAddress
            {...addresses.filter(
              (address: any) => address.id === editAddress[1]
            )[0]}
          />
        </>
      )}
    </div>
  );
}

const ConfirmationButton = ({
  icon: Icon,
  toHide,
  confirmClick,
}: {
  icon: any;
  toHide: string;
  confirmClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={confirmClick}
      className="flex flex-col items-center p-3 w-44 h-30 rounded border-2 border-theme-02 hover:text-theme-08 hover:border-theme-08 transition-all duration-300 group"
    >
      <Icon size={20} />
      <h3 className="text-base group-hover:text-theme-08 transition-all duration-300">
        E-mail
      </h3>
      <p className="text-xs text-theme-03">
        Enviaremos um código para o E-mail:
        <br />
        <b>{toHide}</b>
      </p>
    </button>
  );
};

const EditAddress = ({
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
}) => {
  const [editZipCode, setEditZipCode] = useState(zipCode);
  const [zipCodeResponse, setZipCodeResponse] =
    useState<ZipCodeResponseProps | null>(null);

  const [editStreet, setEditStreet] = useState(street);
  const [editNumber, setEditNumber] = useState(String(number));
  const [editPlace, setEditPlace] = useState(place);
  const [editNeighborhood, setEditNeighborhood] = useState(neighborhood);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);

  useEffect(() => {
    /* 
    Quando usuário "clica fora" do input de CEP com um CEP válido
    o método onBlur do InputCEP entra em ação. Se a API dos correios retornar
    um objeto válido, o método onBlur simplesmente "seta" o valor de zipCodeResponse.
    Esse useEffect então é disparado
    */
    if (zipCodeResponse) {
      setEditCity(zipCodeResponse.localidade);
      setEditState(zipCodeResponse.uf);
      setEditStreet(zipCodeResponse.logradouro);
      setEditNeighborhood(zipCodeResponse.bairro);
    }
  }, [zipCodeResponse]);

  return (
    <form
      // onSubmit={handleSubmit}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <div className="flex flex-row gap-2 flex-[4_2_0%]">
            <InputCEP
              id="zipCode"
              name="zipCode"
              label="CEP"
              value={editZipCode}
              setValue={setEditZipCode}
              bgColor="bg-white"
              flexSize="flex-1"
              onBlur={setZipCodeResponse}
            />
            <Input
              id="city"
              name="city"
              label="Cidade"
              value={editCity}
              setValue={setEditCity}
              bgColor="bg-white"
              flexSize="flex-[2_2_0%]"
            />
          </div>
          <Input
            id="state"
            name="state"
            label="UF"
            value={editState}
            setValue={setEditState}
            bgColor="bg-white"
            flexSize="flex-1"
          />
        </div>
        <Input
          id="street"
          name="street"
          label="Logradouro"
          value={editStreet}
          setValue={setEditStreet}
          bgColor="bg-white"
        />
        <Input
          id="neighborhood"
          name="neighborhood"
          label="Bairro"
          value={editNeighborhood}
          setValue={setEditNeighborhood}
          bgColor="bg-white"
        />
        <div className="flex flex-row gap-2">
          <Input
            id="place"
            name="place"
            label="Complemento"
            value={editPlace}
            setValue={setEditPlace}
            placeholder="Ex: Ap-401, bloco A"
            bgColor="bg-white"
            flexSize="flex-[4_2_0%]"
          />
          <Input
            id="number"
            name="number"
            label="Número"
            value={editNumber}
            setValue={setEditNumber}
            bgColor="bg-white"
            flexSize="flex-1"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-3 bg-theme-07 text-theme-01 rounded"
      >
        Salvar Endereço
      </button>
    </form>
  );
};
