"use client";

import { useEffect } from "react";
import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClose: () => void;
};

export default function ErrorModal({
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
        <h2 className={styles['h2-error']}><span className={styles.errorModalIcon}><FontAwesomeIcon icon={faTriangleExclamation} /></span> Något gick fel</h2>
        <p>Försök igen eller vänta ett tag.</p>
        <div className={styles.actions}>
          <button className={styles['err-btn']} onClick={onClose}>Stäng</button>
        </div>
        <p className={styles['err-hint-msg']}>*Ta bort bilden för att kunna skapa eventet. Developmentproblem med localstorage.</p>
        {/* TEMP TEXT */}
      </div>
    </div>
  );
}
