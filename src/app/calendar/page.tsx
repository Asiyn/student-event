// app/calendar/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";

import styles from "../page.module.css";
import calStyles from "./calendar.module.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import type {
  CalendarApi,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv";

import Filter from "./filter";

import type { EventFormData } from "../lib/eventTypes";
import { loadEvents } from "../lib/eventStorage";

import type { EventClickArg } from "@fullcalendar/core"; // klicka event
import EventModal from "../feed/EventModal";
import { EventFeedItem } from "../feed/FeedItem";

import { formToFeed } from "../lib/mappers";

function getReadableTextColor(bg: string) {
  const hex = bg.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#010714" : "#d9e4fe";
}

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  // Klicka på event
  const [selectedEvent, setSelectedEvent] = useState<EventFeedItem | null>(
    null
  );
  const [showEventModal, setShowEventModal] = useState(false);

  // filter
  const [selectedFakulteter, setSelectedFakulteter] = useState<string[]>([]);
  const [selectedArrangorer, setSelectedArrangorer] = useState<string[]>([]);

  const [allEvents, setAllEvents] = useState<EventInput[]>([]);

  // mobil
  const [isMobile, setIsMobile] = useState(false);
  const calendarRef = useRef<FullCalendar | null>(null);

  useEffect(() => {
    document.title = "Kalender | StudentEvent";
  }, []);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const api: CalendarApi | undefined = calendarRef.current?.getApi();
    if (!api) return;

    const desiredView = isMobile ? "listWeek" : "dayGridMonth";
    if (api.view.type !== desiredView) {
      api.changeView(desiredView);
    }
  }, [isMobile]);

  // -----------------------

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
      const color = ev.color || "#000000"; // default

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
          imageData: ev.imageData,
        },
      } satisfies EventInput;
    });

    setAllEvents(mapped);
    setCalendarEvents(mapped);
  }, []);

  const renderEventContent = (arg: EventContentArg) => {
    const arrangor = arg.event.extendedProps.arrangor as string | undefined;
    const bg = arg.event.backgroundColor || "#010714";

    const isWeekView = arg.view.type === "listWeek";

    const textColor = isWeekView
      ? "#d9e4fe" // always white in week view
      : getReadableTextColor(bg); // dynamic in month view

    return (
      <div style={{ color: textColor }}>
        <div style={{ fontWeight: 600 }}>{arg.event.title}</div>
        {arrangor && (
          <div style={{ fontSize: "0.75em", opacity: 0.9 }}>{arrangor}</div>
        )}
      </div>
    );
  };

  // hantera klick
  const handleEventClick = (arg: EventClickArg) => {
    const e = arg.event;

    const formData: EventFormData = {
      event: e.title,
      arrangor: e.extendedProps.arrangor,
      date: e.startStr.split("T")[0],
      startTime: e.startStr.split("T")[1]?.slice(0, 5) ?? "",
      endTime: e.endStr?.split("T")[1]?.slice(0, 5) ?? "",
      place: e.extendedProps.place,
      beskrivning: e.extendedProps.beskrivning,
      organizerURL: e.extendedProps.organizerURL,
      imageData: e.extendedProps.imageData,
      fakultet: e.extendedProps.fakultet,
      color: e.backgroundColor ?? null,
      id: undefined,
    };

    setSelectedEvent(formToFeed(formData));
    setShowEventModal(true);
  };

  useEffect(() => {
    const filtered = allEvents.filter((e) => {
      const fakultet = e.extendedProps?.fakultet?.toLowerCase();
      const arrangor = e.extendedProps?.arrangor?.toLowerCase();

      const fakultetMatch =
        selectedFakulteter.length === 0 ||
        (fakultet && selectedFakulteter.includes(fakultet));

      const arrangorMatch =
        selectedArrangorer.length === 0 ||
        (arrangor && selectedArrangorer.includes(arrangor));

      return fakultetMatch && arrangorMatch;
    });

    setCalendarEvents(filtered);
  }, [selectedFakulteter, selectedArrangorer, allEvents]);

  return (
    <>
      <div className={styles.page}>
        <Filter
          onFakultetChange={setSelectedFakulteter}
          onArrangorChange={setSelectedArrangorer}
          // toggleFilterVisibility={() => setSelectedEvent()}
        />

        <div className={calStyles["calendar-container"]}>
          <FullCalendar
            ref={calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            initialView={isMobile ? "listWeek" : "dayGridMonth"}
            locales={[svLocale]}
            locale="sv"
            headerToolbar={
              isMobile
                ? {
                    left: "",
                    center: "title",
                    right: "",
                  }
                : {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,listWeek",
                  }
            }
            footerToolbar={
              isMobile
                ? {
                    left: "prev,next",
                    center: "today",
                    right: "listWeek",
                  }
                : false
            }
            weekNumbers={true}
            weekText="v."
            buttonText={{
              dayGridMonth: "Månad",
              listWeek: "Vecka",
            }}
            displayEventTime={false}
            events={calendarEvents}
            eventClick={handleEventClick}
            eventDisplay="block"
            eventContent={renderEventContent}
            height="auto"
            fixedWeekCount={true}
            expandRows={true}
            dayMaxEvents={false}
            dayMaxEventRows={1}
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
