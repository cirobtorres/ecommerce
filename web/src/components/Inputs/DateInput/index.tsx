import Styles from "../Styles.module.css";

const DateInput = ({
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
  const maskDate = (value: string) => {
    const input = value.replace(/\D/g, ""); // Get rid of any non numeric character

    let formattedValue = input;

    if (input.length > 2) {
      formattedValue = input.slice(0, 2) + "/" + input.slice(2);
    }
    if (input.length > 4) {
      formattedValue = formattedValue.slice(0, 5) + "/" + input.slice(4, 8);
    }
    return formattedValue;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(maskDate(event.target.value));
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`
          ${Styles["inner-container"]} 
          ${
            ((state?.errors?.birthDateBlankError && !value) ||
              state?.errors?.birthDateInvalidError) &&
            Styles["inner-container-error"]
          }
          `}
      >
        <input
          id="birth-date"
          name="birth-date"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="birth-date" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.birthDateBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">
          Nos diga sua data de nascimento
        </p>
      )}
      {state?.errors?.birthDateInvalidError && (
        <p className="text-xs px-2 mt-1 text-red-500">Data inválida</p>
      )}
    </div>
  );
};

export default DateInput;
