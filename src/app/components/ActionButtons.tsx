import styles from "./actionButtons.module.css";

export default function ActionButton({ text, type }: { text: string, type?: "warn" | "confirm" }) {
  return <button className={styles[`${type}-button`]}>{text}</button>;
}
