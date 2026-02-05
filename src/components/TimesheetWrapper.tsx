import { useRef } from "react";

import { TimesheetModalsContext } from "../context/timesheet-modals/timesheetModalsContext";
import { TimesheetCalendar } from "./timesheet-calendar/TimesheetCalendar";
import { Modal, ModalRef } from "./common/modal/Modal";
import { AddNonWorkingDay } from "./no-working-day/add-no-working-day/AddNonWorkingDay";
import { AddTask } from "./task/add-task/AddTask";
import { UpdateTask } from "./task/update-task/UpdateTask";

export const TimesheetWrapper = () => {
  const modalAddNonWorkingDayRef = useRef<ModalRef>(null);
  const modalUpdateTaskRef = useRef<ModalRef>(null);
  const modalAddTaskRef = useRef<ModalRef>(null);

  return (
    <>
      <TimesheetModalsContext.Provider
        value={{
          modalAddTaskRef,
          modalUpdateTaskRef,
          modalAddNonWorkingDayRef,
        }}
      >
        <Modal ref={modalAddTaskRef}>
          <AddTask />
        </Modal>

        <Modal ref={modalAddNonWorkingDayRef}>
          <AddNonWorkingDay />
        </Modal>

        <Modal ref={modalUpdateTaskRef}>
          <UpdateTask />
        </Modal>

        <TimesheetCalendar />
      </TimesheetModalsContext.Provider>
    </>
  );
};
