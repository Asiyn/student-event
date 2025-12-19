// app/create-event-2/page.tsx
"use client";

import styles from "./createevent2.module.css";
import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { FormEvent, useEffect, useRef, useState } from "react";

import type { EventFormData } from "../lib/eventTypes";
import { saveEvent, loadEvents } from "../lib/eventStorage";
import ConfirmCreationModal from "./ConfirmCreationModal";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";

export default function CreateEventPage() {
  const [formKey, setFormKey] = useState(0);

  const [, setImageFile] = useState<File | null>(null);
  const [imageData, setImageData] = useState<string | null>(null);

  const [events, setEvents] = useState<EventFormData[]>([]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingEvent, setPendingEvent] = useState<EventFormData | null>(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [, setCreatedEvent] = useState<EventFormData | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  // felhantering
  const [showError, setShowError] = useState(false);

  // mobil knapp för att ta bort bild
  const [showMobileDelete, setShowMobileDelete] = useState(false);

  // prevent form progress lost
  const [hasInfo, setHasInfo] = useState(false);

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
      color: (formData.get("colorCalendar") as string) || null,
      id: undefined,
    };

    setPendingEvent(payload);
    setShowConfirm(true);
  };

  // prevent progress lost ------------------------------------------------
  useEffect(() => {
    if (!hasInfo) return;

    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // e.returnValue = ""; // required for Chrome
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [hasInfo]);

  useEffect(() => {
  if (!hasInfo) return;

  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a");

    if (!link) return;
    if (link.target === "_blank") return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) return;

    const ok = window.confirm(
      "Är du säker på att du vill lämna sidan? Osparade ändringar kommer att försvinna."
    );

    if (!ok) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  document.addEventListener("click", handler, true);
  return () => document.removeEventListener("click", handler, true);
}, [hasInfo]);


  return (
    <>
      <form
        className={styles["form-container"]}
        onSubmit={handleSubmit}
        onChange={() => setHasInfo(true)}
        encType="multipart/form-data"
        ref={formRef}
        key={formKey}
      >
        <div
          className={`${styles["upload-container"]} ${
            showMobileDelete ? styles.expanded : ""
          }`}
        >
          <ImageUploader
            resetKey={formKey}
            onFileChange={(file, dataUrl) => {
              setImageFile(file);
              setImageData(dataUrl);
              setHasInfo(true);
            }}
            onMobileDeleteToggle={setShowMobileDelete}
          />
        </div>
        <div className={styles["detail-submission"]}>
          <EventDetails resetKey={formKey} />

          <p className={styles["notice"]}>
            <i>
              <span className={"required-star"}>*</span> Obligatoriskt att fylla
              i dessa fält
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
          onConfirm={async () => {
            if (!pendingEvent) return;

            try {
              await saveEvent(pendingEvent);

              setEvents((prev) => [...prev, pendingEvent]);

              // rensa form
              formRef.current?.reset();
              setImageFile(null);
              setImageData(null);
              setFormKey((prev) => prev + 1);

              // success
              setCreatedEvent(pendingEvent);
              setPendingEvent(null);
              setShowConfirm(false);
              setShowSuccess(true);
              setHasInfo(false);
            } catch {
              setShowConfirm(false);
              setShowError(true);
            }
          }}
        />
      )}

      {showSuccess && <SuccessModal onClose={() => setShowSuccess(false)} />}

      {showError && <ErrorModal onClose={() => setShowError(false)} />}
    </>
  );
}
