import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Unsubscribe,
  type FirestoreError,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "./firebase/firebase";
import type { EventFormData } from "./eventTypes";

function fileExtension(file: File): string {
  const byType: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
  };
  if (byType[file.type]) return byType[file.type];

  const parts = file.name.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "jpg";
}

export async function createEvent(
  event: EventFormData,
  imageFile?: File | null
) {
  const id = event.id ?? Date.now();

  const docRef = await addDoc(collection(db, "events"), {
    ...event,
    id,
    imageData: null,
    imageUrl: null,
    imagePath: null,
    createdAt: serverTimestamp(),
  });

  // Ladda upp fil om nödvändigt
  if (imageFile) {
    const ext = fileExtension(imageFile);
    const path = `events/${docRef.id}/cover.${ext}`;

    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, imageFile);

    const url = await getDownloadURL(storageRef);

    await updateDoc(doc(db, "events", docRef.id), {
      imageUrl: url,
      imagePath: path,
    });
  }

  return id;
}

export function subscribeToEvents(
  onEvents: (events: EventFormData[]) => void
): Unsubscribe {
  const q = query(collection(db, "events"), orderBy("date", "asc"));

  return onSnapshot(
    q,
    (snap) => {
      const events: EventFormData[] = snap.docs.map(
        (d) => d.data() as EventFormData
      );
      onEvents(events);
    },
    (err: FirestoreError) => {
      console.error(
        "Firestore subscribeToEvents error:",
        err.code,
        err.message
      );
      onEvents([]);
    }
  );
}
