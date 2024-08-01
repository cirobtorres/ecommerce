import SignUpForm from "@/components/SingUpForm";
import Styles from "./Styles.module.css";

export default function RegisterPage() {
  return (
    <main className={Styles["main-container"]}>
      <SignUpForm />
    </main>
  );
}
