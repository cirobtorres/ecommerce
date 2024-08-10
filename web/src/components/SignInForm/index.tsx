"use client";

import Link from "next/link";
import { useState } from "react";
import { signInMagicLink, signInWithEmail } from "@/lib/authenticationActions";
import {
  SignIn,
  AppleSignIn,
  FacebookSignIn,
  GoogleSignIn,
  SignInMagicLink,
} from "../Buttons";
import EmailInput from "../Inputs/EmailInput";
import PasswordInput from "../Inputs/PasswordInput";
import Styles from "./Styles.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className={Styles["signin-outter-container"]}>
      <div className={Styles["signin-inner-container"]}>
        <div className={Styles["signin-heading-container"]}>
          <h1 className={Styles["signin-heading"]}>Entrar</h1>
        </div>
        <form className={Styles["signin-form-container"]}>
          <EmailInput
            value={email}
            setValue={setEmail}
            text="E-mail"
            placeholder="johndoe@email.com"
          />
          <PasswordInput
            value={pass}
            setValue={setPass}
            id="password"
            text="Senha"
            placeholder=""
          />
          <SignIn text="Login" formAction={signInWithEmail} />
          <SignInMagicLink
            text="Acesso único por e-mail"
            formAction={signInMagicLink}
          />
          <Link href="/" className={Styles["signin-forgot-password"]}>
            Esqueci minha senha
          </Link>
          <div className={Styles["signin-border-split"]}>
            <hr />
            <span>ou</span>
            <hr />
          </div>
        </form>
        <div className={Styles["signin-oauth-buttons-container"]}>
          <GoogleSignIn />
          <FacebookSignIn />
          {/* <AppleSignIn /> */}
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
