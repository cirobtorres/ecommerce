export default function ConfirmationButton({
  icon: Icon,
  toHide,
  to,
  textTo,
  confirmClick,
}: {
  icon: any;
  toHide: string;
  to: string;
  textTo: string;
  confirmClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={confirmClick}
      className="flex flex-col items-center p-3 w-44 h-30 rounded border-2 border-theme-02 hover:text-theme-08 hover:border-theme-08 transition-all duration-300 group"
    >
      <Icon size={20} />
      <h3 className="text-base group-hover:text-theme-08 transition-all duration-300">
        {to}
      </h3>
      <p className="text-xs text-theme-03">
        {textTo}
        <br />
        <b>{toHide}</b>
      </p>
    </button>
  );
}
