import Styles from "../Styles.module.css";

const EmailInput = ({
  id,
  value,
  setValue,
  text,
  placeholder,
  state,
}: {
  id: string;
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
  state?: State;
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`${Styles["inner-container"]} ${
          ((state?.errors?.emailBlankError && !value) ||
            state?.errors?.emailExistError) &&
          Styles["inner-container-error"]
        }
        `}
      >
        <input
          id={id}
          name={id}
          type="email"
          // autoComplete="off"
          // aria-autocomplete="none"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor={id} className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.emailBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">Campo obrigatório</p>
      )}
      {state?.errors?.emailExistError && (
        <p className="text-xs px-2 mt-1 text-red-500">E-mail já cadastrado</p>
      )}
    </div>
  );
};

export default EmailInput;
