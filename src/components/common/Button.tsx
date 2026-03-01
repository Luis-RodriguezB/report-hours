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
  "inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed";

const variantStyles: Record<
  Exclude<ButtonVariant, never>,
  Record<Exclude<ButtonColor, "none">, string>
> = {
  contained: {
    success: "bg-emerald-700 text-white hover:bg-emerald-800",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    info: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500",
    secondary: "bg-stone-500 text-white hover:bg-stone-600 focus-visible:ring-stone-400",
  },
  outlined: {
    success:
      "border border-emerald-600 text-emerald-700 hover:bg-emerald-700 hover:text-white",
    warning:
      "border border-amber-400 text-amber-700 hover:bg-amber-500 hover:text-white",
    info: "border border-indigo-400 text-indigo-600 hover:bg-indigo-600 hover:text-white focus-visible:ring-indigo-400",
    danger:
      "border border-rose-400 text-rose-600 hover:bg-rose-600 hover:text-white focus-visible:ring-rose-400",
    secondary:
      "border border-stone-300 text-stone-600 hover:bg-stone-500 hover:text-white focus-visible:ring-stone-400",
  },
  text: {
    success: "text-emerald-700 hover:bg-emerald-50",
    warning: "text-amber-700 hover:bg-amber-50",
    info: "text-indigo-600 hover:bg-indigo-50",
    danger: "text-rose-600 hover:bg-rose-50",
    secondary: "text-stone-600 hover:bg-stone-100",
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
        !isNone && variantStyles[resolvedVariant][resolvedColor],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
