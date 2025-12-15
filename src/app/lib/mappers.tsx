import type { EventFormData } from "./eventTypes";
import type { EventFeedItem } from "../feed/FeedItem";

const MONTHS = [
  "Januari","Februari","Mars","April","Maj","Juni",
  "Juli","Augusti","September","Oktober","November","December",
];

export function formToFeed(ev: EventFormData, id?: number): EventFeedItem {
  let month = "Okänd";
  let day = 1;
  let year = 2025;

  if (ev.date) {
    const parsed = new Date(ev.date);
    if (!Number.isNaN(parsed.getTime())) {
      month = MONTHS[parsed.getMonth()];
      day = parsed.getDate();
      year = parsed.getFullYear();
    }
  }

  return {
    id: id ?? ev.id ?? 0,
    host: ev.arrangor || "<missing>",
    event: ev.event || "<missing>",
    month,
    day,
    year,
    place: ev.place || undefined,
    startTime: ev.startTime || " ",
    endTime: ev.endTime || " ",
    beskrivning: ev.beskrivning || undefined,
    organizerURL: ev.organizerURL || undefined,
    img: ev.imageData ?? undefined,
  };
}
