import { EventFormData, STORAGE_KEY, DEFAULT_EVENTS } from "./eventTypes";

const PLACEHOLDER_EVENTS = DEFAULT_EVENTS;

// ladda in
export function loadEvents(): EventFormData[] {
  if (typeof window === "undefined") return PLACEHOLDER_EVENTS;

  const saved = localStorage.getItem(STORAGE_KEY);
  const parsed: EventFormData[] = saved ? JSON.parse(saved) : [];

  return [...PLACEHOLDER_EVENTS, ...parsed];
}

/*spara*/
export function saveEvent(event: EventFormData) {
  if (typeof window === "undefined") {
    throw new Error("Ett fel har inträffat");
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
  const parsed: EventFormData[] = saved ? JSON.parse(saved) : [];

  const newEvent: EventFormData = {
    ...event,
    id: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...parsed, newEvent]));
  } catch {
    throw new Error("Ett fel uppstod vid sparandet av eventet");
  }
}