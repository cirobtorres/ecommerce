import Styles from "./Styles.module.css";

const RadioInput = <T extends string>({
  id,
  name, // RadioInputs inside a same radio form requires same name to maintain single checking
  label,
  checked,
  value,
  setVal,
}: {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  value: T;
  setVal: (radioVal: T) => void;
}) => {
  return (
    <label htmlFor={id} className={Styles["radio-label-container"]}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className="hidden"
        defaultChecked={checked}
        onClick={() => setVal(value)}
      />
      <div className={Styles["radio-container"]}>
        <div className={Styles["radio-toggle-element"]} />
      </div>
      <p>{label}</p>
    </label>
  );
};

export default RadioInput;
