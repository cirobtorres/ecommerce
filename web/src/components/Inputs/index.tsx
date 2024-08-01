import Styles from "./Styles.module.css";

const NameInput = ({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="name"
        name="name"
        type="text"
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="name" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const EmailInput = ({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="email"
        name="email"
        type="text"
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="email" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const CPFInput = ({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="cpf"
        name="cpf"
        type="text"
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="cpf" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const BirthInput = ({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="birth-date"
        name="birth-date"
        type="text"
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="birth-date" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

const PhoneInput = ({
  text,
  placeholder,
}: {
  text: string;
  placeholder: string;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <input
        id="phone"
        name="phone"
        type="text"
        className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
        placeholder={placeholder}
      />
      <label htmlFor="phone" className={Styles["label-element"]}>
        {text}
      </label>
    </div>
  );
};

export { NameInput, EmailInput, CPFInput, BirthInput, PhoneInput };
