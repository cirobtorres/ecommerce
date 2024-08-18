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
            state?.errors?.invalidCredentials ||
            state?.errors?.emailExistError ||
            state?.errors?.emailNotConfirmed) &&
          Styles["inner-container-error"]
        }
        `}
      >
        <input
          id={id}
          name={id}
          type="email"
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
      {state?.errors?.emailNotConfirmed && (
        <p className="text-xs px-2 mt-1 text-red-500">Usuário não confirmado</p>
      )}
      {state?.errors?.emailExistError && (
        <p className="text-xs px-2 mt-1 text-red-500">E-mail já cadastrado</p>
      )}
      {state?.errors?.invalidCredentials && (
        <p className="text-xs px-2 mt-1 text-red-500">
          E-mail ou senha inválidos
        </p>
      )}
    </div>
  );
};

export default EmailInput;
