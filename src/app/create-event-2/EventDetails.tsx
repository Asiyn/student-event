import CreateField from "./CreateField";
import styles from "./eventdetails.module.css";
import {
  buildGroupedOptions,
  buildFlatOptions,
  sektionerDef,
  fakultetDef,
} from "../components/dropdownHelper";

export default function EventDetails() {
  const sektionerOptions = buildGroupedOptions(sektionerDef, true); // enable custom
  const fakultetOptions = buildFlatOptions(fakultetDef, false); // no custom

  return (
    <form method="POST" className={styles["form"]}>
      <h2>Om er</h2>

      <CreateField
        label="Arrangör"
        name="arrangor"
        dropdown={true}
        dropdownOptions={sektionerOptions}
      />

      <CreateField
        label="Fakultet"
        name="fakultet"
        dropdown={true}
        dropdownOptions={fakultetOptions}
      />

      <CreateField
        label="Datum"
        name="date"
        inputType="date"
        dropdown={false}
      />

      <CreateField label="Tid" name="time" inputType="time" dropdown={false} />

      <CreateField label="Evenemang" name="event" inputType="text"></CreateField>

      <CreateField label="Beskrivning" name="beskrivning" inputType="textarea"></CreateField>
    </form>
  );
}
