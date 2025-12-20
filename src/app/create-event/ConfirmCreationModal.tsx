"use client";

import { useEffect } from "react";
import styles from "./modal.module.css";

type Props = {
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
};

export default function ConfirmCreationModal({
  onCancel,
  onConfirm,
  onClose,
  isLoading = false,
}: Props) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isLoading) return;

      if (e.key === "Escape") onClose();

      if (e.key === "Enter") onConfirm();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onConfirm, isLoading]);

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
