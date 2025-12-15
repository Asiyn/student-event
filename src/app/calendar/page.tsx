"use client";

import { useEffect } from "react";

import Navbar from "../components/navbar";
import styles from "../page.module.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
<<<<<<< Updated upstream
//import { EventInput } from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv"; // svensk kalender
=======
import type {
  EventContentArg,
  EventInput,
  EventClickArg,
} from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv";
>>>>>>> Stashed changes

import Filter from "./filter";

import calStyles from "./calendar.module.css";

<<<<<<< Updated upstream
export default function CalendarPage() {
=======
import type { EventFormData } from "../lib/eventTypes";
import { DEFAULT_EVENTS } from "../lib/eventTypes";
import { loadEvents } from "../lib/eventStorage";
import { DEFAULT_EVENTS } from "../lib/eventTypes";

import EventModal from "../feed/EventModal";
<<<<<<< Updated upstream
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
=======
import type { EventFeedItem } from "../feed/FeedItem";
import { formToFeed } from "../lib/mappers";
>>>>>>> Stashed changes

export default function CalendarPage() {
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<EventFeedItem | null>(
    null
  );
  const [showEventModal, setShowEventModal] = useState(false);

>>>>>>> Stashed changes
  useEffect(() => {
    document.title = "Kalender | StudentEvent";
  }, []);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
  // Läs in event från storage + defaults när kalendersidan laddas
>>>>>>> Stashed changes
  useEffect(() => {
    const saved: EventFormData[] = loadEvents();

    const allEvents: EventFormData[] = [...DEFAULT_EVENTS, ...saved];
<<<<<<< Updated upstream

    console.log("Läste events till kalendern:", allEvents);

    const mapped: EventInput[] = allEvents.map((ev, index) => {
=======
    console.log("Läste events till kalendern:", allEvents);

    const mapped: EventInput[] = allEvents.map((ev, index) => {
      // Bygg start/slut
>>>>>>> Stashed changes
      let start: string | undefined = ev.date || undefined;
      let end: string | undefined = undefined;

      if (ev.date && ev.startTime) {
        start = `${ev.date}T${ev.startTime}`;
      }
      if (ev.date && ev.endTime) {
        end = `${ev.date}T${ev.endTime}`;
      }

<<<<<<< Updated upstream
=======
      // Färg: använd vald color eller fallback
>>>>>>> Stashed changes
      let color = ev.color || "#000000";
      const fak = ev.fakultet?.toLowerCase() ?? "";
      if (!ev.color) {
        if (fak.includes("lintek")) color = "#00bfa5";
        if (fak.includes("stuff")) color = "#4fc3f7";
        if (fak.includes("consensus")) color = "#ce93d8";
      }

      return {
        id: String(ev.id ?? index),
<<<<<<< Updated upstream
        title: ev.event || "Event utan namn",
=======
        title: ev.event,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      id: event.id ? Number(event.id) : undefined,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      id: undefined,
    };

    console.log("CLICKED EVENT");

    setSelectedEvent(mapFormDataToFeedItem(data));
=======
    };

    // använd helpern du importerar
    setSelectedEvent(formToFeed(data));
>>>>>>> Stashed changes
    setShowEventModal(true);
  };

>>>>>>> Stashed changes
  return (
    <>
      <Navbar />
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
              right: "dayGridMonth,timeGridWeek,listWeek",
            }}
            weekNumbers={true}
            weekText="v."
            events={[
              {
                title: "MTEDK",
                start: "2025-11-03T18:00:00",
                color: "#613325ff",
              },
              {
                title: "Team Meeting",
                start: "2025-11-05T10:00:00",
                color: "#00bfa5",
              },
              {
                title: "UI Review",
                start: "2025-11-07T14:00:00",
                color: "#4fc3f7",
              },
              {
                title: "Weekend Hackathon",
                start: "2025-11-09",
                end: "2025-11-10",
                color: "#ce93d8",
              },
            ]}
            eventDisplay="block"
<<<<<<< Updated upstream
            dayMaxEvents={true}
=======
            eventContent={renderEventContent}
            height="auto"
            fixedWeekCount={true}
            expandRows={true}
            dayMaxEvents={false}
            dayMaxEventRows={2}
>>>>>>> Stashed changes
          />
        </div>
      </div>
    </>
  );
}
