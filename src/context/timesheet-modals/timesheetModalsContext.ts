import { createContext } from "react";
import { ModalRef } from "@/components/common/modal/Modal";

type TimesheetModalsContextType = {
  modalAddTaskRef: React.RefObject<ModalRef>;
  modalUpdateTaskRef: React.RefObject<ModalRef>;
  modalAddNonWorkingDayRef: React.RefObject<ModalRef>;
};

export const TimesheetModalsContext = createContext<
  TimesheetModalsContextType | undefined
>(undefined);
