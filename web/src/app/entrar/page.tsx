import SignInForm from "@/components/SignInForm";
import Styles from "./Styles.module.css";

export default function SignInPage() {
  return (
    <main className={Styles["main-container"]}>
      <SignInForm />
    </main>
  );
}
