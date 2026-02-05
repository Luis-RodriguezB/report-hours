import { createContext } from "react";

export type ButtonVariant = "text" | "contained" | "outlined";
export type ButtonColor =
  | "success"
  | "warning"
  | "info"
  | "danger"
  | "gray"
  | "none";

interface ButtonGroupContextValue {
  variant?: ButtonVariant;
  color?: ButtonColor;
}

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null
);
