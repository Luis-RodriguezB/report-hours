import { create } from "zustand";

import { CalendarEntry } from "@/interfaces/CalendarEntry";

type CalendarSelection = {
  start: Date | null;
  end: Date | null;
  selectedEvent: CalendarEntry | null;
  clearCalendarSelection: () => void;
  setCalendarSelection: (start: Date, end: Date) => void;
  setSelectedEvent: (event: CalendarEntry | null) => void;
};

export const useCalendarSelectionStore = create<CalendarSelection>((set) => ({
  start: null,
  end: null,
  selectedEvent: null,
  setCalendarSelection: (start, end) => set({ start, end }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  clearCalendarSelection: () =>
    set({ start: null, end: null, selectedEvent: null }),
}));
