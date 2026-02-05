import React from "react";
import clsx from "clsx";

import { useButtonGroup } from "@/context/button-group/useButtonGroup";

type ButtonVariant = "text" | "contained" | "outlined";
type ButtonColor =
  | "success"
  | "secondary"
  | "warning"
  | "info"
  | "danger"
  | "none";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<
  Exclude<ButtonVariant, never>,
  Record<Exclude<ButtonColor, "none">, string>
> = {
  contained: {
    success: "bg-green-600 text-white hover:bg-green-700",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
    info: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
  },
  outlined: {
    success:
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
    warning:
      "border border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white",
    info: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    danger:
      "border border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
    secondary:
      "border border-gray-400 text-gray-600 hover:bg-gray-500 hover:text-white",
  },
  text: {
    success: "text-green-600 hover:bg-green-50",
    warning: "text-yellow-600 hover:bg-yellow-50",
    info: "text-blue-600 hover:bg-blue-50",
    danger: "text-red-600 hover:bg-red-50",
    secondary: "text-gray-600 hover:bg-gray-100",
  },
};

export const Button = ({
  variant,
  color,
  className,
  children,
  ...props
}: ButtonProps) => {
  const group = useButtonGroup();

  const resolvedVariant = variant ?? group?.variant ?? "contained";
  const resolvedColor = (color ?? group?.color ?? "info") as ButtonColor;

  const isNone = resolvedColor === "none";

  return (
    <button
      className={clsx(
        !isNone && baseStyles,
        !isNone && "rounded-md",
        !isNone && variantStyles[resolvedVariant][resolvedColor],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
