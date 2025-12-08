import Navbar from "../components/navbar";
import styles from "./createEvent.module.css";
import { ItemBuilder } from "../components/itemBuilder";
import { truncate } from "fs";

<<<<<<< Updated upstream
export const metadata = {
  title: "Skapa Event | StudentEvent",
};

const firstFive: string[] = [
  "Namn på event:",
  "Datum:",
  "Tid:",
  "Plats:",
  "Värd:",
];

const eightToTen: string[] = ["omslag / affisch:", "fakultet:", "Sektion:"];

export default function CreateEvent() {
  return (
    <>
      <Navbar />
      <div className={styles.headFlex}>
        <p className={styles.headText}>Skapa ditt event här</p>
      </div>
      {/*kan chilla här*/}
      <div className={styles.container}>
        <div className={styles.grid}>
          {firstFive.map((thisText) => (
            <ItemBuilder
              key={thisText}
              row={firstFive.indexOf(thisText) + 1}
              rhs={false}
              text={thisText}
            />
          ))}
          {/* 
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "2", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>datum:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "3", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>tid:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "4", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>plats:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "5", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>värd:</p>
            </div>
            */}
          <div
            className={styles.descFlex}
            style={{ gridRow: "6", gridColumn: "1 /span 2" }}
          >
            <p className={styles.descText}>Beskrivning:</p>
          </div>
          <div
            className={styles.descFlexInputText}
            style={{ gridRow: "7", gridColumn: "1 /span 2" }}
          >
            <p className={styles.descFlexText}>
              <textarea
                className={styles.descInputText}
                placeholder="Beskriv ditt evenemang här"
                maxLength={250}
              />
            </p>
          </div>

          {eightToTen.map((thisText) => (
            <ItemBuilder
              key={thisText}
              row={eightToTen.indexOf(thisText) + 8}
              rhs={false}
              text={thisText}
            />
          ))}

          {/*<div
            className={styles.bodyFlex}
            style={{ gridRow: "8", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>omslag / affisch:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "9", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>fakultet:</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "10", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>sektion:</p>
          </div>*/}
          {/* ------------------RIGHT SIDE / TEXT----------------- */}
          {firstFive.map((thisText) => (
            <ItemBuilder
              key={thisText}
              row={firstFive.indexOf(thisText) + 1}
              rhs={true}
              text={thisText}
            />
          ))}
          {/*
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "1", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Namn på event här"
                rows={1}
              />
            </p>
          </div>
         
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "2", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="ÅÅÅÅ-MM-DD"
                rows={1}
              />
            </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "3", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="XX : YY"
                rows={1}
              />
            </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "4", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Plats för event här"
                rows={1}
              />
            </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "5", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Värd/Organisation här"
                rows={1}
              />
            </p>
          </div>
          */}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "8", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Ladda upp omslag/affish här"
                rows={1}
              />
            </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "9", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Faktultet Lintek/Stuff..."
                rows={1}
              />
            </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "10", gridColumn: "2" }}
          >
            <p className={styles.bodyTextRHS}>
              <textarea
                className={styles.textInput}
                placeholder="Sektion N/MT/GDK..."
                rows={1}
              />
            </p>
          </div>
        </div>
      </div>
    </>
=======
import styles from "./createevent2.module.css";
import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { FormEvent, useEffect, useState } from "react";
import EventFeed from "../feed/EventFeed";
import type { EventFeedItem } from "../feed/FeedItem";

export type EventFormData = {
  event: string;
  arrangor: string;
  date: string;
  place: string;
  startTime: string;
  endTime: string;
  fakultet: string;
  beskrivning: string;
  organizerURL: string;
};

export default function CreateEventPage() {
  // bildfil
  const [imageFile, setImageFile] = useState<File | null>(null);

  // “vektor” av event
  const [events, setEvents] = useState<EventFormData[]>([]);

  useEffect(() => {
    document.title = "Skapa Event | StudentEvent";
  }, []);

  // logga varje gång listan med events ändras
  useEffect(() => {
    if (events.length === 0) return; // hoppa över första (tom) körningen
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
    };

    // lägg till nytt event i arrayen (som en vector push_back)
    setEvents((prev) => {
      const updated = [...prev, payload];
      console.log("Uppdaterad event-lista i setState:", updated);
      return updated;
    });

    console.log("Form payload (enstaka event):", payload);
    console.log("Image file:", imageFile);
    console.log("event:\n" + payload.beskrivning + "\n" + payload.fakultet);

    e.currentTarget.reset();
  };

  const feedItems: EventFeedItem[] = events.map((ev, index) => {
    let month = "Okänd";
    let day = 1;

    if (ev.date) {
      const parsed = new Date(ev.date); // "2025-12-24" → Date
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
      id: index, // enkel id
      host: ev.arrangor || "<missing>",
      event: ev.event || "<missing>",
      month,
      day,
      img: undefined, // du kan senare mappa in bild här
    };
  });

  return (
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
    </form>
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  );
}
