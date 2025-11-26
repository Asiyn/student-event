"use client";

import styles from "./createevent2.module.css";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUpFromBracket, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import ImageUploader from "./ImageUploader";
import EventDetails from "./EventDetails";
import { useEffect } from "react";

export default function CreateEventPage() {
  useEffect(() => {
      document.title = "Skapa Event | StudentEvent";
    }, []);
  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["upload-container"]}>
            {/* <FontAwesomeIcon icon={faArrowUpFromBracket} /> */}
            {/* <FontAwesomeIcon icon={faCloudArrowUp} /> */}
            <ImageUploader />
        </div>
        <div className={styles["detail-submission"]}>
            <EventDetails />
        </div>
        <div className={styles["preview"]}></div>
      </div>
    </>
  );
}
