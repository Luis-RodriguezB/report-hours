import { Calendar } from "react-big-calendar";

import { CustomToolbar } from "./CustomToolbar";
import { useTimesheetCalendar } from "./useTimesheetCalendar";
import { getMinMaxTime } from "@/utils/dateUtils";

import "react-big-calendar/lib/css/react-big-calendar.css";

const { min, max } = getMinMaxTime(new Date());

export const TimesheetCalendar = () => {
  const {
    view,
    events,
    formats,
    messages,
    localizer,
    ALL_VIEWS,
    currentDate,
    setView,
    onNavigate,
    slotPropGetter,
    handleSelectSlot,
    handleClickEvent,
  } = useTimesheetCalendar();

  return (
    <div>
      <Calendar
        selectable
        culture="es"
        endAccessor="end"
        startAccessor="start"
        step={60}
        timeslots={1}
        view={view}
        min={min}
        max={max}
        events={events}
        views={ALL_VIEWS}
        formats={formats}
        date={currentDate}
        messages={messages}
        localizer={localizer}
        components={{ toolbar: CustomToolbar }}
        onNavigate={onNavigate}
        onSelectSlot={handleSelectSlot}
        slotPropGetter={slotPropGetter}
        onSelectEvent={handleClickEvent}
        onView={(view) => setView(view)}
        style={{ height: 600 }}
      />
    </div>
  );
};
