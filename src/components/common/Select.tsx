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
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        ref={ref}
        id={selectId}
        className={clsx(
          "w-full rounded-md border bg-white p-3 text-sm shadow-sm transition",
          "focus:outline-none focus:ring-2",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500",
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
        <p id={`${selectId}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
