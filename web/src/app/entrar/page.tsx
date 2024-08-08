import SignInForm from "@/components/SignInForm";
import Styles from "./Styles.module.css";
import { AuthBody } from "@/components/Body";

export default async function SignInPage() {
  return (
    <AuthBody>
      <main className={Styles["main-container"]}>
        <SignInForm />
      </main>
    </AuthBody>
  );
}
