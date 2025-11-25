// EventModal.tsx
import {EventFeedItem} from "./FeedItem";
import styles from "./eventmodal.module.css";

type EventModalProps = {
  event: EventFeedItem;
  onClose: () => void;
};

export default function EventModal({ event, onClose }: EventModalProps) {
  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2>{event.event}</h2>
        <p>
          <strong>Host:</strong> {event.host}
        </p>
        <p>
          <strong>Date:</strong> {event.day} {event.month}
        </p>

        {/* Later you can add more fields from the DB here */}
      </div>
    </div>
  );
}
