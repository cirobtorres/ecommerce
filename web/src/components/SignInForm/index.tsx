"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signInWithEmail } from "../../lib/authentication/signInWithEmail";
import {
  handleNewConfirmationLink,
  handlePasswordResetLink,
} from "../../lib/authentication/auth";
import {
  SignIn,
  FacebookSignIn,
  GoogleSignIn,
  SignInMagicLink,
  GenericButton,
  ResetPassworButton,
} from "../Buttons";
import { IoIosClose } from "react-icons/io";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import FlashMessage from "../FlashMessage";
import Styles from "./Styles.module.css";
import LoginInput from "../Inputs/LoginInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useFormState<State, FormData>(signInWithEmail, {
    errors: null,
  });
  const [forgotPasswordWindow, setForgotPasswordWindow] = useState(false);
  const [resendLinkWindow, setResendLinkWindow] = useState(false);

  return (
    <div className={Styles["signin-outter-container"]}>
      <div className={Styles["signin-inner-container"]}>
        <div className={Styles["signin-heading-container"]}>
          <h1 className={Styles["signin-heading"]}>Entrar</h1>
        </div>
        <form action={formAction} className={Styles["signin-form-container"]}>
          <EmailInput
            id="email"
            value={email}
            setValue={setEmail}
            state={state}
            text="E-mail"
            placeholder="johndoe@email.com"
          />
          <PasswordInput
            value={password}
            setValue={setPassword}
            state={state}
            id="password"
            text="Senha"
            placeholder=""
          />
          {state?.errors?.emailNotConfirmed ? (
            <>
              <FlashMessage type="warning">
                Confirme o link de autenticação enviado para seu e-mail
              </FlashMessage>
              <span className="text-xs">ou</span>
              <FlashMessage type="info">
                Clique{" "}
                <button
                  className="font-extrabold hover:underline"
                  onClick={async () => {
                    setResendLinkWindow(true);
                    // handleNewConfirmationLink({ email, password });
                  }}
                >
                  AQUI
                </button>{" "}
                para receber um novo link de autenticação{" "}
              </FlashMessage>
            </>
          ) : null}
          <SignIn text="Login" />
        </form>
        <ForgotPasswordWindow
          window={forgotPasswordWindow}
          toggleWindow={setForgotPasswordWindow}
        />
        <ResendAuthLinkWindow
          window={resendLinkWindow}
          toggleWindow={setResendLinkWindow}
        />
        <SignInWithMagicLinkWindow />
        <button
          className={Styles["signin-forgot-password"]}
          onClick={() => setForgotPasswordWindow(true)}
        >
          Esqueci minha senha
        </button>
        <div className={Styles["signin-border-split"]}>
          <hr />
          <span>ou</span>
          <hr />
        </div>
        <div className={Styles["signin-oauth-buttons-container"]}>
          <form>
            <GoogleSignIn />
          </form>
          <form>
            <FacebookSignIn />
          </form>
        </div>
        <div className={Styles["signin-link-container"]}>
          <Link href="/cadastrar" className={Styles["signin-link"]}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
}

const SignInWithMagicLinkWindow = () => {
  const [magicLinkEmail, setMagicLinkEmail] = useState("");
  const [magicLinkWindow, setMagicLinkWindow] = useState(false);
  const [state, formAction] = useFormState<State, FormData>(signInWithEmail, {
    errors: null,
  });

  const handleMagicLinkButton = (event: React.MouseEvent) => {
    event.preventDefault();
    setMagicLinkWindow(!magicLinkWindow);
  };

  const handleMagicLinkClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      setMagicLinkWindow(false);
    }
  };

  useEffect(() => {
    if (magicLinkWindow) {
      document.body.classList.add("modal-shown");
    } else {
      document.body.classList.remove("modal-shown");
    }
  }, [magicLinkWindow]);

  return (
    <>
      <GenericButton
        setState={handleMagicLinkButton}
        options={{
          backgroundColor: "#0ea5e9",
          pendingBackgroundColor: "#0ea5e9",
        }}
      >
        Acesso único por e-mail
      </GenericButton>
      <>
        {magicLinkWindow && (
          <div
            className={Styles["magic-link-main-container"]}
            onClick={handleMagicLinkClose}
          />
        )}
        <form
          className={`
                ${Styles["magic-link-window-form-container"]} 
                ${magicLinkWindow ? Styles["magic-link-window-entrance-animation"] : ""}
              `}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-extrabold text-[#1d4f91] truncate">
              Receber acesso por e-mail
            </h2>
            <IoIosClose
              className="flex-shrink-0 mb-auto mt-0 text-4xl cursor-pointer"
              onClick={handleMagicLinkButton}
            />
          </div>
          <p>Defina um e-mail para receber o link de autenticação.</p>
          <EmailInput
            id="magic-link-email"
            value={magicLinkEmail}
            setValue={setMagicLinkEmail}
            state={state}
            text="E-mail"
            placeholder="johndoe@email.com"
          />
          <SignInMagicLink text="Enviar" />
        </form>
      </>
    </>
  );
};

