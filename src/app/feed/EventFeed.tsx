// EventFeed.tsx
"use client";

import { useState } from "react";
import styles from "./eventfeed.module.css";
import FeedItem, { EventFeedItem } from "./FeedItem";
import EventModal from "./EventModal";

const defaultEvent: EventFeedItem = {
  host: "<missing>",
  event: "<missing>",
  month: "Januari",
  day: 1,
  startTime: "00:00",
  endTime: "01:00",
  img: undefined,
  id: undefined,
};

type EventFeedProps = {
  items?: EventFeedItem[]; // gärna optional
};

export default function EventFeed({ items = [] }: EventFeedProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventFeedItem | null>(
    null
  );

  const displayItems = items.length > 0 ? items : [defaultEvent];

  return (
    <>
      <div className={styles["feed-container"]}>
        {displayItems.map((item, index) => (
          <FeedItem
            key={item.id ?? index}
            {...item}
            onClick={() => setSelectedEvent(item)}
          />
        ))}
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
