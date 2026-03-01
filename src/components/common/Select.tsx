import clsx from "clsx";
import { Ref } from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  containerClassName?: string;
  ref?: Ref<HTMLSelectElement>;
}

export function Select({
  id,
  ref,
  label,
  error,
  options,
  placeholder,
  className,
  containerClassName,
  ...props
}: SelectProps) {
  const selectId = id ?? props.name;

  return (
    <div className={clsx("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-stone-600"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={clsx(
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-stone-800 shadow-sm transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          error
            ? "border-rose-400 focus:ring-rose-300 focus:border-rose-400"
            : "border-stone-200 focus:ring-indigo-400/50 focus:border-indigo-400",
          className
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={`${selectId}-error`} className="mt-1.5 text-xs text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
}
