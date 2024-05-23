import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../../Inputs/Input";
import InputCEP from "../../Inputs/InputCEP";
import { BiSolidChevronLeft } from "react-icons/bi";
import { fetchCreateAddress } from "../../../lib/create-address";
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

export default function RegisterAddress({
  user,
  token,
  state: componentState,
  closeFunction,
}: {
  user: UserProps;
  token: string;
  state: boolean;
  closeFunction: (a: boolean, b: boolean) => void;
}) {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [place, setPlace] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [zipCodeResponse, setZipCodeResponse] =
    useState<ZipCodeResponseProps | null>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData: SavingAddressProps = {
      zipCode: zipCode.replace("-", ""),
      street,
      number: Number(number),
      place,
      neighborhood,
      city,
      state,
      user,
    };
    const response = await fetchCreateAddress(formData, token);
    if (response === "Forbidden") {
      // setError("Você não pode criar mais que 5 endereços");
    }
    closeFunction(false, false);
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
    componentState && (
      <>
        <motion.div
          onClick={() => closeFunction(false, false)}
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
    )
  );
}
