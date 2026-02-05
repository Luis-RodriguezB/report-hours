import { ExcelRow } from "@/interfaces/ExcelRow";
import { Task } from "@/interfaces/Task";
import { getDateKey } from "./dateUtils";

export const flattenMonthData = (tasks: Task[]): ExcelRow[] => {
  return tasks
    .filter((task) => task.kind === "task")
    .map<ExcelRow>((task) => ({
      title: task.title,
      hours: task.hours,
      date: getDateKey(task.start),
    }));
};
