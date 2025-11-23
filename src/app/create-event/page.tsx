import Navbar from "../components/navbar";
import styles from "./createEvent.module.css";

export const metadata = {
  title: "Skapa Event | StudentEvent",
};

export default function CreateEvent() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            className={styles.headFlex}
            style={{ gridRow: "1", gridColumn: "1 / span 2" }}
          >
            <p className={styles.headText}>skapa ditt event:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "2", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>namn på event:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "3", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>datum:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "4", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>tid:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "5", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>plats:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "6", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>värd:</p>
          </div>
          <div
            className={styles.descFlex}
            style={{ gridRow: "7", gridColumn: "1 /span 2" }}
          >
            <p className={styles.bodyText}>beskrivning:</p>
          </div>{" "}
          <div
            className={styles.descFlex}
            style={{ gridRow: "8", gridColumn: "1 /span 2" }}
          >
            <p className={styles.bodyText}>---input--</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "9", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>omslag/ affisch:</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "10", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>fakultet:</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "11", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>sektion:</p>
          </div>
          {/* ------------------RIGHT SIDE----------------- */}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "2", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "3", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "4", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "5", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "6", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "9", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>{" "}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "10", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>{" "}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "11", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>---input---</p>
          </div>
        </div>
      </div>
    </>
  );
}
