import { NonWorkingDayType } from "@/interfaces/NonWorkingDay";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { useAddNonWorkingDay } from "./useAddNonWorkingDay";

export const NON_WORKING_DAY_TYPE_OPTIONS = [
  { value: NonWorkingDayType.HOLIDAY, label: "Feriado" },
  { value: NonWorkingDayType.BIRTHDAY, label: "Cumpleaños" },
  { value: NonWorkingDayType.VACATION, label: "Vacaciones" },
];

export const AddNonWorkingDay = () => {
  const { formState, register, handleSubmit, onSubmit, onCancel } =
    useAddNonWorkingDay();

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Agregar día no laboral
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Nombre"
          containerClassName="mb-4"
          {...register("title", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
          })}
          error={formState.errors.title?.message}
        />

        <Select
          label="Tipo de día no laboral"
          options={NON_WORKING_DAY_TYPE_OPTIONS}
          containerClassName="mb-4"
          {...register("typeOfNonWorkingDay", {
            required: {
              value: true,
              message: "El tipo es requerido",
            },
          })}
          error={formState.errors.typeOfNonWorkingDay?.message}
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button type="submit" color="info">
            Agregar
          </Button>

          <Button type="button" color="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </form>
    </>
  );
};
