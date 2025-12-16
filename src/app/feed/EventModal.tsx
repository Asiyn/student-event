// EventModal.tsx
"use client";

import type { EventFeedItem } from "./FeedItem";
import styles from "./eventmodal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faClock,
  faCalendar,
  faLocationDot,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import Image from "next/image";
import placeholderImg from "../../images/img_err.png";

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
        <div className={styles.modalHeader}>
          <button className={styles.closeButton} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className={styles["modal-items-container"]}>
          <div className={styles["image"]}>
            <Image
              src={event.img ?? placeholderImg}
              alt="placeholder"
              className={styles["modal-img"]}
              aria-hidden={true}
              priority
              fill
            />
          </div>

          <div className={styles["information"]}>
            <h2 className="h2">{event.event}</h2>
            <h3>
              <strong>{event.host}</strong>
            </h3>
            <p>
              <FontAwesomeIcon icon={faCalendar} /> {event.day} {event.month}{" "}
              {event.year ?? "2025"}
            </p>

            <p>
              <FontAwesomeIcon icon={faClock} /> {event.startTime} -{" "}
              {event.endTime}
            </p>

            {event.place && (
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {event.place}
              </p>
            )}

            {event.beskrivning && (
              <div className={styles["beskrivning"]}>
                <h4>Om eventet</h4>
                <p className={styles["beskr-text"]}>{event.beskrivning}</p>
              </div>
            )}

            {event.organizerURL && (
              <div>
                <p>
                  <FontAwesomeIcon icon={faLink} />
                  <a
                    href={event.organizerURL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    &nbsp;Länk till {event.host}&#39;s sida
                    {/* Fixar apostrof ' och mellanslag framför */}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
