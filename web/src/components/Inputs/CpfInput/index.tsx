import Styles from "../Styles.module.css";

const CpfInput = ({
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
  const maskCPF = (value: string) => {
    const input = value.replace(/\D/g, ""); // Get rid of any non numeric character

    let formattedValue = input;

    if (input.length > 3) {
      formattedValue = input.slice(0, 3) + "." + input.slice(3);
    }

    if (input.length > 6) {
      formattedValue = formattedValue.slice(0, 7) + "." + input.slice(6);
    }

    if (input.length > 9) {
      formattedValue = formattedValue.slice(0, 11) + "-" + input.slice(9, 11);
    }

    return formattedValue;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(maskCPF(event.target.value));
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`
          ${Styles["inner-container"]} 
          ${
            ((state?.errors?.cpfBlankError && !value) ||
              state?.errors?.cpfInvalidError ||
              state?.errors?.cpfExistError) &&
            Styles["inner-container-error"]
          }
          `}
      >
        <input
          id="cpf"
          name="cpf"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="cpf" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.cpfBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">CPF é obrigatório</p>
      )}
      {state?.errors?.cpfInvalidError && (
        <p className="text-xs px-2 mt-1 text-red-500">CPF não existe</p>
      )}
      {state?.errors?.cpfExistError && (
        <p className="text-xs px-2 mt-1 text-red-500">CPF já cadastrado</p>
      )}
    </div>
  );
};

export default CpfInput;
