import { EventFormData, STORAGE_KEY } from "./eventTypes";

export function loadEvents(): EventFormData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as EventFormData[];
  } catch {
    return [];
  }
}

export function saveEvent(newEvent: EventFormData) {
  if (typeof window === "undefined") return;
  try {
    const current = loadEvents();
    const updated = [...current, newEvent];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ev. logga
  }
}
