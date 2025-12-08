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
        <CreateField
          label="Namn på event"
          name="event"
          inputType="text"
          required
        />

        <CreateField
          label="Arrangör"
          name="arrangor"
          dropdown={true}
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
          fullWidth={true}
        />

        <CreateField
          label="Fakultet"
          name="fakultet"
          dropdown={true}
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
