import { FaLock } from "react-icons/fa6";
import Styles from "../Styles.module.css";

const EmailInput = ({
  id,
  value,
  setValue,
  text,
  placeholder,
  state,
  disable,
}: {
  id: string;
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
  state?: State;
  disable?: boolean;
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
          ${disable && Styles["inner-container-disabled"]}
        `}
      >
        <input
          id={id}
          name={id}
          type="email"
          value={value}
          onChange={handleOnChange}
          disabled={disable}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label
          htmlFor={id}
          className={`${!disable && Styles["label-element"]} ${disable && Styles["label-element-disabled"]}`}
        >
          {text}
        </label>
        {disable && <FaLock className={Styles["disabled-icon-lock"]} />}
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
