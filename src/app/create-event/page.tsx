// app/create-event-2/page.tsx
"use client";

import styles from "./createevent2.module.css";
import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { FormEvent, useEffect, useState } from "react";

export type EventFormData = {
  sektion: string;
  fakultet: string;
  date: string;
  time: string;
  event: string;
  // etc...
};

export default function CreateEventPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    document.title = "Skapa Event | StudentEvent";
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload: EventFormData = {
      sektion: String(formData.get("sektion") ?? ""),
      fakultet: String(formData.get("fakultet") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      event: String(formData.get("event") ?? ""),
    };

    console.log("Form payload", payload);
    console.log("Image file", imageFile);
  };

  return (
    <>
      <form
        className={styles["form-container"]}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div className={styles["upload-container"]}>
          <ImageUploader onFileChange={setImageFile} />
        </div>

        <div className={styles["detail-submission"]}>
          <EventDetails />
          <button type="submit" className={styles["submit-btn"]}>
            Skicka in
          </button>
          <p className={styles["notice"]}><i><span className={"required-star"}>*</span> Obligatoriskt att fylla i</i></p>
        </div>

        {/* <div className={styles["preview"]}></div> */}
      </form>
    </>
  );
}
