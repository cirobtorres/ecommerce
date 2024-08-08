import SignUpForm from "@/components/SingUpForm";
import Styles from "./Styles.module.css";
import { AuthBody } from "@/components/Body";

export default async function RegisterPage() {
  return (
    <AuthBody>
      <main className={Styles["main-container"]}>
        <SignUpForm />
      </main>
    </AuthBody>
  );
}
