export const STORAGE_KEY = "studentevent-events";

export type EventFormData = {
  event: string;
  arrangor: string;
  date: string;
  place: string;
  startTime: string;
  endTime: string;
  fakultet: string;
  beskrivning: string;
  organizerURL: string;
  imageData?: string | null;
};