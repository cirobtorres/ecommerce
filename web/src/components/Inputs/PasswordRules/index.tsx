"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import zxcvbn from "zxcvbn";
import Styles from "../Styles.module.css";

// Password and Password Confirmation has different sets of errors
// That's why PasswordInputWithRules has to have discriminated each error individually
const PasswordInputWithRules = ({
  value,
  setValue,
  id,
  text,
  placeholder,
  passwordBlankError,
  passwordsNotMatchError,
  passwordMinError,
  passwordUpperCaseError,
  passwordLowerCaseError,
  passwordPunctuationError,
  passwordDigitsError,
}: {
  value: string;
  setValue: (value: string) => void;
  id: string;
  text: string;
  placeholder: string;
  passwordBlankError?: boolean;
  passwordsNotMatchError?: boolean;
  passwordMinError?: boolean;
  passwordUpperCaseError?: boolean;
  passwordLowerCaseError?: boolean;
  passwordPunctuationError?: boolean;
  passwordDigitsError?: boolean;
}) => {
  const [type, setType] = useState<"text" | "password">("password");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTypeToggle = () => {
    setType(type === "password" ? "text" : "password");
    setTimeout(() => {
      // setTimeout is used here to ensure the focus and selection range are updated after DOM remontage
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(value.length, value.length); // Set position focus after the last character of the input value
      }
    }, 0);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`
          ${Styles["inner-container"]} 
          ${Styles["pass-label-element-padding"]} 
          ${
            (passwordsNotMatchError ||
              (passwordBlankError && !value) ||
              passwordMinError ||
              passwordUpperCaseError ||
              passwordLowerCaseError ||
              passwordPunctuationError ||
              passwordDigitsError) &&
            Styles["inner-container-error"]
          }
        `}
      >
        <input
          ref={inputRef}
          id={id}
          name={id}
          type={type}
          autoComplete="new-password"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["pass-input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="password" className={Styles["label-element"]}>
          {text}
        </label>
        <button
          type="button"
          onClick={handleTypeToggle}
          className={Styles["pass-toggle-eye"]}
          tabIndex={-1}
        >
          {type === "password" ? (
            <IoEyeOffOutline className={Styles["toggle-off"]} />
          ) : (
            <IoEyeOutline className={Styles["toggle-on"]} />
          )}
        </button>
      </div>
      {passwordsNotMatchError && (
        <p className="text-xs px-2 mt-1 text-red-500">Senhas não conferem</p>
      )}
      {passwordBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">Campo obrigatório</p>
      )}
      {passwordMinError && (
        <p className="text-xs px-2 mt-1 text-red-500">Ao menos 8 caracteres</p>
      )}
      {passwordUpperCaseError && (
        <p className="text-xs px-2 mt-1 text-red-500">Ao menos 1 maiúscula</p>
      )}
      {passwordLowerCaseError && (
        <p className="text-xs px-2 mt-1 text-red-500">Ao menos 1 minúscula</p>
      )}
      {passwordPunctuationError && (
        <p className="text-xs px-2 mt-1 text-red-500">
          Ao menos 1 caractere especial
        </p>
      )}
      {passwordDigitsError && (
        <p className="text-xs px-2 mt-1 text-red-500">Ao menos 1 número</p>
      )}
    </div>
  );
};

const initialState = {
  // A value of true means there is an error on the form
  passwordMinError: true,
  passwordUpperCaseError: true,
  passwordLowerCaseError: true,
  passwordPunctuationError: true,
  passwordDigitsError: true,
};

enum ValidatePassTypes {
  HAS_MIN_CHAR = "HAS_MIN_CHAR",
  HAS_UPPER_CASE = "HAS_UPPER_CASE",
  HAS_LOWER_CASE = "HAS_LOWER_CASE",
  HAS_PUNCTUATION = "HAS_PUNCTUATION",
  HAS_DIGIT = "HAS_DIGIT",
}

interface ValidatePassAction {
  type: ValidatePassTypes;
  payload: boolean;
}

const reducer = (state: PassErrorState, action: ValidatePassAction) => {
  switch (action.type) {
    case "HAS_MIN_CHAR":
      return { ...state, passwordMinError: action.payload };
    case "HAS_UPPER_CASE":
      return { ...state, passwordUpperCaseError: action.payload };
    case "HAS_LOWER_CASE":
      return { ...state, passwordLowerCaseError: action.payload };
    case "HAS_PUNCTUATION":
      return { ...state, passwordPunctuationError: action.payload };
    case "HAS_DIGIT":
      return { ...state, passwordDigitsError: action.payload };
    default:
      return state;
  }
};

