import Navbar from "../components/navbar";
import styles from "./loginPage.module.css";

export const metadata = {
  title: "Skapa Event | StudentEvent",
};

export default function CreateEvent() {
  return (
    <>
      <Navbar />

      <div className={styles.grid}>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>

        <div className={styles.box}></div>
        <div className={styles.box}>
            Content
            din mammas håriga


        </div>
        <div className={styles.box}></div>

        <div className={styles.box}></div>
        <div className={styles.box}></div>
        <div className={styles.box}></div>
      </div>
    </>
  );
}

