import Styles from "../Styles.module.css";

const CNPJInput = ({
  value,
  setValue,
  text,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <div className={Styles["outter-container"]}>
      <div className={Styles["inner-container"]}>
        <input
          id="cnpj"
          name="cnpj"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="cnpj" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
    </div>
  );
};

export default CNPJInput;
