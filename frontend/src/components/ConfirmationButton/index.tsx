type ConfirmationButtonProps = {
  padding?: string;
  width?: string;
  lightText?: string;
  lightTheme?: string;
  text: string;
  onClick: (variable: any) => void;
};

export default function ConfirmationButton({
  padding = "p-4",
  width = "w-80",
  lightText = "text-theme-01",
  lightTheme = "bg-theme-07",
  text,
  onClick,
}: ConfirmationButtonProps) {
  return (
    <button
      className={`
				${padding} ${width} ${lightText} ${lightTheme} 
				rounded hover:shadow-bright
			`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
