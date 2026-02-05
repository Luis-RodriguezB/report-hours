import { useContext } from "react";
import { ModalContext } from "./modalContext";

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context)
    throw new Error("useModalContext debe usarse dentro de un Modal");

  return context;
};
