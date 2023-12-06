type CheckboxProps = {
  checked?: boolean;
  label: string;
}

export default function Checkbox({ label, checked }: CheckboxProps) {
  return (
    <div className="form-control">
      <label className="cursor-pointer label gap-2">
        <input type="checkbox" className="checkbox checkbox-info" />
        <span className="label-text">{label}</span>
      </label>
    </div>
  )
}