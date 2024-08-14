import { AuthBody } from "../../components/Body";
import Styles from "./Styles.module.css";

export default async function EmailConfirmPage() {
  return (
    <AuthBody>
      <main className={Styles["main-container"]}>EmailConfirmPage</main>
    </AuthBody>
  );
}
