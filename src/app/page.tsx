"use client";

import styles from "./page.module.css";
import feedStyles from "./start.module.css";

import EventFeed from "./feed/EventFeed";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "StudentEvent";
  }, []);

  return (
    <>
      <div className={`${styles.page} ${feedStyles.page}`}>
        <h1>Student Event</h1>
        <EventFeed />
      </div>
    </>
  );
}
