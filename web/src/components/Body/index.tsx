import Header, { AuthHeader } from "../Header/index";
import Footer from "../Footer";
import { MegaMenuContextProvider } from "../../contexts/MegaMenuContext";
import { RefrigelUser } from "@/types/user-types";
import { ProductsMenuContextProvider } from "../../contexts/ProductsMenuContext";
import Styles from "./Styles.module.css";

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
        <ProductsMenuContextProvider>
          <Header user={user} />
          {children}
          <Footer />
        </ProductsMenuContextProvider>
      </MegaMenuContextProvider>
    </div>
  );
}

export function AuthBody({ children }: { children: React.ReactNode }) {
  // To be used for SignIn (entrar) and SignUp (cadastrar) pages
  return (
    <div className={Styles["body-main-container"]}>
      <MegaMenuContextProvider>
        <ProductsMenuContextProvider>
          <AuthHeader />
          {children}
          <Footer />
        </ProductsMenuContextProvider>
      </MegaMenuContextProvider>
    </div>
  );
}
