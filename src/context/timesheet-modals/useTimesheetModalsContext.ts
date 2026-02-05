import { useContext } from "react";
import { TimesheetModalsContext } from "./timesheetModalsContext";

export const useTimesheetModalsContext = () => {
  const context = useContext(TimesheetModalsContext);

  if (!context) {
    throw new Error(
      "useTimesheetModalsContext must be used within a TimesheetModalsContext.Provider"
    );
  }

  return context;
};
