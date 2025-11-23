import Navbar from "../components/navbar";
import styles from "./createEvent.module.css";


export const metadata = {
  title: "Skapa Event | StudentEvent",
};

export default function CreateEvent() {
  return (
    <>
      <Navbar />
           <div
            className={styles.headFlex}>
            <p className={styles.headText}>Skapa ditt event här:</p>
          </div>
      <div className={styles.container}>
        <div className={styles.grid}>
         
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "1", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>namn på event:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "2", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>datum:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "3", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>tid:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "4", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>plats:</p>
          </div>
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "5", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>värd:</p>
          </div>
          <div
            className={styles.descFlex}
            style={{ gridRow: "6", gridColumn: "1 /span 2" }}
          >
            <p className={styles.bodyText}>Beskrivning:</p>
          </div>
          {/*<div
            className={styles.descFlex}
            style={{ gridRow: "8", gridColumn: "1 /span 2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.descInputText} placeholder="Beskriv ditt evenemang här"/></p>
          </div>*/}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "8", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>omslag / affisch:</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "9", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>fakultet:</p>
          </div>{" "}
          <div
            className={styles.bodyFlex}
            style={{ gridRow: "10", gridColumn: "1" }}
          >
            <p className={styles.bodyText}>sektion:</p>
          </div>
          {/* ------------------RIGHT SIDE / TEXT----------------- */}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "1", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="Namn på event här"/>
      </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "2", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="ÅÅÅÅ-MM-DD"/>
             </p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "3", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="XX : YY"/></p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "4", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="Plats för event här"/></p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "5", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="Värd/Organisation här"/></p>
          </div>
          <div
            className={styles.descFlex}
            style={{ gridRow: "7", gridColumn: "1 /span 2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.descInputText} placeholder="Beskriv ditt evenemang här" maxLength={250}/></p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "8", gridColumn: "2" }}
          >
            <p className={styles.bodyText}>
              <textarea className={styles.textInput} placeholder="Ladda upp omslag/affish här"/></p>
          </div>
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "9", gridColumn: "2" }}
          >
            <p className={styles.bodyText}><textarea className={styles.textInput} placeholder="Faktultet Lintek/Stuff..."/></p>
          </div>{" "}
          <div
            className={styles.bodyFlexRHS}
            style={{ gridRow: "10", gridColumn: "2" }}
          >
            <p className={styles.bodyText}><textarea className={styles.textInput} placeholder="Sektion N/MT/GDK..."/></p>
          </div>
        </div>
      </div>
    </>
  );
}
