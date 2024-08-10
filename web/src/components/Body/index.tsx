import Header, { AuthHeader } from "../Header/index";
import Footer from "../Footer";
import Styles from "./Styles.module.css";
import { User } from "@supabase/supabase-js";
import { MegaMenuContextProvider } from "../../contexts/MegaMenuContext";
import MegaMenu from "../Header/MegaMenu";
import ProductSection from "../Header/ProductSection";
import { RefrigelUser } from "@/types/user-types";

export default function Body({
  children,
  user,
}: {
  children: React.ReactNode;
  user: RefrigelUser | null;
}) {
  return (
    <div className={Styles["body-main-container"]}>
      <MegaMenuContextProvider>
        <Header user={user} />
        {children}
        <Footer />
      </MegaMenuContextProvider>
    </div>
  );
}

export function AuthBody({ children }: { children: React.ReactNode }) {
  // To be used for SignIn (entrar) and SignUp (cadastrar) pages
  return (
    <div className={Styles["body-main-container"]}>
      <MegaMenuContextProvider>
        <AuthHeader />
        {children}
        <Footer />
      </MegaMenuContextProvider>
    </div>
  );
}
