import Styles from "../Styles.module.css";

const LoginInput = ({
  id,
  text,
  placeholder,
  state,
}: {
  id: string;
  text: string;
  placeholder: string;
  state?: State;
}) => {
  return (
    <div className={Styles["outter-container"]}>
      <div className={Styles["inner-container"]}>
        <input
          id={id}
          name={id}
          type="text"
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor={id} className={Styles["label-element"]}>
          {text}
        </label>
      </div>
    </div>
  );
};

export default LoginInput;
