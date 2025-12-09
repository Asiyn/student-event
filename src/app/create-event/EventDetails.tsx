// EventDetails.tsx
import CreateField from "./CreateField";
import styles from "./eventdetails.module.css";
import {
  buildGroupedOptions,
  buildFlatOptions,
  sektionerDef,
  fakultetDef,
} from "../components/dropdownHelper";

export default function EventDetails() {
  const sektionerOptions = buildGroupedOptions(sektionerDef, true);
  const fakultetOptions = buildFlatOptions(fakultetDef, false);

  return (
    <>
      <h2>Skapa event</h2>
      <div className={styles["form"]}>
        <CreateField label="Namn på event" name="event" inputType="text" />
        <CreateField
          label="Arrangör"
          name="arrangor"
          dropdown
          dropdownOptions={sektionerOptions}
        />
        <CreateField label="Datum" name="date" inputType="date" />
        <CreateField label="Plats" name="place" inputType="text" />
        <CreateField label="Starttid" name="startTime" inputType="time" />
        <CreateField label="Sluttid" name="endTime" inputType="time" />
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
      </div>
    </>
  );
}
