import { useForm, SubmitHandler } from "react-hook-form";

import { Task } from "@/interfaces/Task";
import { useCalendarSelectionStore } from "@/store/calendarSelectionStore";
import { useTimesheetStore } from "@/store/timesheetStore";
import { addWorkHoursSkippingLunch, getNextStartTime } from "@/utils/dateUtils";
import { useModalContext } from "@/context/modal/useModalContext";
import { MySwal } from "@/components/common/MySwal";
import { MAX_HOURS_PER_DAY } from "@/const";
import { TaskFormValues } from "../TaskFormFields";

export const useAddTask = () => {
  const { formState, register, handleSubmit } = useForm<TaskFormValues>();
  const parentModal = useModalContext();

  const start = useCalendarSelectionStore((state) => state.start);
  const addEvent = useTimesheetStore((state) => state.addEvent);
  const clearCalendarSelection = useCalendarSelectionStore(
    (state) => state.clearCalendarSelection,
  );

  const getEventsByDay = useTimesheetStore((state) => state.getEventsByDay);

  const onSubmit: SubmitHandler<TaskFormValues> = (data) => {
    const hoursToAdd = Number(data.hours);

    const dayEvents = getEventsByDay(start!);
    const hoursUsed = dayEvents.reduce((acc, e) => acc + e.hours, 0);
    const newAmountHours = hoursUsed + hoursToAdd;
    const nextStart = getNextStartTime(dayEvents, start!);
    const end = addWorkHoursSkippingLunch(nextStart, hoursToAdd);

    if (newAmountHours > MAX_HOURS_PER_DAY) {
      return MySwal.fire({
        title: "Solo puedes agregar 8 horas por día",
        text: `Dispones de ${MAX_HOURS_PER_DAY - hoursUsed} horas`,
        icon: "warning",
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
    }

    const newEvent: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      start: nextStart,
      end: end!,
      hours: hoursToAdd,
      kind: "task",
    };

    addEvent(newEvent);
    clearCalendarSelection();

    parentModal.close();
  };

  const onCancel = () => {
    clearCalendarSelection();
    parentModal.close();
  };

  return {
    formState,
    onCancel,
    onSubmit,
    register,
    handleSubmit,
  };
};
