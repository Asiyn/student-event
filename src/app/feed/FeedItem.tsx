import Image from "next/image";
import img from "../../images/halloween.jpg";
import styles from "./feeditem.module.css";

export default function EventFeed() {
  return (
    <>
      <div className={styles["item"]}>
        <div className={styles["text-container"]}>
          <p className={styles["text-organizer"]}>3cant</p>
          <p className={styles["text-event"]}>Halloween</p>
        </div>

        <div className={styles['date']}>
          <p className={styles['date-day']}>1</p>
          <p className={styles['date-month']}>Okt</p>
        </div>

        <Image
          src={img}
          alt="placeholder"
          className={styles["feed-img"]}
          aria-hidden={true}
          priority
        />
      </div>
    </>
  );
}
