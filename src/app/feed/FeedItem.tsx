import Image, { StaticImageData } from "next/image";
import placeholderImg from "../../images/img_err.png";
import styles from "./feeditem.module.css";
import { useState } from "react";

export type EventFeedItem = {
  month?: string;
  day?: number;
  year?: number;
  startTime?: string;
  endTime?: string;
  host?: string;
  event?: string;
  beskrivning?: string;
  organizerURL?: string;
  place?: string;
  img?: string | StaticImageData;
  id?: number;
};

type FeedItemProps = EventFeedItem & {
  onClick?: () => void;
};

export default function FeedItem({
  month = 'Janurai',
  day = 1,
  host = '<missing>',
  event = '<missing>',
  img,
  // id,
  onClick,
}: FeedItemProps) {
  const formatWord = (word?: string) =>
    word ? word.slice(0, 3).charAt(0).toUpperCase() + word.slice(1, 3).toLowerCase() : "";

  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={styles["item"]}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles["text-container"]}>
        <p className={styles["text-event"]}>{event ?? "<missing>"}</p>
        <p className={styles["text-host"]}>{host ?? "<missing>"}</p>
      </div>

      <div className={styles["date"]}>
        <p className={styles["date-day"]}>{day ?? 1}</p>
        <p className={styles["date-month"]}>{formatWord(month) ?? "<>"}</p>
      </div>

<div className={styles.imageWrapper}>

      <Image
        src={img ?? placeholderImg}
        alt="placeholder"
        className={`${styles.feedImg} ${loaded ? styles.loaded : ""}`}
        aria-hidden={true}
        priority
        fill
        onLoadingComplete={() => setLoaded(true)}
      />
      </div>
    </div>
  );
}