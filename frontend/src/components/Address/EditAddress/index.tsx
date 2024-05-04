import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import InputCEP from "../../Inputs/InputCEP";
import Input from "../../Inputs/Input";
import { BiSolidChevronLeft } from "react-icons/bi";
import { chevronHover } from "../_variants/chevronHover";

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

export default function EditAddress({
  address,
  setState,
}: {
  address: AddressProps;
  setState: (a: boolean, b: boolean, c: null | [boolean, number]) => void;
}) {
  const [editZipCode, setEditZipCode] = useState(address.zipCode);
  const [zipCodeResponse, setZipCodeResponse] =
    useState<ZipCodeResponseProps | null>(null);

  const [editStreet, setEditStreet] = useState(address.street);
  const [editNumber, setEditNumber] = useState(String(address.number));
  const [editPlace, setEditPlace] = useState(address.place);
  const [editNeighborhood, setEditNeighborhood] = useState(
    address.neighborhood
  );
  const [editCity, setEditCity] = useState(address.city);
  const [editState, setEditState] = useState(address.state);

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
    <>
      <motion.div
        onClick={() => setState(false, false, null)}
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
    </>
  );
}
