import Navbar from "../components/navbar";
import styles from "./createEvent.module.css";
import FormBuilder from "../components/formBuilder";

export default function CreateEvent() {
  return (
    <>
      <div className={styles.headFlex}>
        <p className={styles.headText}>Skapa ditt event här</p>
      </div>
      {/*kan chilla här*/}
      <div className={styles.container}>
        <div className={styles.grid}>
          <FormBuilder />

          <div className={styles.bodyFlexRHS} style={{ gridRow: "8", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Ladda upp omslag/affish här" rows={1} />
            </p>
          </div>

          <div className={styles.bodyFlexRHS} style={{ gridRow: "9", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Faktultet Lintek/Stuff..." rows={1} />
            </p>
          </div>

          <div className={styles.bodyFlexRHS} style={{ gridRow: "10", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Sektion N/MT/GDK..." rows={1} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
