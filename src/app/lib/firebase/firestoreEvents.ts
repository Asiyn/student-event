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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { db, storage } from "./firebase";
import type { EventFormData } from "../eventTypes";

function fileExtension(file: File): string {
  // best effort from mime type, fallback to name
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

  // 1) Create the Firestore document first (WITHOUT the base64 image)
  const docRef = await addDoc(collection(db, "events"), {
    ...event,
    id,
    imageData: null, // don’t store base64 in Firestore
    imageUrl: null,
    imagePath: null,
    createdAt: serverTimestamp(),
  });

  // 2) If there is an image file, upload it to Storage and update the doc with URL/path
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

  return onSnapshot(q, (snap) => {
    const events: EventFormData[] = snap.docs.map(
      (d) => d.data() as EventFormData
    );
    onEvents(events);
  });
}
