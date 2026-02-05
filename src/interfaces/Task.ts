import { CalendarEntryBase } from "./CalendarEntryBase";

export interface Task extends CalendarEntryBase {
  kind: "task";
}
