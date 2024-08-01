"use client";

import {
  LoginFormActionButton,
  AppleLoginButton,
  FacebookLoginButton,
  GoogleLoginButton,
} from "../Buttons";
import Styles from "./LoginForm.module.css";
import { EmailInput } from "../Inputs";
import { PasswordInput } from "../Inputs/ClientInputs";
import { loginWithEmail } from "@/lib/authenticationActions";

export default function LoginForm() {
  return (
    <div className={Styles["outter-container"]}>
      <h1 className={Styles["heading-container"]}>Entrar</h1>
      <form className={Styles["form-container"]}>
        <EmailInput text="E-mail" placeholder="johndoe@email.com" />
        <PasswordInput text="Senha" placeholder="" />
        <LoginFormActionButton text="Login" formAction={loginWithEmail} />
        <div className={Styles["utils-container"]}>
          <button className={Styles["forgot-password-button"]}>
            Esqueci minha senha
          </button>
          <button className={Styles["sign-up-button"]}>Cadastrar</button>
          <div className={Styles["split-login-form"]}>
            <hr />
            <span>ou</span>
            <hr />
          </div>
        </div>
      </form>
      <div className={Styles["oauth-buttons-container"]}>
        <GoogleLoginButton />
        <FacebookLoginButton />
        <AppleLoginButton />
      </div>
    </div>
  );
}
