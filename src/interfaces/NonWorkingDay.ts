import { CalendarEntryBase } from "./CalendarEntryBase";

export interface NonWorkingDay extends CalendarEntryBase {
  kind: "non-working";
  type: NonWorkingDayType;
  isDayOff: boolean;
}

export enum NonWorkingDayType {
  HOLIDAY = "holiday",
  BIRTHDAY = "birthday",
  VACATION = "vacation",
}
