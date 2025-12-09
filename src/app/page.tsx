// app/page.tsx
"use client";

import styles from "./page.module.css";
import feedStyles from "./start.module.css";

import EventFeed from "./feed/EventFeed";
import type { EventFeedItem } from "./feed/FeedItem";
import { useEffect, useState } from "react";

const STORAGE_KEY = "studentevent-events";

type EventFormData = {
  event: string;
  arrangor: string;
  date: string;
  place: string;
  startTime: string;
  endTime: string;
  fakultet: string;
  beskrivning: string;
  organizerURL: string;
};

export default function Home() {
  const [items, setItems] = useState<EventFeedItem[]>([]);

  useEffect(() => {
    document.title = "StudentEvent";
  }, []);

  // läs in events från localStorage när startsidan laddas
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const saved = JSON.parse(raw) as EventFormData[];

      const mapped: EventFeedItem[] = saved.map((ev, index) => {
        let month = "Okänd";
        let day = 1;

        if (ev.date) {
          const parsed = new Date(ev.date);
          if (!Number.isNaN(parsed.getTime())) {
            const months = [
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
            month = months[parsed.getMonth()];
            day = parsed.getDate();
          }
        }

        return {
          id: index,
          host: ev.arrangor || "<missing>",
          event: ev.event || "<missing>",
          month,
          day,
          img: undefined, // här kan du senare stoppa in bild-url
        };
      });

      setItems(mapped);
    } catch (err) {
      console.error(
        "Kunde inte läsa events från localStorage på startsidan",
        err
      );
    }
  }, []);

  return (
    <div className={`${styles.page} ${feedStyles.page}`}>
      <h1>Student Event</h1>
      {/* 🔹 nu matar du in items till feeden */}
      <EventFeed items={items} />
    </div>
  );
}
