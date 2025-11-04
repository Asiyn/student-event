import Navbar from "../components/navbar";
import styles from "../page.module.css";

export default function CreateEvent() {
    return (
        <div className={styles.page}>
            <Navbar />
            <main>
                <h1>Skapa Event</h1>
                <p>Här kan du skapa ett nytt event.</p>
            </main>
        </div>
    );
}