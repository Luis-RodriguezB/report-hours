import { UseFormRegister, FieldErrors } from "react-hook-form";

import { Input } from "@/components/common/Input";
import { MAX_HOURS_PER_DAY } from "@/const";

export interface TaskFormValues {
  title: string;
  hours: number;
}

interface Props {
  register: UseFormRegister<TaskFormValues>;
  errors: FieldErrors<TaskFormValues>;
}

export const TaskFormFields = ({ register, errors }: Props) => (
  <>
    <Input
      type="text"
      label="Nombre de la tarea"
      containerClassName="mb-4"
      {...register("title", {
        required: { value: true, message: "El nombre de la tarea es requerido" },
      })}
      error={errors.title?.message}
    />

    <Input
      type="number"
      label="Horas"
      max={MAX_HOURS_PER_DAY}
      min={0.5}
      step={0.5}
      containerClassName="mb-4"
      {...register("hours", {
        required: { value: true, message: "El número de horas es requerido" },
        min: { value: 0.5, message: "El número de horas debe ser mayor a 0" },
        max: {
          value: MAX_HOURS_PER_DAY,
          message: `El número de horas debe ser menor o igual a ${MAX_HOURS_PER_DAY}`,
        },
      })}
      error={errors.hours?.message}
    />
  </>
);
