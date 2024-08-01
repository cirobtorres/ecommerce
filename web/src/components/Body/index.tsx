import Header from "../Header/index";
import Footer from "../Footer";
import Styles from "./Styles.module.css";

export default function Body({ children }: { children: React.ReactNode }) {
  return (
    <div className={Styles["body-main-container"]}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
