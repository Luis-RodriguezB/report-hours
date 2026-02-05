import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CalendarEntry } from "@/interfaces/CalendarEntry";
import { getMonthKey, getDateKey } from "@/utils/dateUtils";
import { DateKey, MonthKey } from "@/interfaces/DateTypes";
import { Task } from "@/interfaces/Task";

type TimesheetStore = {
  currentDate: Date;
  months: Record<MonthKey, Record<DateKey, CalendarEntry[]>>;

  setCurrentDate: (date: Date) => void;
  removeEvent: (id: string, date: Date) => void;
  addEvent: (event: CalendarEntry) => void;
  updateEvent: (event: CalendarEntry) => void;

  getEventsByMonth: (date: Date) => CalendarEntry[];
  getEventsByDay: (date: Date) => CalendarEntry[];
  getTasksByMonth: (date: Date) => Task[];
};

export const useTimesheetStore = create<TimesheetStore>()(
  persist(
    (set, get) => ({
      currentDate: new Date(),
      months: {},

      setCurrentDate: (date) => set({ currentDate: date }),

      removeEvent: (id, date) =>
        set((state) => {
          const monthKey = getMonthKey(date);
          const dateKey = getDateKey(date);

          const month = state.months[monthKey];
          if (!month || !month[dateKey]) return state;

          return {
            months: {
              ...state.months,
              [monthKey]: {
                ...month,
                [dateKey]: month[dateKey].filter((t) => t.id !== id),
              },
            },
          };
        }),

      addEvent: (event: CalendarEntry) =>
        set((state) => {
          const monthKey = getMonthKey(event.start);
          const dateKey = getDateKey(event.start);

          const month = state.months[monthKey] ?? {};
          const dayEvents = month[dateKey] ?? [];

          return {
            months: {
              ...state.months,
              [monthKey]: {
                ...month,
                [dateKey]: [...dayEvents, event],
              },
            },
          };
        }),

      updateEvent: (event: CalendarEntry) =>
        set((state) => {
          const monthKey = getMonthKey(event.start);
          const dateKey = getDateKey(event.start);

          const month = state.months[monthKey];
          if (!month || !month[dateKey]) return state;

          return {
            months: {
              ...state.months,
              [monthKey]: {
                ...month,
                [dateKey]: month[dateKey].map((t) =>
                  t.id === event.id ? event : t,
                ),
              },
            },
          };
        }),

      getEventsByMonth: (date: Date) => {
        const monthKey = getMonthKey(date);
        const month = get().months[monthKey];
        if (!month) return [];

        return Object.values(month).flat();
      },

      getEventsByDay: (date: Date) => {
        const monthKey = getMonthKey(date);
        const month = get().months[monthKey];
        if (!month) return [];

        const dateKey = getDateKey(date);
        const dayEvents = month[dateKey] ?? [];

        return dayEvents;
      },

      getTasksByMonth: (date: Date) => {
        const monthKey = getMonthKey(date);
        const month = get().months[monthKey];

        console.log(month);
        if (!month) return [];

        return Object.values(month)
          .flat()
          .filter((t) => t.kind === "task");
      },
    }),
    {
      name: "timesheet-storage",
      partialize: (state) => ({
        months: state.months,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;

        Object.values(state.months).forEach((month) => {
          Object.values(month).forEach((tasks) => {
            tasks.forEach((task) => {
              task.start = new Date(task.start);
              task.end = new Date(task.end);
            });
          });
        });
      },
    },
  ),
);
