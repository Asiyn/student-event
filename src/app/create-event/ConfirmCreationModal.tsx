"use client";

import { useEffect, useState } from "react";
import styles from "./modal.module.css";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

export default function CreateEventConfirmModal({
  onCancel,
  onConfirm,
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
        <h2>Skapa event?</h2>
        <p>Vill du bekräfta att eventet ska skapas?</p>

        <div className={styles.actions}>
          <button className={styles["avbryt"]} onClick={onCancel}>
            Avbryt
          </button>
          <button className={styles["skapa"]} onClick={onConfirm}>
            Skapa event
          </button>
        </div>
      </div>
    </div>
  );
}
