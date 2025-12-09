// app/create-event-2/page.tsx
"use client";

import styles from "./createevent2.module.css";
import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { FormEvent, useEffect, useState } from "react";
import EventFeed from "../feed/EventFeed";
import type { EventFeedItem } from "../feed/FeedItem";

import type { EventFormData } from "../lib/eventTypes";
import { saveEvent, loadEvents } from "../lib/eventStorage";

export default function CreateEventPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [events, setEvents] = useState<EventFormData[]>([]);

  useEffect(() => {
    document.title = "Skapa Event | StudentEvent";
  }, []);

  // 🔹 Läs in tidigare sparade event via helpern när sidan öppnas
  useEffect(() => {
    const saved = loadEvents();
    setEvents(saved);
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    console.log("events ändrades:", events);
  }, [events]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: EventFormData = {
      event: String(formData.get("event") ?? ""),
      arrangor: String(formData.get("arrangor") ?? ""),
      date: String(formData.get("date") ?? ""),
      place: String(formData.get("place") ?? ""),
      startTime: String(formData.get("startTime") ?? ""),
      endTime: String(formData.get("endTime") ?? ""),
      fakultet: String(formData.get("fakultet") ?? ""),
      beskrivning: String(formData.get("beskrivning") ?? ""),
      organizerURL: String(formData.get("organizerURL") ?? ""),
      imageData: imageData ?? null,
    };

    // 1) uppdatera lokalt state (preview-kolumnen)
    setEvents((prev) => {
      const updated = [...prev, payload];
      console.log("Uppdaterad event-lista i setState:", updated);
      return updated;
    });

    // 2) spara via helpern (sessionStorage)
    saveEvent(payload);

    console.log("Form payload (enstaka event):", payload);
    console.log("Image file:", imageFile);

    e.currentTarget.reset();
    setImageFile(null);
    setImageData(null);
  };

  // Bygg items till preview-feeden till höger
  const feedItems: EventFeedItem[] = events.map((ev, index) => {
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
      img: ev.imageData ?? undefined,
    };
  });

  return (
    <form
      className={styles["form-container"]}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className={styles["upload-container"]}>
        <ImageUploader
          onFileChange={(file, dataUrl) => {
            setImageFile(file);
            setImageData(dataUrl);
          }}
        />
      </div>
      <div className={styles["detail-submission"]}>
        <EventDetails />
        <p className={styles["notice"]}>
          <i>
            <span className={"required-star"}>*</span> Obligatoriskt att fylla
            dessa fält i
          </i>
        </p>
        <button type="submit" className={styles["submit-btn"]}>
          Skicka in
        </button>
      </div>

      <div className={styles["preview"]}>
        <EventFeed items={feedItems} />
      </div>
    </form>
  );
}
