import React from "react";
import styles from "../create-event/createEvent.module.css";
import ItemBuilder from "./itemBuilder";

const firstFive = ["Namn på event:", "Datum:", "Tid:", "Plats:", "Värd:"];
const eightToTen = ["Omslag / Affisch:", "Fakultet:", "Sektion:"];


export default function FormBuilder() {
  return (
    <>
      {firstFive.map((text, i) => (
        <ItemBuilder key={`lhs-${i}`} row={i + 1} rhs={false} text={text} />
      ))}

      <div className={styles.descFlex} style={{ gridRow: 6, gridColumn: "1 / span 2" }}>
        <p className={styles.descText}>Beskrivning:</p>
      </div>

      <div className={styles.descFlexInputText} style={{ gridRow: 7, gridColumn: "1 / span 2" }}>
        <textarea
          className={styles.descInputText}
          placeholder="Beskriv ditt evenemang här"
          maxLength={250}
        />
      </div>

      {eightToTen.map((text, i) => (
        <ItemBuilder key={`lhs2-${i}`} row={i + 8} rhs={false} text={text} />
      ))}

      {firstFive.map((text, i) => (
        <ItemBuilder key={`rhs-${i}`} row={i + 1} rhs={true} text={text} />
      ))}

      {/* your custom RHS rows 8–10 can stay here */}
    </>
  );
}
