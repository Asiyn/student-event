import React from "react";
import styles from "./create-event/createEvent.module.css";

export default function formBuilder(row: string, label: string) {
  return (
    <div
      className={styles.bodyFlex}
      style={{ gridRow: row, gridColumn: "1" }}
    >
      <p className={styles.bodyText}>{label}</p>
    </div>
  );
}