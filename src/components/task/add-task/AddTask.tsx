import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { useAddTask } from "./useAddTask";

export const AddTask = () => {
  const { formState, register, handleSubmit, onSubmit, onCancel } =
    useAddTask();

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Agregar tarea</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Nombre de la tarea"
          containerClassName="mb-4"
          {...register("title", {
            required: {
              value: true,
              message: "El nombre de la tarea es requerido",
            },
          })}
          error={formState.errors.title?.message}
        />

        <Input
          type="number"
          label="Horas"
          max={8}
          min={0.5}
          step={0.5}
          containerClassName="mb-4"
          {...register("hours", {
            required: {
              value: true,
              message: "El número de horas es requerido",
            },
            min: {
              value: 0.5,
              message: "El número de horas debe ser mayor a 0",
            },
            max: {
              value: 8,
              message: "El número de horas debe ser menor o igual a 8",
            },
          })}
          error={formState.errors.hours?.message}
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
