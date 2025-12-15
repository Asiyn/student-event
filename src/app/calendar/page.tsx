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

import type { EventFormData } from "../lib/eventTypes";
import { loadEvents } from "../lib/eventStorage";

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

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
      let color = ev.color || "#613325"; // default
      const fak = ev.fakultet?.toLowerCase() ?? "";
      if (fak.includes("lintek")) color = "#00bfa5";
      if (fak.includes("stuff")) color = "#4fc3f7";
      if (fak.includes("consensus")) color = "#ce93d8";

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