const ResendAuthLinkWindow = ({
  window,
  toggleWindow,
}: {
  window: boolean;
  toggleWindow: (value: boolean) => void;
}) => {
  const [resendLinkEmail, setResendLinkEmail] = useState("");
  const [state, formAction] = useFormState<State, FormData>(signInWithEmail, {
    errors: null,
  });

  const handleMagicLinkButton = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleWindow(!window);
  };

  const handleMagicLinkClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      toggleWindow(false);
    }
  };

  useEffect(() => {
    if (window) {
      document.body.classList.add("modal-shown");
    } else {
      document.body.classList.remove("modal-shown");
    }
  }, [window]);

  return (
    <>
      {window && (
        <div
          className={Styles["magic-link-main-container"]}
          onClick={handleMagicLinkClose}
        />
      )}
      <form
        className={`
                ${Styles["magic-link-window-form-container"]} 
                ${window ? Styles["magic-link-window-entrance-animation"] : ""}
              `}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-[#1d4f91] truncate">
            Receber acesso por e-mail
          </h2>
          <IoIosClose
            className="flex-shrink-0 mb-auto mt-0 text-4xl cursor-pointer"
            onClick={handleMagicLinkButton}
          />
        </div>
        <EmailInput
          id="resend-link-email"
          value={resendLinkEmail}
          setValue={setResendLinkEmail}
          state={state}
          text="E-mail"
          placeholder="johndoe@email.com"
        />
        <SignInMagicLink text="Enviar" />
      </form>
    </>
  );
};

const ForgotPasswordWindow = ({
  window,
  toggleWindow,
}: {
  window: boolean;
  toggleWindow: (value: boolean) => void;
}) => {
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [buttonActive, setButtonActive] = useState("");
  const [state, formAction] = useFormState<State, FormData>(
    handlePasswordResetLink,
    {
      errors: null,
    }
  );

  const handleForgotPasswordButton = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleWindow(!window);
  };

  const handleForgotPasswordClose = (event: React.MouseEvent) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      toggleWindow(false);
    }
  };

  useEffect(() => {
    if (window) {
      document.body.classList.add("modal-shown");
    } else {
      document.body.classList.remove("modal-shown");
    }
  }, [window]);

  return (
    <>
      {window && (
        <div
          className={Styles["magic-link-main-container"]}
          onClick={handleForgotPasswordClose}
        />
      )}
      <form
        action={formAction}
        className={`
                ${Styles["magic-link-window-form-container"]} 
                ${window ? Styles["magic-link-window-entrance-animation"] : ""}
              `}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-extrabold text-[#1d4f91] truncate uppercase">
            Recuperação de senha
          </h2>
          <IoIosClose
            className="flex-shrink-0 mb-auto mt-0 text-4xl cursor-pointer"
            onClick={handleForgotPasswordButton}
          />
        </div>
        <p>
          Informe algum dado cadastral e a forma desejada para receber o link de
          recuperação.
        </p>
        <LoginInput
          id="forgot-password-data" // CPF, CNPJ, E-mail
          text="E-mail, CPF ou CNPJ"
          placeholder=""
        />
        {/* <EmailInput
          id="forgot-password-data"
          value={forgotPasswordEmail}
          setValue={setForgotPasswordEmail}
          state={state}
          text="E-mail, CPF ou CNPJ"
          placeholder=""
        /> */}
        <div className="flex gap-4 justify-center">
          <button
            className={`${Styles["forgot-password-button"]} ${buttonActive === "1" && Styles["forgot-password-button-active"]}`}
            onClick={(event) => {
              event.preventDefault();
              setButtonActive("1");
            }}
          >
            E-mail
          </button>
          <button
            className={`${Styles["forgot-password-button"]} ${buttonActive === "2" && Styles["forgot-password-button-active"]}`}
            onClick={(event) => {
              event.preventDefault();
              setButtonActive("2");
            }}
          >
            SMS
          </button>
        </div>
        <ResetPassworButton text="Enviar" />
      </form>
    </>
  );
};
