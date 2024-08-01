import Styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={Styles["footer-main-container"]}>
      <div className={Styles["footer-links-container"]}></div>
      {/* <div className={Styles["info-footer"]}></div> */}
      <div className={Styles["footer-company-container"]}>
        <div className={Styles["footer-company-elements"]}>
          <p className={Styles["footer-info"]}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Asperiores
            id repellat quis alias velit iure quibusdam. Ipsa quibusdam voluptas
            sit ex, suscipit dolor nemo facere, aperiam aliquid quis fuga odio?
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
            perspiciatis voluptatum facere optio aliquid quidem exercitationem
            aut explicabo voluptates deleniti amet.
          </p>
        </div>
      </div>
    </footer>
  );
}
