import {
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  addHours,
} from "date-fns";
import { DateKey, MonthKey } from "@/interfaces/DateTypes";
import { CalendarEntry } from "@/interfaces/CalendarEntry";

export const getMonthKey = (date: Date): MonthKey =>
  format(date, "yyyy-MM") as MonthKey;

export const getDateKey = (date: Date): DateKey =>
  format(date, "yyyy-MM-dd") as DateKey;

export const getMinMaxTime = (date: Date) => {
  const min = setMilliseconds(
    setSeconds(setMinutes(setHours(date, 7), 0), 0),
    0,
  );
  const max = setMilliseconds(
    setSeconds(setMinutes(setHours(date, 16), 0), 0),
    0,
  );
  return { min, max };
};

export const addWorkHoursSkippingLunch = (start: Date, hours: number): Date => {
  let end = new Date(start);

  for (let i = 0; i < hours; i++) {
    const nextHour = addHours(end, 1);

    if (nextHour.getHours() === 12) {
      end = setHours(nextHour, 13);
      end = setMinutes(end, 0);
    } else {
      end = nextHour;
    }
  }

  return end;
};

export const getNextStartTime = (
  eventsOfDay: CalendarEntry[],
  dayStart: Date,
): Date => {
  const WORK_START_HOUR = 7;

  if (!eventsOfDay.length) {
    // Primera tarea del día
    return setMinutes(setHours(dayStart, WORK_START_HOUR), 0);
  }

  // Toma el end de la última tarea
  const lastTask = eventsOfDay[eventsOfDay.length - 1];
  let nextStart = new Date(lastTask.end);

  // Si cae en hora de almuerzo, saltar a 13:00
  if (nextStart.getHours() === 12) {
    nextStart = setMinutes(setHours(nextStart, 13), 0);
  }

  return nextStart;
};
