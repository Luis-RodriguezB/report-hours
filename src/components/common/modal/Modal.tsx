import { useEffect } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";

import { ModalContext } from "@/context/modal/modalContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal = ({ isOpen, onClose, children }: Props) => {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "auto";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center px-4",
        "bg-stone-950/40 backdrop-blur-[2px]",
        "animate-[fadeIn_0.15s_ease]",
      )}
      onClick={onClose}
    >
      <div
        className={clsx(
          "relative w-full max-w-md",
          "rounded-2xl bg-white shadow-2xl shadow-stone-900/10",
          "border border-stone-100",
          "p-7",
          "animate-[slideUp_0.2s_ease]",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContext.Provider value={{ close: onClose }}>
          {children}
        </ModalContext.Provider>

        <button
          onClick={onClose}
          className={clsx(
            "w-7 h-7 flex items-center justify-center",
            "absolute right-4 top-4",
            "text-stone-400 hover:text-stone-600",
            "rounded-full hover:bg-stone-100 transition-colors duration-150",
            "text-base leading-none",
          )}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body,
  );
};
