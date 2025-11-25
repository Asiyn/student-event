import Image from "next/image";
import img from "../../images/halloween.jpg";
import styles from "./feeditem.module.css";

export default function EventFeed() {
  return (
    <>
      <div className={styles["item"]}>
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
