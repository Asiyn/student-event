import Image, { StaticImageData } from "next/image";
import placeholderImg from "../../images/halloween.jpg";
import styles from "./feeditem.module.css";

export type EventFeedItem = {
  month?: string;
  day?: number;
  host?: string;
  event?: string;
  img?: string | StaticImageData;
  id?: number;
};

type FeedItemProps = EventFeedItem & {
  onClick?: () => void;
};

export default function FeedItem({
  month,
  day,
  host,
  event,
  img,
  // id,
  onClick,
}: FeedItemProps) {
  const formatWord = (word?: string) =>
    word ? word.slice(0, 3).charAt(0).toUpperCase() + word.slice(1, 3).toLowerCase() : "";

  return (
    <div
      className={styles["item"]}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className={styles["text-container"]}>
        <p className={styles["text-host"]}>{host ?? "Host"}</p>
        <p className={styles["text-event"]}>{event ?? "Event"}</p>
      </div>

      <div className={styles["date"]}>
        <p className={styles["date-day"]}>{day ?? 1}</p>
        <p className={styles["date-month"]}>{formatWord(month) ?? "Jan"}</p>
      </div>

      <Image
        src={img ?? placeholderImg}
        alt="placeholder"
        className={styles["feed-img"]}
        aria-hidden={true}
        priority
        fill
      />
    </div>
  );
}