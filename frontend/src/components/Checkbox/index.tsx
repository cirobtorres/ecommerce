type CheckboxProps = {
  label: string;
  checked?: boolean;
};

export default function Checkbox({ label, checked }: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer gap-2">
        <input
          type="checkbox"
          defaultChecked={checked}
          className="border-[var(--theme-02)] bg-inherit [--chkbg:var(--theme-01)] 
            [--chkfg:var(--theme-08)] checked:border-[var(--theme-02)]"
        />
        <span className="text-[var(--theme-03)]">
          {label}
        </span>
      </label>
    </div>
  );
}
