import styles from "./eventfeed.module.css";

import FeedItem from "./FeedItem";

export default function EventFeed() {
  return (
    <>
      <div className={styles["feed-container"]}>

        <FeedItem />
        <FeedItem />

      </div>
    </>
  );
}
