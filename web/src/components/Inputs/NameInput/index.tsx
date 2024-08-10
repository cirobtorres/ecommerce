import Styles from "../Styles.module.css";

const NameInput = ({
  id,
  value,
  setValue,
  text,
  placeholder,
  state,
}: {
  id: string;
  value: string;
  setValue: (value: string) => void;
  text: string;
  placeholder: string;
  state?: { blankError: boolean };
}) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={Styles["outter-container"]}>
      <div
        className={`${Styles["inner-container"]} ${state?.blankError && !value && Styles["inner-container-error"]}`}
      >
        <input
          id={id}
          name={id}
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
      {state?.blankError && !value && (
        <p className="text-xs px-2 mt-1 text-red-500">Campo obrigatório</p>
      )}
    </div>
  );
};

export default NameInput;
