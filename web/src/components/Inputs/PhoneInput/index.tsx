import Styles from "../Styles.module.css";

const PhoneInput = ({
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
  const maskPhone = (value: string) => {
    const input = value.replace(/\D/g, ""); // Get rid of any non numeric character

    let formattedValue = input;

    if (input.length > 0) {
      formattedValue = "(" + input.slice(0, 2);
    }

    if (input.length > 2) {
      formattedValue = formattedValue.slice(0, 4) + ")" + input.slice(2, 7);
    }

    if (input.length > 7) {
      formattedValue = formattedValue.slice(0, 9) + "-" + input.slice(7, 11);
    }

    return formattedValue;
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(maskPhone(event.target.value));
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`${Styles["inner-container"]} ${state?.errors?.phoneBlankError && !value && Styles["inner-container-error"]}`}
      >
        <input
          id="phone"
          name="phone"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="phone" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.phoneBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">
          Precisamos de um telefone de contato
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
