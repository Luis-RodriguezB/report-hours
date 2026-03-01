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
      <div className="mb-6">
        <h2 className="text-base font-semibold text-stone-800">Día no laboral</h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Marca este día como libre o feriado
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Nombre"
          containerClassName="mb-4"
          placeholder="Ej: Día de reyes"
          {...register("title", {
            required: {
              value: true,
              message: "El nombre es requerido",
            },
          })}
          error={formState.errors.title?.message}
        />

        <Select
          label="Tipo"
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

        <div className="flex gap-2 mt-6 justify-end">
          <Button type="button" color="secondary" variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" color="info">
            Marcar día
          </Button>
        </div>
      </form>
    </>
  );
};
