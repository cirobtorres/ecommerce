export default function GreetingsAddress({
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
}) {
  return (
    <div className="flex flex-1 flex-col gap-3 mb-4 bg-white rounded px-12 py-4 border border-light-gray shadow-generic">
      {id ? (
        <>
          <h2 className="text-2xl font-bold">Endereço atual</h2>
          <div className="flex flex-col text-sm text-theme-03">
            <span>{street}</span>
            <span>
              Número {number}, {neighborhood}
            </span>
            <span>{place}</span>
            <span>
              CEP {zipCode} - {city}, {state}
            </span>
          </div>
        </>
      ) : (
        <h2>Cadastrar endereço</h2>
      )}
    </div>
  );
}
