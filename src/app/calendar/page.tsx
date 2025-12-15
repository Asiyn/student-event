// app/calendar/page.tsx
"use client";

import { useEffect, useState } from "react";

import styles from "../page.module.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import type { EventContentArg, EventInput } from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv";

import Filter from "./filter";
import calStyles from "./calendar.module.css";

import type { EventFormData } from "../lib/eventTypes";
import { loadEvents } from "../lib/eventStorage";

import type { EventClickArg } from "@fullcalendar/core"; // klicka event
import EventModal from "../feed/EventModal";
import { EventFeedItem } from "../feed/FeedItem";



function mapFormDataToFeedItem(ev: EventFormData): EventFeedItem {
  const date = new Date(ev.date);

  return {
    id: ev.id,
    event: ev.event,
    host: ev.arrangor || "<okänd arrangör>",
    month: date.toLocaleString("sv-SE", { month: "long" }),
    day: date.getDate(),
    startTime: ev.startTime || "",
    endTime: ev.endTime || "",
    img: ev.imageData ?? undefined,
  };
}

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  // Klicka på event
  const [selectedEvent, setSelectedEvent] = useState<EventFeedItem | null>(
    null
  );
  const [showEventModal, setShowEventModal] = useState(false);

  useEffect(() => {
    document.title = "Kalender | StudentEvent";
  }, []);

  // Läs in event från storage när kalendersidan laddas
  useEffect(() => {
    const saved: EventFormData[] = loadEvents();
    console.log("Läste events till kalendern:", saved);

    const mapped: EventInput[] = saved.map((ev, index) => {
      // Bygg start/slut
      // Om du bara har datum => heldagsevent
      let start: string | undefined = ev.date || undefined;
      let end: string | undefined = undefined;

      if (ev.date && ev.startTime) {
        start = `${ev.date}T${ev.startTime}`;
      }
      if (ev.date && ev.endTime) {
        end = `${ev.date}T${ev.endTime}`;
      }

      // Enkel färg baserat på fakultet (valfritt)
      let color = ev.color || "#000000"; // default
      const fak = ev.fakultet?.toLowerCase() ?? "";
      if (fak.includes("lintek")) color = "#00bfa5";
      if (fak.includes("stuff")) color = "#4fc3f7";
      if (fak.includes("consensus")) color = "#ce93d8";

      return {
        id: String(index),
        title: ev.event,
        start,
        end,
        color,
        extendedProps: {
          arrangor: ev.arrangor,
          place: ev.place,
          fakultet: ev.fakultet,
          beskrivning: ev.beskrivning,
          organizerURL: ev.organizerURL,
          imageData: ev.imageData, // ← måste finnas
        },
      } satisfies EventInput;
    });

    setCalendarEvents(mapped);
  }, []);

  const renderEventContent = (arg: EventContentArg) => {
    const arrangor = arg.event.extendedProps.arrangor as string | undefined;

    return (
      <div>
        <div style={{ fontWeight: 600 }}>{arg.event.title}</div>
        {arrangor && (
          <div style={{ fontSize: "0.75em", opacity: 0.85 }}>{arrangor}</div>
        )}
      </div>
    );
  };

  // hantera klick
  const handleEventClick = (arg: EventClickArg) => {
    const { event } = arg;

    const data: EventFormData = {
      event: event.title,
      arrangor: event.extendedProps.arrangor,
      date: event.startStr.split("T")[0],
      startTime: event.startStr.split("T")[1]?.slice(0, 5) ?? "",
      endTime: event.endStr?.split("T")[1]?.slice(0, 5) ?? "",
      place: event.extendedProps.place,
      beskrivning: event.extendedProps.beskrivning,
      organizerURL: event.extendedProps.organizerURL,
      imageData: event.extendedProps.imageData,
      fakultet: event.extendedProps.fakultet,
      color: event.backgroundColor ?? null,
      id: undefined,
    };

    console.log("CLICKED EVENT");

    setSelectedEvent(mapFormDataToFeedItem(data));
    setShowEventModal(true);
  };

  return (
    <>
      <div className={styles.page}>
        <Filter />

        <div className={calStyles["calendar-container"]}>
          <FullCalendar
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView="dayGridMonth"
            locales={[svLocale]}
            locale="sv"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,listWeek",
            }}
            weekNumbers={true}
            weekText="v."
            displayEventTime={false}
            events={calendarEvents}
            eventClick={handleEventClick}
            eventDisplay="block"
            eventContent={renderEventContent}
            height="auto"
            fixedWeekCount={true} // ← alla veckor lika höjd
            expandRows={true} // ← dela höjd jämnt
            dayMaxEvents={false} // ← aktiverar "+X till"
            dayMaxEventRows={2}
          />
        </div>
      </div>

      {showEventModal && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
}
