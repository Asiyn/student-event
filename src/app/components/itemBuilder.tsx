import React from "react";
import styles from "../create-event/createEvent.module.css";

interface ItemBuilderProps {
  row: number;
  rhs: boolean;
  text: string;
  placeholder?: string;
}

export default function ItemBuilder({ row, rhs, text, placeholder }: ItemBuilderProps) {
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex; 
  const inner = rhs ? styles.bodyTextRHS : styles.bodyText;
  return (
    <div className={style} style={{ gridRow: row, gridColumn: column }}>
      {rhs ? (
        <div className={inner}>
          <textarea
            className={styles.textInput}
            placeholder={placeholder ?? text}
            rows={1}
          />
        </div>
      ) : (
        <div className={inner}>{text}</div>
      )}
    </div>
  );
}
 
/*---------------------------------Dessa kvar att bygga-----------------------------*/

/*   <div className={styles.bodyFlexRHS} style={{ gridRow: "8", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Ladda upp omslag/affish här" rows={1} />
            </p>
          </div>

          <div className={styles.bodyFlexRHS} style={{ gridRow: "9", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Faktultet Lintek/Stuff..." rows={1} />
            </p>
          </div>

          <div className={styles.bodyFlexRHS} style={{ gridRow: "10", gridColumn: "2" }}>
            <p className={styles.bodyTextRHS}>
              <textarea className={styles.textInput} placeholder="Sektion N/MT/GDK..." rows={1} />
            </p>
          </div>*/