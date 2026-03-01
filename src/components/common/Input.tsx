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
          className="mb-1.5 block text-sm font-medium text-stone-600"
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        className={clsx(
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-stone-800 shadow-sm transition-all duration-150",
          "placeholder:text-stone-300",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          error
            ? "border-rose-400 focus:ring-rose-300 focus:border-rose-400"
            : "border-stone-200 focus:ring-indigo-400/50 focus:border-indigo-400",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />

      {error && (
        <div id={`${inputId}-error`} className="mt-1.5 text-xs text-rose-600">
          {error}
        </div>
      )}
    </div>
  );
};
