"use client";

import { useEffect, useState } from "react";
import { AuthBody } from "@/components/Body";
import { handlePasswordUpdate } from "@/lib/authentication/auth";
import { useFormState } from "react-dom";
import { EmailOtpType } from "@supabase/supabase-js";
import { ResetPassworButton } from "@/components/Buttons";
import PasswordRules from "@/components/Inputs/PasswordRules";
import {
  redirect,
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import EmailInput from "../../components/Inputs/EmailInput";
import DisableInput from "../../components/Inputs/DisableInput";

type TokenProps = {
  access_token: string;
  expires_at: string;
  expires_in: string;
  refresh_token: string;
  token_type: EmailOtpType;
  type: EmailOtpType;
};

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const [state, passwordChangeAction] = useFormState<State, FormData>(
    handlePasswordUpdate,
    { errors: null }
  );
  const [email, setEmail] = useState(searchParams.get("email") as string);

  return (
    <AuthBody>
      <main className="px-5 max-w-md my-12 mx-auto">
        <h1 className="text-3xl font-extrabold text-refrigel-blue-primary mb-4">
          Nova senha
        </h1>
        <form action={passwordChangeAction} className="flex flex-col gap-1">
          <EmailInput
            id="email-reset-pass"
            value={email}
            setValue={setEmail}
            placeholder=""
            disable
            text="E-mail"
          />
          <PasswordRules state={state} />
          <div className="mt-4">
            <ResetPassworButton text="Confirmar" />
          </div>
        </form>
      </main>
    </AuthBody>
  );
}
