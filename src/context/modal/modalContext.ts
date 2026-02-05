import { createContext } from "react";

type ModalContextType = {
  close: () => void;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
