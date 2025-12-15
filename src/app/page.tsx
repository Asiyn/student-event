"use client";

import styles from "./page.module.css";

import EventFeed from "./feed/EventFeed";
import type { EventFeedItem } from "./feed/FeedItem";
import { useEffect, useState } from "react";

import type { EventFormData } from "./lib/eventTypes";
import { loadEvents } from "./lib/eventStorage";

const MONTHS = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];

export default function Home() {
  const [items, setItems] = useState<EventFeedItem[]>([]);

  useEffect(() => {
    document.title = "StudentEvent";
  }, []);

  useEffect(() => {
    const allEvents: EventFormData[] = loadEvents();

    const mapped: EventFeedItem[] = allEvents.map((ev) => {
      let month = "Okänd";
      let day = 1;
      let year = 2025;

      if (ev.date) {
        const parsed = new Date(ev.date);
        if (!Number.isNaN(parsed.getTime())) {
          month = MONTHS[parsed.getMonth()];
          day = parsed.getDate();
          year = parsed.getFullYear();
        }
      }

      return {
        id: ev.id ?? Math.random(),
        host: ev.arrangor || "<missing>",
        event: ev.event || "<missing>",
        month,
        day,
        year,
        place: ev.place || undefined,
        startTime: ev.startTime || " ",
        endTime: ev.endTime || " ",
        beskrivning: ev.beskrivning || undefined,
        organizerURL: ev.organizerURL || undefined,
        img: ev.imageData ?? undefined,
      };
    });

    const sorted = [...mapped].sort((a, b) => {
      const monthA = MONTHS.indexOf(a.month ?? "");
      const monthB = MONTHS.indexOf(b.month ?? "");

      const dateA = new Date(a.year!, monthA, a.day!);
      const dateB = new Date(b.year!, monthB, b.day!);

      return dateA.getTime() - dateB.getTime();
    });

    setItems(sorted);
  }, []);

  return (
    <div className={styles.page}>
      <h1>Kommande Event</h1>
      <EventFeed items={items} />
    </div>
  );
}
