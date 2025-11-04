import Navbar from "../components/navbar";
import styles from "../page.module.css";

export default function CalendarPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <h1>Kalender</h1>
        <p>Här kommer kalendern att visas.</p>
      </main>
    </div>
  );
}