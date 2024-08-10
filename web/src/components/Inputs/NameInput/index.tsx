import Styles from "../Styles.module.css";

const NameInput = ({
  value,
  setValue,
  text,
  placeholder,
  state,
}: {
  value: string;
  setValue: (value: string) => void;
  state?: State;
  text: string;
  placeholder: string;
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`${Styles["inner-container"]} ${state?.errors?.nameBlankError && !value && Styles["inner-container-error"]}`}
      >
        <input
          id="name"
          name="name"
          type="text"
          value={value}
          onChange={handleOnChange}
          className={`${Styles["input-element"]} ${Styles["input-padding"]}`}
          placeholder={placeholder}
        />
        <label htmlFor="name" className={Styles["label-element"]}>
          {text}
        </label>
      </div>
      {state?.errors?.nameBlankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">Nome é obrigatório</p>
      )}
    </div>
  );
};

export default NameInput;
