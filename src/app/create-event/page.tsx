// app/create-event-2/page.tsx
"use client";

import styles from "./createevent2.module.css";
import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { EventFormData } from "../lib/eventTypes";
import { saveEvent, loadEvents } from "../lib/eventStorage";
import router from "next/router";
import CreateEventSuccessModal from "./SuccessModal";
import EventModal from "../feed/EventModal";
import ConfirmCreationModal from "./ConfirmCreationModal";
import SuccessModal from "./SuccessModal";

export default function CreateEventPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const [events, setEvents] = useState<EventFormData[]>([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<EventFormData | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [createdEvent, setCreatedEvent] = useState<EventFormData | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = "Skapa Event | StudentEvent";
  }, []);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    console.log("events ändrades:", events);
  }, [events]);

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.currentTarget);

  //   const payload: EventFormData = {
  //     event: String(formData.get("event") ?? ""),
  //     arrangor: String(formData.get("arrangor") ?? ""),
  //     date: String(formData.get("date") ?? ""),
  //     place: String(formData.get("place") ?? ""),
  //     startTime: String(formData.get("startTime") ?? ""),
  //     endTime: String(formData.get("endTime") ?? ""),
  //     fakultet: String(formData.get("fakultet") ?? ""),
  //     beskrivning: String(formData.get("beskrivning") ?? ""),
  //     organizerURL: String(formData.get("organizerURL") ?? ""),
  //     imageData: imageData ?? null,
  //   };

  //   // 1) uppdatera lokalt state (preview-kolumnen)
  //   setEvents((prev) => {
  //     const updated = [...prev, payload];
  //     console.log("Uppdaterad event-lista i setState:", updated);
  //     return updated;
  //   });

  //   // 2) spara via helpern (sessionStorage)
  //   saveEvent(payload);

  //   console.log("Form payload (enstaka event):", payload);
  //   console.log("Image file:", imageFile);

  //   e.currentTarget.reset();
  //   setImageFile(null);
  //   setImageData(null);
  // };

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

    setPendingEvent(payload);
    setShowConfirm(true);
  };

  return (<>
    <form
      className={styles["form-container"]}
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      ref={formRef}
    >
      <div className={styles["upload-container"]}>
        <ImageUploader
          resetKey={resetKey}
          onFileChange={(file, dataUrl) => {
            setImageFile(file);
            setImageData(dataUrl);
          }}
        />
      </div>
      <div className={styles["detail-submission"]}>
        <EventDetails resetKey={resetKey} />
        <p className={styles["notice"]}>
          <i>
            <span className={"required-star"}>*</span> Obligatoriskt att fylla i
            dessa fält
          </i>
        </p>
        <button type="submit" className={styles["submit-btn"]}>
          Skapa Event
        </button>
      </div>

    </form>

    {showConfirm && pendingEvent && (
      <ConfirmCreationModal
        onClose={() => setShowSuccess(false)}
        onCancel={() => {
          setShowConfirm(false);
          setPendingEvent(null);
        }}
        onConfirm={() => {
          if (!pendingEvent) return;

          // spara
          setEvents((prev) => [...prev, pendingEvent]);
          saveEvent(pendingEvent);

          // rensa form
          formRef.current?.reset();
          setImageFile(null);
          setImageData(null);

          // success
          setCreatedEvent(pendingEvent);
          setPendingEvent(null);
          setShowConfirm(false);
          setShowSuccess(true);
        }}
      />
    )}


    {showSuccess && (
      <SuccessModal
        onClose={() => setShowSuccess(false)}
      />
    )}

  </>
  );
}
