import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useCalendarSelectionStore } from "@/store/calendarSelectionStore";
import { useTimesheetStore } from "@/store/timesheetStore";
import { useModalContext } from "@/context/modal/useModalContext";
import { MySwal } from "@/components/common/MySwal";
import { MAX_HOURS_PER_DAY } from "@/const";

interface IFormValues {
  title: string;
  date: Date;
  hours: number;
}

export const useUpdateTask = () => {
  const { formState, register, handleSubmit, reset } = useForm<IFormValues>();
  const parentModal = useModalContext();

  const updateEvent = useTimesheetStore((state) => state.updateEvent);
  const removeEvent = useTimesheetStore((state) => state.removeEvent);
  const getEventsByDay = useTimesheetStore((state) => state.getEventsByDay);

  const selectedEvent = useCalendarSelectionStore(
    (state) => state.selectedEvent
  );
  const clearCalendarSelection = useCalendarSelectionStore(
    (state) => state.clearCalendarSelection
  );

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    if (!selectedEvent) return;

    const dayEvents = getEventsByDay(selectedEvent.start);
    const hoursUsed = dayEvents
      .filter((e) => e.id !== selectedEvent.id)
      .reduce((acc, e) => acc + e.hours, 0);
    const newAmountHours = hoursUsed + Number(data.hours);
    const hoursAvailable = MAX_HOURS_PER_DAY - hoursUsed;

    const message =
      hoursAvailable === 0
        ? "Ya no tienes horas disponibles"
        : `Solo puedes agregar ${hoursAvailable} horas`;

    if (newAmountHours > MAX_HOURS_PER_DAY) {
      return MySwal.fire({
        title: "Haz superado el límite de horas disponibles",
        text: message,
        icon: "warning",
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
    }

    updateEvent({
      ...selectedEvent,
      title: data.title,
      hours: Number(data.hours),
    });

    clearCalendarSelection();
    parentModal.close();
  };

  const onDelete = async () => {
    if (!selectedEvent) return;

    const result = await MySwal.fire({
      title: "¿Desea eliminar el evento?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      removeEvent(selectedEvent.id, selectedEvent.start);
      clearCalendarSelection();
      parentModal.close();
    }
  };

  const onCancel = () => {
    clearCalendarSelection();
    parentModal.close();
  };

  useEffect(() => {
    if (selectedEvent) {
      reset({
        title: selectedEvent.title,
        hours: selectedEvent.hours,
      });
    }
  }, [selectedEvent, reset]);

  return {
    formState,
    onDelete,
    onCancel,
    onSubmit,
    register,
    handleSubmit,
  };
};
