"use client";

import { useEffect } from "react";

import Navbar from "../components/navbar";
import styles from "../page.module.css";
import calStyles from "./calendar.module.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
//import { EventInput } from "@fullcalendar/core";
import svLocale from "@fullcalendar/core/locales/sv"; // svensk kalender
import Filter from "./filter";

export default function CalendarPage() {
  useEffect(() => {
    document.title = "Kalender | StudentEvent";
  }, []);

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
            dayMaxEvents={true}
          />
        </div>
      </div>
    </>
  );
}
