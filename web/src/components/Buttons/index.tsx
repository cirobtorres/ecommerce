"use client";

import { useFormStatus } from "react-dom";
import { FaApple, FaFacebook, FaFacebookF, FaGoogle } from "react-icons/fa";
import { SquareLoader } from "../Loaders/SquareLoader";
import {
  signInWithApple,
  signInWithFacebook,
  signInWithGoogle,
} from "@/lib/authenticationActions";
import { FcGoogle } from "react-icons/fc";
import Styles from "./Styles.module.css";

export function SignIn({
  text,
  formAction,
}: {
  text: string;
  formAction: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      formAction={formAction}
      className={`${Styles["button-element"]} ${Styles["signin-button-color"]}`}
    >
      {pending ? <SquareLoader /> : text}
    </button>
  );
}

export function SignInMagicLink({
  text,
  formAction,
}: {
  text: string;
  formAction: (formData: FormData) => void;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      formAction={formAction}
      className={`${Styles["button-element"]} ${Styles["magiclink-button-color"]}`}
    >
      {pending ? <SquareLoader /> : text}
    </button>
  );
}

export function SignUp({
  text,
  formAction,
}: {
  text: string;
  formAction: (formData: FormData) => void;
}) {
  const { pending: signUpPending } = useFormStatus();
  return (
    <button
      disabled={signUpPending}
      formAction={formAction}
      className={`${Styles["button-element"]} ${Styles["signin-button-color"]} ${signUpPending ? Styles["signin-button-color-pending"] : null}`}
    >
      {signUpPending ? <SquareLoader /> : text}
    </button>
  );
}

export function GoogleSignIn() {
  const { pending } = useFormStatus();
  return (
    <form className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithGoogle}
        className={`${Styles["button-element"]} ${Styles["google-button-element"]}`}
      >
        {/* <FaGoogle /> Google */}
        <FcGoogle className="text-2xl" /> Continuar com o Google
      </button>
    </form>
  );
}
export function FacebookSignIn() {
  const { pending } = useFormStatus();
  return (
    <form className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithFacebook}
        className={`${Styles["button-element"]} ${Styles["facebook-button-element"]}`}
      >
        <FaFacebook className="text-2xl text-[#1877f2]" /> Continuar com o
        Facebook
      </button>
    </form>
  );
}
export function AppleSignIn() {
  const { pending } = useFormStatus();
  return (
    <form className={Styles["form-container"]}>
      <button
        disabled={pending}
        formAction={signInWithApple}
        className={`${Styles["button-element"]} ${Styles["apple-button-element"]}`}
      >
        <FaApple className="text-2xl" /> Continuar com a Apple
      </button>
    </form>
  );
}

export function LogoutButton({ formAction }: { formAction: () => void }) {
  return (
    <form>
      <button formAction={formAction}>Sair</button>
    </form>
  );
}
