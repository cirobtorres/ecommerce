import { FaAddressCard } from "react-icons/fa";

export default function Address({ addresses }: { addresses: any }) {
  return (
    <div className="max-h-full flex flex-col gap-3 shadow-generic rounded p-12 w-1/2 bg-white">
      <h2 className="flex items-center gap-3 text-theme-07 text-xl">
        <FaAddressCard /> Endereços
      </h2>
      <div className="flex flex-col gap-2 pr-2 text-sm overflow-y-auto">
        {addresses.map(
          (
            {
              responsible,
              street,
              num,
              district,
              reference,
              cep,
              city,
              state,
              standard,
            }: {
              responsible: string;
              street: string;
              num: number;
              district: string;
              reference: string;
              cep: string;
              city: string;
              state: string;
              standard: boolean;
            },
            index: number
          ) =>
            standard ? (
              <div
                key={index}
                className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-l-4 border-b-4 border-theme-07 bg-blue-100"
              >
                <div className="flex flex-col text-theme-03">
                  <span>
                    <b>{responsible}</b>
                  </span>
                  <span>{street}</span>
                  <span>
                    Número {num}, {district}
                  </span>
                  <span>{reference}</span>
                  <span>
                    CEP {cep} - {city}, {state}
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
                  <span>
                    <b>{responsible}</b>
                  </span>
                  <span>{street}</span>
                  <span>
                    Número {num}, {district}
                  </span>
                  <span>{reference}</span>
                  <span>
                    CEP {cep} - {city}, {state}
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
    </div>
  );
}
