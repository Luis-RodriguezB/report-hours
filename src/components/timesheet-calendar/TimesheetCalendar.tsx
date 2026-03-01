import { useCallback } from "react";
import { Calendar } from "react-big-calendar";

import { CustomToolbar } from "./CustomToolbar";
import { useTimesheetCalendar } from "./useTimesheetCalendar";
import { getMinMaxTime } from "@/utils/dateUtils";
import { CalendarEntry } from "@/interfaces/CalendarEntry";

import "react-big-calendar/lib/css/react-big-calendar.css";

const { min, max } = getMinMaxTime(new Date());

const eventPropGetter = (event: CalendarEntry) => {
  if (event.kind === "non-working") {
    return {
      style: {
        backgroundColor: "#78716c",
        color: "#fafaf9",
      },
    };
  }
  return {
    style: {
      backgroundColor: "#4f46e5",
      color: "#fff",
    },
  };
};

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

  const handleViewChange = useCallback(
    (v: typeof view) => setView(v),
    [setView],
  );

  return (
    <div className="rounded-2xl overflow-hidden">
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
        eventPropGetter={eventPropGetter}
        onNavigate={onNavigate}
        onSelectSlot={handleSelectSlot}
        slotPropGetter={slotPropGetter}
        onSelectEvent={handleClickEvent}
        onView={handleViewChange}
        style={{ height: "calc(100vh - 180px)", minHeight: 480 }}
      />
    </div>
  );
};
