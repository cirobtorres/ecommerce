import { ReactNode, useRef } from "react";
import { IoClose } from "react-icons/io5";

export default function AddressChildrenModal({
  children,
  icon: Icon,
  modalTitle,
  closeModal,
}: {
  children: ReactNode;
  icon?: any;
  modalTitle: string;
  closeModal: (value: boolean) => void; // A useState close function
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) closeModal(false);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed top-0 right-0 bottom-0 left-0 bg-side-bar-transparent z-50"
    >
      <div
        ref={ref}
        className={`
          absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
          w-full max-w-[60rem] h-full max-h-[20rem] 
          flex flex-col items-center justify-center gap-2
          shadow-generic rounded p-4 text-center bg-white z-[51]
        `}
      >
        <button
          onClick={() => closeModal(false)}
          className="absolute top-4 right-4 text-3xl hover:text-theme-08"
        >
          <IoClose />
        </button>
        {Icon ? (
          <div className="flex items-center gap-3">
            <Icon size={40} fill="var(--theme-07)" />
            <h2>{modalTitle}</h2>
          </div>
        ) : (
          <h2>{modalTitle}</h2>
        )}
        {children}
      </div>
    </div>
  );
}
