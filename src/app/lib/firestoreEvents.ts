import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase/firebase";
import type { EventFormData } from "./eventTypes";

export async function createEvent(event: EventFormData) {
  const id = event.id ?? Date.now();

  // Avoid large base64 images in Firestore (1MB doc limit). Use Storage later.
  const safeImageData =
    typeof event.imageData === "string" && event.imageData.length > 150_000
      ? null
      : (event.imageData ?? null);

  await addDoc(collection(db, "events"), {
    ...event,
    id,
    imageData: safeImageData,
    createdAt: serverTimestamp(),
  });

  return id;
}

export function subscribeToEvents(
  onEvents: (events: EventFormData[]) => void
): Unsubscribe {
  const q = query(collection(db, "events"), orderBy("date", "asc"));

  return onSnapshot(q, (snap) => {
    const events: EventFormData[] = snap.docs.map(
      (d) => d.data() as EventFormData
    );
    onEvents(events);
  });
}
