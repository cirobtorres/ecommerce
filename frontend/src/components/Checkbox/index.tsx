type CheckboxProps = {
  checked?: boolean;
  label: string;
}

export default function Checkbox({ label, checked }: CheckboxProps) {
	return (
		<div className="form-control">
			<label className="cursor-pointer label gap-2">
				<input
					type="checkbox"
					defaultChecked={checked}
					className="checkbox 
            border-[var(--theme-02-light-gray)] dark:border-[var(--theme-04-medium-gray)] 
            checked:border-[var(--theme-02-light-gray)] dark:checked:border-[var(--theme-04-medium-gray)]
            [--chkbg:var(--theme-01-light-gray)] dark:[--chkbg:theme(colors.slate.800)]
            [--chkfg:var(--theme-08-light-green)] dark:[--chkfg:var(--theme-08-light-green)]"
				/>
				<span className="label-text text-[var(--theme-03-medium-gray)]">{label}</span>
			</label>
		</div>
	);
}