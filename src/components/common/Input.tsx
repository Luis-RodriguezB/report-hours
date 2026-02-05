import clsx from "clsx";
import { Ref } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

export const Input = ({
  id,
  ref,
  label,
  error,
  className,
  containerClassName,
  ...props
}: InputProps) => {
  const inputId = id ?? props.name;

  return (
    <div className={clsx("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full rounded-md border p-3 text-sm shadow-sm transition",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <div id={`${inputId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
