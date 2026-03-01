import { useCallback, useState } from "react";
import {
  View,
  Views,
  Messages,
  dateFnsLocalizer,
  SlotPropGetter,
  Formats,
} from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
import { useShallow } from "zustand/shallow";
import { es } from "date-fns/locale";

import { MySwal } from "@/components/common/MySwal";
import { useTimesheetStore } from "@/store/timesheetStore";
import { useCalendarSelectionStore } from "@/store/calendarSelectionStore";
import { useModalStore } from "@/store/modalStore";
import { CalendarEntry } from "@/interfaces/CalendarEntry";
import { MAX_HOURS_PER_DAY } from "@/const";

const ALL_VIEWS = [Views.MONTH, Views.WEEK];

const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const formats: Formats = {
  weekdayFormat: (date: Date) => {
    const day = format(date, "EEEE", { locale: es });
    return day.charAt(0).toUpperCase() + day.slice(1);
  },
  dayFormat: (date: Date) => {
    const day = format(date, "EEEE", { locale: es });
    return day.charAt(0).toUpperCase() + day.slice(1) + " " + date.getDate();
  },
};

const messages: Messages = {
  today: "Hoy",
  previous: "Anterior",
  next: "Siguiente",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
};

const slotPropGetter: SlotPropGetter = (date) => {
  const day = date.getDay(); // 0 = domingo, 6 = sábado
  const hour = date.getHours();

  const isWeekend = day === 0 || day === 6;
  const isLunch = hour === 12;

  if (isWeekend || isLunch) {
    return {
      style: {
        backgroundColor: "#ede8e0",
        pointerEvents: "none",
        opacity: 0.8,
      },
    };
  }

  return {};
};

export const useTimesheetCalendar = () => {
  const [view, setView] = useState<View>(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  const openModal = useModalStore((state) => state.openModal);

  const events = useTimesheetStore(
    useShallow((state) =>
      Object.values(state.months).flatMap((month) => Object.values(month).flat()),
    ),
  );

  const setCalendarSelection = useCalendarSelectionStore(
    (state) => state.setCalendarSelection,
  );
  const setSelectedEvent = useCalendarSelectionStore(
    (state) => state.setSelectedEvent,
  );

  const handleSelectSlot = async ({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }) => {
    const day = start.getDay();
    const hour = start.getHours();

    if (day === 0 || day === 6 || hour === 12) return;

    const hoursAvailable =
      MAX_HOURS_PER_DAY -
      events
        .filter((e) => isSameDay(e.start, start))
        .reduce((acc, e) => acc + e.hours, 0);

    if (hoursAvailable <= 0) {
      return MySwal.fire({
        title: "No se pueden agregar más horas",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: false,
        confirmButtonText: "Aceptar",
      });
    }

    setCalendarSelection(start, end);

    const result = await MySwal.fire({
      title: "¿Qué deseas agregar?",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Agregar tarea",
      cancelButtonText: "Marcar día libre",
    });

    if (result.isConfirmed) {
      openModal("addTask");
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      openModal("addNonWorkingDay");
    }
  };

  const handleClickEvent = async (event: CalendarEntry) => {
    setSelectedEvent(event);
    openModal("updateTask");
  };

  const onNavigate = useCallback(
    (newDate: Date) => setCurrentDate(newDate),
    [setCurrentDate],
  );

  return {
    view,
    events,
    formats,
    messages,
    localizer,
    ALL_VIEWS,
    currentDate,
    setView,
    onNavigate,
    slotPropGetter,
    handleClickEvent,
    handleSelectSlot,
  };
};
