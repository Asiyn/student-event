import styles from "./page.module.css";
import feedStyles from "./start.module.css";

import Navbar from "./components/navbar";
import EventFeed from "./feed/EventFeed";

// import ActionButton from "./components/ActionButtons";
// import RotatingText from './components/RotatingText';

export default function Home() {
  return (
    <>
    <div className={`${styles.page} ${feedStyles.page}`}>
        <h1>Student Event</h1>

        {/* <ActionButton text="Confirm" type='confirm' /> */}
        
        <EventFeed />
    </div>
    </>
  );
}
