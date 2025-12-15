// app/calendar/page.tsx
"use client";

import { useEffect, useState } from "react";

import styles from "../page.module.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import type { EventInput } from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv";

import Filter from "./filter";
import calStyles from "./calendar.module.css";

import { DEFAULT_EVENTS, type EventFormData } from "../lib/eventTypes";
import { loadEvents } from "../lib/eventStorage";

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  useEffect(() => {
    document.title = "Kalender | StudentEvent";
  }, []);

  // Läs in event från storage + default när kalendersidan laddas
  useEffect(() => {
    const saved: EventFormData[] = loadEvents();
    const allEvents: EventFormData[] = [...DEFAULT_EVENTS, ...saved];

    console.log("Läste events till kalendern:", allEvents);

    const mapped: EventInput[] = allEvents.map((ev, index) => {
      let start: string | undefined = ev.date || undefined;
      let end: string | undefined = undefined;

      if (ev.date && ev.startTime) {
        start = `${ev.date}T${ev.startTime}`;
      }
      if (ev.date && ev.endTime) {
        end = `${ev.date}T${ev.endTime}`;
      }

      // Färg: använd vald color om den finns, annars fallback på fakultet
      let color = ev.color || "#000000";
      const fak = ev.fakultet?.toLowerCase() ?? "";
      if (!ev.color) {
        if (fak.includes("lintek")) color = "#00bfa5";
        if (fak.includes("stuff")) color = "#4fc3f7";
        if (fak.includes("consensus")) color = "#ce93d8";
      }

      return {
        id: String(index),
        title: ev.event || "Event utan namn",
        start,
        end,
        color,
        extendedProps: {
          arrangor: ev.arrangor,
          place: ev.place,
          fakultet: ev.fakultet,
          beskrivning: ev.beskrivning,
          organizerURL: ev.organizerURL,
        },
      } satisfies EventInput;
    });

    setCalendarEvents(mapped);
  }, []);

  return (
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
          events={calendarEvents}
          eventDisplay="block"
          dayMaxEvents={true}
        />
      </div>
    </div>
  );
}
