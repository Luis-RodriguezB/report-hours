import React from "react";
import clsx from "clsx";

import {
  ButtonGroupContext,
  ButtonVariant,
  ButtonColor,
} from "@/context/button-group/buttonGroup";

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
};

export const ButtonGroup = ({
  children,
  variant = "contained",
  color = "info",
  className,
}: Props) => {
  return (
    <ButtonGroupContext.Provider value={{ variant, color }}>
      <div
        className={clsx(
          "inline-flex [&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none",
          className
        )}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
};
