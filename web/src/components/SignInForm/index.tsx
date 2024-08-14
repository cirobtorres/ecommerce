"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { signInWithEmail } from "../../lib/authentication/signInWithEmail";
import { GenerateNewConfirmationLink } from "../../lib/authentication/auth";
import {
  SignIn,
  FacebookSignIn,
  GoogleSignIn,
  SignInMagicLink,
  GenericButton,
} from "../Buttons";
import { IoIosClose } from "react-icons/io";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import FlashMessage from "../FlashMessage";
import Styles from "./Styles.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction] = useFormState<State, FormData>(signInWithEmail, {
    errors: null,
  });

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
                    GenerateNewConfirmationLink({ email, password });
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
        <SignInWithMagicLinkWindow />
        <Link href="/" className={Styles["signin-forgot-password"]}>
          Esqueci minha senha
        </Link>
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

  // useEffect(() => {
  //   if (magicLinkWindow) {
  //     document.body.style.position = "fixed";
  //   } else {
  //     document.body.style.position = "";
  //   }
  // }, [magicLinkWindow]);

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
        <div
          className={Styles["magic-link-main-container"]}
          style={{ display: magicLinkWindow ? "block" : "none" }}
          onClick={handleMagicLinkClose}
        >
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
        </div>
      </>
    </>
  );
};
