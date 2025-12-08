// EventFeed.tsx
"use client";

import { useState } from "react";
import styles from "./eventfeed.module.css";
import FeedItem, { EventFeedItem } from "./FeedItem";
import EventModal from "./EventModal";
import halloween from "@/images/halloween.jpg"; // kan du använda som fallback-bild om du vill

const defaultEvent: EventFeedItem = {
  host: "<missing>",
  event: "<missing>",
  month: "Januari",
  day: 1,
  img: undefined,
  id: undefined,
};

type EventFeedProps = {
  items?: EventFeedItem[]; // <-- gör items valfritt
};

export default function EventFeed({ items = [] }: EventFeedProps) {
  //                ^^^^^^^^^^^^^^^ default: tom array om inget skickas in
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
