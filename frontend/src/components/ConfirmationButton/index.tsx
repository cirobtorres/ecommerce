type ConfirmationButtonProps = {
  padding?: string;
  width?: string;
  lightText?: string;
  darkText?: string;
  lightTheme?: string;
  darkTheme?: string;
  text: string;
  onClick: (variable: any) => void;
}

export default function ConfirmationButton({
  padding = 'p-4',
  width = 'w-80',
  lightText = 'text-theme-05-dark-gray',
  darkText = 'text-theme-01-light-gray',
  lightTheme = 'bg-theme-07-dark-blue', 
  darkTheme = 'bg-theme-07-dark-blue', 
  text, 
  onClick 
}: ConfirmationButtonProps) {
  return (
    <button
      className={`
        ${padding} ${width}
        ${lightText} dark:${darkText}
        ${lightTheme} dark:${darkTheme}
        rounded hover:shadow-bright
      `}
      onClick={onClick}>
        {text}
    </button>
  )
}