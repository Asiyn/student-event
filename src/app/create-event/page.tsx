import Navbar from "../components/navbar";
import styles from "../page.module.css";

export const metadata = {
  title: "Skapa Event | StudentEvent",
};

export default function CreateEvent() {
    return (
        <>
        <Navbar />
        <div className={styles.page}>
            <main>
                <h1>Skapa Event</h1>
                <p>Här kan du skapa ett nytt event.</p>
            </main>
        </div>
        </>
    );
}