// EventModal.tsx
"use client";

import type { EventFeedItem } from "./FeedItem";
import styles from "./eventmodal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

type EventModalProps = {
  event: EventFeedItem;
  onClose: () => void;
};

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add("no-scroll");
    body.classList.add("no-scroll");

    return () => {
      html.classList.remove("no-scroll");
      body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h2 className="h2">{event.event}</h2>
        <p>
          <strong>Av:</strong> {event.host}
        </p>
        <p>
          <strong>Datum:</strong> {event.day} {event.month}
        </p>
      </div>
    </div>
  );
}
