// EventDetails.tsx
import CreateField from "./CreateField";
import styles from "./eventdetails.module.css";
import {
  buildGroupedOptions,
  buildFlatOptions,
  sektionerDef,
  fakultetDef,
} from "../components/dropdownHelper";
import { useEffect, useState } from "react";

type Props = {
  resetKey?: number;
};

export default function EventDetails({ resetKey }: Props) {
  const sektionerOptions = buildGroupedOptions(sektionerDef, true);
  const fakultetOptions = buildFlatOptions(fakultetDef, false);

  const [, setArrangor] = useState("");
  const [, setFakultet] = useState("");

  useEffect(() => {
    setArrangor("");
    setFakultet("");
  }, [resetKey]);

  return (
    <>
      <h2>Skapa event</h2>
      {/* <p className={styles["notice"]}>
        <i>
          <span className={"required-star"}>*</span> Obligatoriskt att fylla i
          dessa fält
        </i>
      </p> */}
      <div className={styles["form"]}>
        <CreateField
          label="Namn på event"
          name="event"
          inputType="text"
          required
        />
        <CreateField
          label="Arrangör"
          name="arrangor"
          dropdown
          dropdownOptions={sektionerOptions}
          required
        />
        <CreateField label="Datum" name="date" inputType="date" required />
        <CreateField label="Plats" name="place" inputType="text" />
        <CreateField
          label="Starttid"
          name="startTime"
          inputType="time"
          required
        />
        <CreateField label="Sluttid" name="endTime" inputType="time" required />
        <CreateField
          label="Beskrivning"
          name="beskrivning"
          inputType="textarea"
        />
        <CreateField
          label="Fakultet"
          name="fakultet"
          dropdown
          dropdownOptions={fakultetOptions}
        />
        <CreateField
          label="Länk till arrangörens sida"
          name="organizerURL"
          inputType="url"
        />
        <CreateField
          label="Färg på event i kalendern"
          name="colorCalendar"
          inputType="color"
        />
      </div>
    </>
  );
}
