import { EventFormData } from "../lib/eventTypes";
import { deleteEventByNumericId } from "../lib/firestoreEvents";

/** Local calendar date as `[year, month, day]` with month 1–12. */
export function todayYmd(): [number, number, number] {
  const d = new Date();
  return [d.getFullYear(), d.getMonth() + 1, d.getDate()];
}

export default async function removeEvent(event: EventFormData) {
  const [eventYear, eventMonth, eventDay] = event.date.split("-").map(Number);
  const [ty, tm, td] = todayYmd();

  const eventBeforeToday =
    eventYear < ty ||
    (eventYear === ty && eventMonth < tm) ||
    (eventYear === ty && eventMonth === tm && eventDay < td);

  if (eventBeforeToday && typeof event.id === "number") {
    await deleteEventByNumericId(event.id);
  }
}

