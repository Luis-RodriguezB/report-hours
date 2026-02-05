import ReactDOM from "react-dom";
import { useImperativeHandle } from "react";
import clsx from "clsx";

import { useModal } from "./useModal";
import { ModalContext } from "@/context/modal/modalContext";

export type ModalRef = {
  open: () => void;
  close: () => void;
} | null;

type Props = {
  ref?: React.Ref<ModalRef>;
  children: React.ReactNode;
};

export const Modal = ({ ref, children }: Props) => {
  const { isOpen, open, close } = useModal();

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-black/50 backdrop-blur-sm"
      )}
    >
      <div
        className={clsx(
          "relative w-full max-w-lg",
          "rounded-[12px] bg-white text-gray-900 p-9 shadow-xl",
          "animate-[fadeIn_0.2s_ease]"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalContext.Provider value={{ close }}>
          {children}
        </ModalContext.Provider>

        <button
          onClick={close}
          className={clsx(
            "w-[32px] h-[32px] flex items-center justify-center",
            "absolute right-[8px] top-[8px]",
            "text-gray-900 font-extrabold",
            "rounded-full p-1",
            "hover:bg-gray-100 transition"
          )}
          aria-label="Cerrar modal"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};
