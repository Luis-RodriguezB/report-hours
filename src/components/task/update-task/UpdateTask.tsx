import { Button } from "@/components/common/Button";
import { TaskFormFields } from "../TaskFormFields";
import { useUpdateTask } from "./useUpdateTask";

export const UpdateTask = () => {
  const { formState, register, handleSubmit, onSubmit, onCancel, onDelete } =
    useUpdateTask();

  return (
    <>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-stone-800">Editar tarea</h2>
        <p className="text-xs text-stone-400 mt-0.5">
          Modifica o elimina el registro seleccionado
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TaskFormFields register={register} errors={formState.errors} />

        <div className="flex gap-2 mt-6">
          <Button type="button" color="danger" variant="outlined" onClick={onDelete}>
            Eliminar
          </Button>
          <div className="flex gap-2 ml-auto">
            <Button type="button" color="secondary" variant="outlined" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" color="info">
              Guardar
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
