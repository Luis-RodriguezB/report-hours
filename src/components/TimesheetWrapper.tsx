import { useModalStore } from "@/store/modalStore";
import { TimesheetCalendar } from "./timesheet-calendar/TimesheetCalendar";
import { Modal } from "./common/modal/Modal";
import { AddNonWorkingDay } from "./no-working-day/add-no-working-day/AddNonWorkingDay";
import { AddTask } from "./task/add-task/AddTask";
import { UpdateTask } from "./task/update-task/UpdateTask";

export const TimesheetWrapper = () => {
  const { activeModal, closeModal } = useModalStore();

  return (
    <>
      <Modal isOpen={activeModal === "addTask"} onClose={closeModal}>
        <AddTask />
      </Modal>

      <Modal isOpen={activeModal === "addNonWorkingDay"} onClose={closeModal}>
        <AddNonWorkingDay />
      </Modal>

      <Modal isOpen={activeModal === "updateTask"} onClose={closeModal}>
        <UpdateTask />
      </Modal>

      <TimesheetCalendar />
    </>
  );
};
