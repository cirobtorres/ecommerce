export default function ListOfAddresses({
  addresses,
  modal,
  states,
  setStates,
}: {
  addresses: AddressProps[];
  modal: (event: any) => void;
  states: [boolean, null | [boolean, number]];
  setStates: (a: boolean, b: boolean, c: null | [boolean, number]) => void;
}) {
  return (
    !states[0] &&
    !states[1] && (
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 pr-2 text-sm overflow-y-auto">
          {addresses.map((address: AddressProps) =>
            address.defaultAddress ? (
              <DefaultAddress
                key={address.id}
                address={address}
                setStates={setStates}
              />
            ) : (
              <RemainingAddresses
                key={address.id}
                address={address}
                modal={modal}
                setStates={setStates}
              />
            )
          )}
        </div>
        <button
          className="mt-4 px-4 py-3 bg-theme-07 text-theme-01 rounded"
          onClick={() => setStates(true, false, null)}
        >
          Cadastrar Endereço
        </button>
      </div>
    )
  );
}

const DefaultAddress = ({
  address,
  setStates,
}: {
  address: AddressProps;
  setStates: (a: boolean, b: boolean, c: null | [boolean, number]) => void;
}) => {
  return (
    <div className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-l-4 border-b-4 border-theme-07 bg-blue-100">
      <div className="flex flex-col text-theme-03">
        <span>{address.street}</span>
        <span>
          Número {address.number}, {address.neighborhood}
        </span>
        <span>{address.place}</span>
        <span>
          CEP {address.zipCode} - {address.city}, {address.state}
        </span>
      </div>
      <div className="flex flex-col justify-between items-end">
        <span className="text-theme-07 uppercase">
          <b>Padrão</b>
        </span>
        <button
          type="button"
          onClick={(event) => setStates(false, false, [true, address.id])}
          className="transition-all duration-200 hover:text-theme-08"
        >
          Editar
        </button>
      </div>
    </div>
  );
};

const RemainingAddresses = ({
  address,
  modal,
  setStates,
}: {
  address: AddressProps;
  modal: (event: any) => void;
  setStates: (a: boolean, b: boolean, c: null | [boolean, number]) => void;
}) => {
  return (
    <div
      onClick={modal}
      className="cursor-pointer transition-all duration-300 flex justify-between px-4 py-2 rounded border border-transparent border-l-4 border-b-4" // hover:border-theme-07 hover:border-l-4 hover:border-b-4 hover:bg-blue-100
    >
      <div className="flex flex-col text-theme-03">
        <span>{address.street}</span>
        <span>
          Número {address.number}, {address.neighborhood}
        </span>
        <span>{address.place}</span>
        <span>
          CEP {address.zipCode} - {address.city}, {address.state}
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
          onClick={(event) => setStates(false, false, [true, address.id])}
          className="transition-all duration-200 hover:text-theme-08"
        >
          Editar
        </button>
      </div>
    </div>
  );
};
