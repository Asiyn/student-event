import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
        {/* byggd */}
      <p className={styles["footer-text"]}>© 2025 StudentEvent. Denna hemsida är skapad av studenter vid LiU</p>
    </footer>
  );
}