const PasswordRules = ({ state }: { state: State }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [progress, setProgress] = useState("");
  const [message, setMessage] = useState("");
  const [errors, dispatchErrors] = useReducer(reducer, initialState);

  const getActiveColor = (type: string) => {
    switch (type) {
      case "muito forte":
        return "#3fbb60";
      case "forte":
        return "#e4c642";
      case "médio":
        return "#fe804d";
      default:
        return "#ff0054";
    }
  };

  const handleProgressBar = (pass: string) => {
    const passwordMeter = zxcvbn(pass);

    let strength =
      passwordMeter.score >= 4
        ? "muito forte"
        : passwordMeter.score >= 3
          ? "forte"
          : passwordMeter.score >= 2
            ? "médio"
            : passwordMeter.score >= 1
              ? "fraco"
              : "muito fraco";

    if (pass.length >= 8) {
      dispatchErrors({ type: ValidatePassTypes.HAS_MIN_CHAR, payload: false });
    } else {
      dispatchErrors({ type: ValidatePassTypes.HAS_MIN_CHAR, payload: true });
    }

    if (/[A-Z]/.test(pass)) {
      dispatchErrors({
        type: ValidatePassTypes.HAS_UPPER_CASE,
        payload: false,
      });
    } else {
      dispatchErrors({
        type: ValidatePassTypes.HAS_UPPER_CASE,
        payload: true,
      });
    }

    if (/[a-z]/.test(pass)) {
      dispatchErrors({
        type: ValidatePassTypes.HAS_LOWER_CASE,
        payload: false,
      });
    } else {
      dispatchErrors({
        type: ValidatePassTypes.HAS_LOWER_CASE,
        payload: true,
      });
    }

    if (/\d/.test(pass)) {
      dispatchErrors({
        type: ValidatePassTypes.HAS_DIGIT,
        payload: false,
      });
    } else {
      dispatchErrors({
        type: ValidatePassTypes.HAS_DIGIT,
        payload: true,
      });
    }

    if (/[^\w]/.test(pass)) {
      dispatchErrors({
        type: ValidatePassTypes.HAS_PUNCTUATION,
        payload: false,
      });
    } else {
      dispatchErrors({
        type: ValidatePassTypes.HAS_PUNCTUATION,
        payload: true,
      });
    }

    setPassword1(pass);
    setProgress(`${passwordMeter.score * 25}%`);
    setMessage(strength);
  };

  return (
    <>
      <div>
        <div className="flex gap-[6px] mb-3">
          <PasswordInputWithRules
            id="password1"
            value={password1}
            setValue={handleProgressBar}
            passwordBlankError={state.errors?.passwordBlankError || false}
            passwordsNotMatchError={
              state.errors?.passwordsNotMatchError || false
            }
            passwordMinError={
              errors.passwordMinError ? state.errors?.passwordMinError : false
            }
            passwordUpperCaseError={
              errors.passwordUpperCaseError
                ? state.errors?.passwordUpperCaseError
                : false
            }
            passwordLowerCaseError={
              errors.passwordLowerCaseError
                ? state.errors?.passwordLowerCaseError
                : false
            }
            passwordPunctuationError={
              errors.passwordPunctuationError
                ? state.errors?.passwordPunctuationError
                : false
            }
            passwordDigitsError={
              errors.passwordDigitsError
                ? state.errors?.passwordDigitsError
                : false
            }
            text="Senha"
            placeholder=""
          />
          <PasswordInputWithRules
            id="password2"
            value={password2}
            setValue={setPassword2}
            passwordsNotMatchError={
              state.errors?.passwordsNotMatchError || false
            }
            text="Confirmar Senha"
            placeholder=""
          />
        </div>
      </div>
      <input
        type="hidden"
        value={JSON.stringify(errors)}
        name="password-rules"
      />
      <div className={Styles["pass-progress-bar-container"]}>
        <p className={Styles["pass-progress-bar-message"]}>
          Força da senha: {password1 && message}
        </p>
        <div className={Styles["pass-progress-bar-bg"]}>
          <div
            className={Styles["pass-progress-bar"]}
            style={{
              width: progress,
              backgroundColor: getActiveColor(message),
            }}
          />
        </div>
      </div>
      <div className={Styles["pass-rules-container"]}>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: password1 === password2 ? "#22c55e" : "#ef4444",
          }}
        >
          Confirmação de Senha
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: password1.length >= 8 ? "#22c55e" : "#ef4444",
          }}
        >
          &gt; 8 caracteres
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[A-Z]/.test(password1) ? "#22c55e" : "#ef4444",
          }}
        >
          Maiúscula
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[a-z]/.test(password1) ? "#22c55e" : "#ef4444",
          }}
        >
          Minúscula
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /\d/.test(password1) ? "#22c55e" : "#ef4444",
          }}
        >
          Dígito
        </span>
        <span
          className={Styles["pass-rules-elements"]}
          style={{
            backgroundColor: /[^\w]/.test(password1) ? "#22c55e" : "#ef4444",
          }}
        >
          Símbolo
        </span>
      </div>
    </>
  );
};

export default PasswordRules;
