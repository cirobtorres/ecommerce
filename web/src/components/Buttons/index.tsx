"use client";

import { useFormStatus } from "react-dom";
import { FaApple, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle } from "../../lib/authentication/signInWithGoogle";
import { signInWithFacebook } from "../../lib/authentication/signInWithFacebook";
import { signInWithApple } from "../../lib/authentication/signInWithApple";
import { handleSignOut } from "../../lib/authentication/auth";
import Loader from "../Loader";
import Styles from "./Styles.module.css";
import { signInMagicLink } from "@/lib/authentication/signInMagicLink";

interface ButtonColoring {
  backgroundColor: string;
  pendingBackgroundColor: string;
}

interface ButtonNoColoring {
  backgroundColor?: never;
  pendingBackgroundColor?: never;
}

export function GenericButton({
  children,
  setState,
  options = {
    backgroundColor: "#1d4f91",
    pendingBackgroundColor: "#1c457a",
  },
}: {
  children: React.ReactNode;
  setState: (event: React.MouseEvent) => void;
  options?: ButtonColoring | ButtonNoColoring;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={setState}
      className={`${Styles["button-element"]} hover:brightness-110`}
      style={{
        background: pending
          ? options.pendingBackgroundColor
          : options.backgroundColor,
      }}
    >
      {children}
    </button>
  );
}

// ------------------------------------------------------------------------------------------
export function SignIn({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`
        ${Styles["button-element"]} 
        ${Styles["signin-button-color"]} 
        ${pending ? Styles["signin-button-color-pending"] : null}
      `}
    >
      {pending ? <Loader size={30} /> : text}
    </button>
  );
}

// ------------------------------------------------------------------------------------------
export function SignInMagicLink({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      formAction={signInMagicLink}
      className={`
        ${Styles["button-element"]} 
        ${Styles["signin-button-color"]} 
        ${pending ? Styles["signin-button-color-pending"] : null}
      `}
    >
      {pending ? <Loader size={30} /> : text}
    </button>
  );
}

// ------------------------------------------------------------------------------------------
export function SignUpButton({ text }: { text: string }) {
  const { pending: signUpPending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={signUpPending}
      className={`
        ${Styles["button-element"]} 
        ${Styles["signin-button-color"]} 
        ${signUpPending ? Styles["signin-button-color-pending"] : null}
      `}
    >
      {signUpPending ? <Loader size={30} /> : text}
    </button>
  );
}

// ------------------------------------------------------------------------------------------
export function GoogleSignIn() {
  const { pending } = useFormStatus();
  return (
    <div className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithGoogle}
        className={`
          ${Styles["button-element"]} 
          ${Styles["google-button-element"]}
        `}
      >
        {pending ? (
          <Loader size={30} />
        ) : (
          <>
            <FcGoogle className="text-2xl" /> Continuar com o Google
          </>
        )}
      </button>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
export function FacebookSignIn() {
  const { pending } = useFormStatus();
  return (
    <div className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithFacebook}
        className={`
          ${Styles["button-element"]} 
          ${Styles["facebook-button-element"]}
        `}
      >
        {pending ? (
          <Loader size={30} />
        ) : (
          <>
            <FaFacebook className="text-2xl text-[#1877f2]" /> Continuar com o
            Facebook
          </>
        )}
      </button>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
export function AppleSignIn() {
  const { pending } = useFormStatus();
  return (
    <form className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithApple}
        className={`
          ${Styles["button-element"]} 
          ${Styles["apple-button-element"]}
        `}
      >
        <FaApple className="text-2xl" /> Continuar com a Apple
      </button>
    </form>
  );
}

export function SignOut({ styles }: { styles?: string | undefined }) {
  return (
    <form className={styles}>
      <button formAction={handleSignOut}>Sair</button>
    </form>
  );
}
