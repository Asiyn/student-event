import { EventFormData } from "../lib/eventTypes";
import { deleteEventByNumericId } from "../lib/firestoreEvents";
import {collection, doc, getDoc, orderBy, query} from "firebase/firestore";
import { db } from "./firebase/firebase";

/** Local calendar date as `[year, month, day]` with month 1–12. */
export function todayYmd(): [number, number, number] {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
}

export async function cleanEvents() {
  const q = query(collection(db, "events"), orderBy("date", "asc"));
  const snap = await getDoc(q);

  snap.docs.forEach((d) => {
  const data = d.data(); // EventFormData-shaped
  const docRef = d.ref;  // pass to deleteDoc(docRef)
});

  const [eventYear, eventMonth, eventDay] = data.date.split("-").map(Number);
  const [ty, tm, td] = todayYmd();

  const eventBeforeToday =
    eventYear < ty ||
    (eventYear === ty && eventMonth < tm) ||
    (eventYear === ty && eventMonth === tm && eventDay < td);

  if (eventBeforeToday && typeof event.id === "number") {
    await deleteEventByNumericId(event.id);
  }
}

/** Deletes the Firestore event whose stored field `id` matches `singleID`. */
/*export async function removeSingleEvent(singleID: number): Promise<number> {
  return deleteEventByNumericId(singleID);
}*/