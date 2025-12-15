"use client";

import { useEffect } from "react";
import styles from "./modal.module.css";

type Props = {
  onClose: () => void;
};

export default function CreateEventSuccessModal({
  onClose,
}: Props) {
  useEffect(() => {
    document.documentElement.classList.add("no-scroll");
    document.body.classList.add("no-scroll");

    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>🎉 Event skapat!</h2>
        <p>Du kan nu stänga detta fönster.</p>
        <div className={styles.actions}>
          <button className={styles['skapa']} onClick={onClose}>Stäng</button>
        </div>
      </div>
    </div>
  );
}
