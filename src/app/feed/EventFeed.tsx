// EventFeed.tsx
"use client";

import { useState } from "react";
import styles from "./eventfeed.module.css";
import FeedItem, { EventFeedItem } from "./FeedItem";
import EventModal from "./EventModal";
import halloween from "@/images/halloween.jpg";

const defaultEvent: EventFeedItem = {
  host: "<missing>",
  event: "<missing>",
  month: "Januari",
  day: 1,
  img: undefined,
  id: undefined,
};

export default function EventFeed() {
  const [selectedEvent, setSelectedEvent] = useState<EventFeedItem | null>(
    null
  );

  const mainEvent: EventFeedItem = {
    id: 1,
    month: "November",
    day: 1,
    host: "3CANT",
    event: "Halloweensittningen",
    img: halloween,
  };

  return (
    <>
      <div className={styles["feed-container"]}>
        <FeedItem {...mainEvent} onClick={() => setSelectedEvent(mainEvent)} />
        <FeedItem onClick={() => setSelectedEvent({ ...defaultEvent })} />
        <FeedItem onClick={() => setSelectedEvent({ ...defaultEvent })} />
        <FeedItem onClick={() => setSelectedEvent({ ...defaultEvent })} />
        <FeedItem onClick={() => setSelectedEvent({ ...defaultEvent })} />
        <FeedItem onClick={() => setSelectedEvent({ ...defaultEvent })} />
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
}
