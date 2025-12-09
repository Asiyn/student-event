// app/page.tsx
"use client";

import styles from "./page.module.css";
import feedStyles from "./start.module.css";

import EventFeed from "./feed/EventFeed";
import type { EventFeedItem } from "./feed/FeedItem";
import { useEffect, useState } from "react";

import type { EventFormData } from "./lib/eventTypes";
import { loadEvents } from "./lib/eventStorage";

export default function Home() {
  const [items, setItems] = useState<EventFeedItem[]>([]);

  useEffect(() => {
    document.title = "StudentEvent";
  }, []);

  // läs in events från storage när startsidan laddas
  useEffect(() => {
    const saved: EventFormData[] = loadEvents();
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
        img: ev.imageData ?? undefined, // här kan du senare stoppa in bild-url
      };
    });

    setItems(mapped);
  }, []);

  return (
    <div className={`${styles.page} ${feedStyles.page}`}>
      <h1>Student Event</h1>
      <EventFeed items={items} />
    </div>
  );
}
