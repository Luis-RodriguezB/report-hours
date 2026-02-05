import { MonthData } from "@/interfaces/MonthData";

export const getMonthData = (month: string): MonthData | null => {
  const raw = localStorage.getItem("calendar-state");
  if (!raw) return null;

  const parsed = JSON.parse(raw);
  return parsed.state?.months?.[month] ?? null;
};
