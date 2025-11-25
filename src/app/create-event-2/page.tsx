"use client";

import styles from "./createevent2.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

import ImageUploader from "./ImageUploader";

export default function CreateEventPage() {
  return (
    <>
      <div className={styles["form-container"]}>
        <div className={styles["upload-container"]}>
            {/* <FontAwesomeIcon icon={faArrowUpFromBracket} /> */}
            {/* <FontAwesomeIcon icon={faCloudArrowUp} /> */}
            <ImageUploader />
        </div>
        <div className={styles["detail-submission"]}></div>
        <div className={styles["preview"]}></div>
      </div>
    </>
  );
}
