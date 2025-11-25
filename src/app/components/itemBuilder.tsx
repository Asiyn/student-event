import React from "react";
import styles from "../create-event/createEvent.module.css";

interface ItemBuilderProps {
  row: number;
  rhs: boolean;
  text: string;
}

export default function ItemBuilder(props: ItemBuilderProps) {
  const { row, rhs, text } = props;
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex;
  return (
    <div className={style} style={{ gridRow: row, gridColumn: column }}>
      <div className={styles.bodyText}>{text}</div>
      {rhs && (
        <textarea className={styles.textInput} placeholder={text} rows={1} />
      )}
    </div>
  );
}
