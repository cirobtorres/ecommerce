import Styles from "../Styles.module.css";

const CNPJInput = ({
  value,
  setValue,
  text,
  placeholder,
  state,
}: {
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
  state?: State;
}) => {
  const maskCNPJ = (value: string) => {
    const input = value.replace(/\D/g, ""); // Get rid of any non numeric character

    let formattedValue = input;

    if (input.length > 2) {
      formattedValue = input.slice(0, 2) + "." + input.slice(2);
    }

    if (input.length > 5) {
      formattedValue = formattedValue.slice(0, 6) + "." + input.slice(5);
    }

    if (input.length > 8) {
      formattedValue = formattedValue.slice(0, 10) + "/" + input.slice(8, 12);
    }

    if (input.length > 12) {
      formattedValue = formattedValue.slice(0, 15) + "-" + input.slice(12, 14);
    }

    return formattedValue;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(maskCNPJ(event.target.value));
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`
        ${Styles["inner-container"]} 
        ${
          ((state?.errors?.cnpjBlankError && !value) ||
            state?.errors?.cnpjInvalidError ||
            state?.errors?.cnpjExistError) &&
          Styles["inner-container-error"]
        }
      `}
      >
        <input
          id="cnpj"
          name="cnpj"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="cnpj" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.cnpjBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">CNPJ é obrigatório</p>
      )}
      {state?.errors?.cnpjInvalidError && (
        <p className="text-xs px-2 mt-1 text-red-500">CNPJ não existe</p>
      )}
      {state?.errors?.cnpjExistError && (
        <p className="text-xs px-2 mt-1 text-red-500">CNPJ já cadastrado</p>
      )}
    </div>
  );
};

export default CNPJInput;
