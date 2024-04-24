import { cepMask } from "@/utils/inputMasks";

interface InputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  bgColor?: string;
  flexSize?: string;
  placeholder?: string;
  setValue: (value: string) => void;
  onBlur: (value: any) => void;
}

export default function InputCEP({
  id,
  name,
  label,
  value,
  bgColor = "bg-theme-01",
  flexSize,
  placeholder = "",
  setValue,
  onBlur,
}: InputProps) {
  const handleOnChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleOnBlur = (event: any) => {
    if (event.target.value.length === 9) {
      const correiosURL = `https://viacep.com.br/ws/${value.replace(
        "-",
        ""
      )}/json/`;
      fetch(correiosURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => onBlur(data))
        .catch((error) => {});
    }
  };

  const handleOnFocus = () => {};

  const handleOnKeyUp = (event: any) => {
    cepMask(event);
  };

  return (
    <div className={`flex h-full w-full flex-col ${flexSize}`}>
      <div className={"relative"}>
        <input
          type="text"
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          onChange={handleOnChange}
          onKeyUp={handleOnKeyUp}
          className={`
          peer w-full rounded border ${bgColor} p-3 text-theme-04 
          outline-none focus:ring-0 focus:placeholder:text-theme-08 
          placeholder:text-transparent active:placeholder:text-theme-08
          border-theme-02 focus:border-theme-08
        `}
        />
        <Label id={`${id}_label`} label={label} bgColor={bgColor} />
      </div>
    </div>
  );
}

const Label = ({
  id,
  label,
  bgColor,
}: {
  id: string;
  label: string;
  bgColor?: string;
}) => {
  return (
    <label
      htmlFor={id}
      className={`
        absolute start-2 top-2 z-10 origin-[0] -translate-y-[1.1rem] scale-75 transform 
        pointer-events-none px-2 text-base duration-300 
        peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 
        peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-[1.1rem] 
        peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 
        text-theme-03 ${bgColor} dark:bg-slate-800 peer-focus:text-theme-08
    `}
    >
      {label}
    </label>
  );
};
