"use client";

import { useEffect } from "react";
import styles from "./modal.module.css";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export default function CreateEventConfirmModal({
  onCancel,
  onConfirm,
  onClose,
  isLoading = false,
}: Props) {
  return (
    <div className={styles.backdrop} onClick={isLoading ? undefined : onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.h2}>Skapa event?</h2>
        <p>Vill du bekräfta att eventet ska skapas?</p>

        <div className={styles.actions}>
          <button
            className={styles["avbryt"]}
            onClick={onCancel}
            disabled={isLoading}
          >
            Avbryt
          </button>
          <button
            className={styles["skapa"]}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Skapar..." : "Skapa event"}
          </button>
        </div>
      </div>
    </div>
  );
}
