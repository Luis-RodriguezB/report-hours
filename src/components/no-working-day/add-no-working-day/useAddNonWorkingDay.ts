import { SubmitHandler, useForm } from "react-hook-form";
import { setHours, setMinutes } from "date-fns";

import { NonWorkingDay, NonWorkingDayType } from "@/interfaces/NonWorkingDay";
import { useCalendarSelectionStore } from "@/store/calendarSelectionStore";
import { useTimesheetStore } from "@/store/timesheetStore";
import { useModalContext } from "@/context/modal/useModalContext";
import { addWorkHoursSkippingLunch } from "@/utils/dateUtils";

interface IFormValues {
  title: string;
  typeOfNonWorkingDay: NonWorkingDayType;
}

export const useAddNonWorkingDay = () => {
  const { formState, register, handleSubmit } = useForm<IFormValues>();
  const parentModal = useModalContext();

  const start = useCalendarSelectionStore((state) => state.start);
  const addEvent = useTimesheetStore((state) => state.addEvent);
  const clearCalendarSelection = useCalendarSelectionStore(
    (state) => state.clearCalendarSelection,
  );

  const onSubmit: SubmitHandler<IFormValues> = (data) => {
    const newEvent: NonWorkingDay = {
      id: crypto.randomUUID(),
      title: data.title,
      start: setMinutes(setHours(start!, 7), 0),
      end: addWorkHoursSkippingLunch(start!, 8),
      type: data.typeOfNonWorkingDay,
      kind: "non-working",
      hours: 8,
      isDayOff: true,
    };

    addEvent(newEvent);
    clearCalendarSelection();

    parentModal?.close();
  };

  const onCancel = () => {
    clearCalendarSelection();
    parentModal?.close();
  };

  return {
    formState,
    onCancel,
    onSubmit,
    register,
    handleSubmit,
  };
};
