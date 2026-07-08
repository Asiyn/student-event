"use client";

import { useEffect } from "react";
import styles from "./modal.module.css";
import stylesText from "./eventdetails.module.css"

type Props = {
  onClose: () => void;
};

export default function LoginModal({
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
        <h2 className={styles.h2}> Logga in </h2>
        <div className={stylesText["field-container"]}
        >
            <input id="textfield" name="textfield" type="text" placeholder="Användarnamn" />
            <input id="textfield" name="textfield" type="text" placeholder="Lösenord" />
            <span>Om du inte har ett konto - kontakta oss. Eller något. Wth</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['succ-btn']} onClick={onClose}>Logga in</button>
        </div>
      </div>
    </div>
  );
}
