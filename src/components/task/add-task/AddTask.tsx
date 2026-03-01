import { Button } from "@/components/common/Button";
import { TaskFormFields } from "../TaskFormFields";
import { useAddTask } from "./useAddTask";

export const AddTask = () => {
  const { formState, register, handleSubmit, onSubmit, onCancel } =
    useAddTask();

  return (
    <>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-stone-800">Nueva tarea</h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Completa los datos para registrar la tarea
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TaskFormFields register={register} errors={formState.errors} />

        <div className="flex gap-2 mt-6 justify-end">
          <Button type="button" color="secondary" variant="outlined" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" color="info">
            Agregar tarea
          </Button>
        </div>
      </form>
    </>
  );
};
