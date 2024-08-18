"use client";

import { AuthBody } from "@/components/Body";
import { handlePasswordChange } from "@/lib/authentication/auth";
import PasswordRules from "@/components/Inputs/PasswordRules";
import { useFormState } from "react-dom";
import Styles from "./Styles.module.css";
import { ResetPassworButton } from "@/components/Buttons";

export default function ResetPasswordPage() {
  const [state, passwordChangeAction] = useFormState<State, FormData>(
    handlePasswordChange,
    { errors: null }
  );
  return (
    <AuthBody>
      <main className={Styles["reset-password-main-container"]}>
        <div>
          <h1 className={Styles["reset-password-heading"]}>Resetar senha</h1>
        </div>
        <form
          action={passwordChangeAction}
          className={Styles["reset-password-form"]}
        >
          <PasswordRules state={state} />
          <div className={Styles["reset-password-button-container"]}>
            <ResetPassworButton text="Confirmar" />
          </div>
        </form>
      </main>
    </AuthBody>
  );
}
