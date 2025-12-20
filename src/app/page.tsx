"use client";

import styles from "./page.module.css";

import EventFeed from "./feed/EventFeed";
import type { EventFeedItem } from "./feed/FeedItem";
import { useEffect, useState } from "react";

import type { EventFormData } from "./lib/eventTypes";
import { DEFAULT_EVENTS } from "./lib/eventTypes";
import { subscribeToEvents } from "./lib/firestoreEvents";
import { formToFeed } from "./lib/mappers";

function sortKey(ev: EventFormData) {
  if (!ev.date) return 0;
  const time = ev.startTime ? ev.startTime : "00:00";
  const dt = new Date(`${ev.date}T${time}`);
  const t = dt.getTime();
  return Number.isNaN(t) ? 0 : t;
}

export default function Home() {
  const [items, setItems] = useState<EventFeedItem[]>([]);

  useEffect(() => {
    document.title = "StudentEvent";
  }, []);

  useEffect(() => {
    const unsub = subscribeToEvents((firestoreEvents) => {
      const all: EventFormData[] = [...DEFAULT_EVENTS, ...firestoreEvents];

      const sorted = [...all].sort((a, b) => sortKey(a) - sortKey(b));

      const mapped = sorted.map((ev, idx) => formToFeed(ev, ev.id ?? idx + 1));

      setItems(mapped);
    });

    return () => unsub();
  }, []);

  return (
    <div className={styles.page}>
      <h1>Kommande Event</h1>
      <EventFeed items={items} />
    </div>
  );
}
