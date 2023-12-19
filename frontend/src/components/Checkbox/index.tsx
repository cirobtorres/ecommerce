type CheckboxProps = {
  checked?: boolean;
  label: string;
};

export default function Checkbox({ label, checked }: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2">
        <input
          type="checkbox"
          defaultChecked={checked}
          className="checkbox border-[var(--theme-02-light-gray)] bg-inherit [--chkbg:var(--theme-01-light-gray)] 
            [--chkfg:var(--theme-08-light-green)] checked:border-[var(--theme-02-light-gray)]"
        />
        <span className="label-text text-[var(--theme-03-medium-gray)]">
          {label}
        </span>
      </label>
    </div>
  );
}
