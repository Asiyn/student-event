import React from "react";
import styles from "./create-event/createEvent.module.css";

<<<<<<< Updated upstream
export default function formBuilder(row: string, label: string) {
  return (
    <div
      className={styles.bodyFlex}
      style={{ gridRow: row, gridColumn: "1" }}
    >
      <p className={styles.bodyText}>{label}</p>
=======
interface ItemBuilderProps {
  row: number;
  rhs: boolean;
  text: string;
}

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default function ItemBuilder(props: ItemBuilderProps) {
  const { row, rhs, text } = props;
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex;
  const flextype = rhs ? styles.bodyTextRHS : styles.bodyText;

=======
export default function ItemBuilder({
  row,
  rhs,
  text,
  placeholder,
}: ItemBuilderProps) {
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex;
=======
export default function ItemBuilder({
  row,
  rhs,
  text,
  placeholder,
}: ItemBuilderProps) {
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex;
>>>>>>> Stashed changes
=======
export default function ItemBuilder({
  row,
  rhs,
  text,
  placeholder,
}: ItemBuilderProps) {
  const column = rhs ? 2 : 1;
  const style = rhs ? styles.bodyFlexRHS : styles.bodyFlex;
>>>>>>> Stashed changes
  const inner = rhs ? styles.bodyTextRHS : styles.bodyText;
>>>>>>> Stashed changes
  return (
    <div className={style} style={{ gridRow: row, gridColumn: column }}>
      {rhs ? (
        <textarea className={styles.textInput} placeholder={text} rows={1} />
      ) : (
        <div className={styles.bodyText}>{text}</div>
      )}
>>>>>>> Stashed changes
    </div>
  );
<<<<<<< Updated upstream
}
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
}
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
