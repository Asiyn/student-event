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
  color?: string | null;
};

export const DEFAULT_EVENTS: EventFormData[] = [
  {
    event: "VinterKravallen",
    arrangor: "Fest-n",
    date: "2025-08-25",
    place: "Kårhuset Kollektivet",
    startTime: "18:00",
    endTime: "23:00",
    fakultet: "LinTek",
    beskrivning: "VinterKravall hela veckan!",
    organizerURL: "https://lintek.liu.se",
    imageData: "../images/02_VK.PNG",
    color: "#FF9800",
  },
  {
    event: "FullMoon",
    arrangor: "SSKADAT",
    date: "2025-09-12",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "STUFF",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://stuff.liu.se",
    imageData: "../images/fullMoonSSkadat.jpg",
    color: "#4CAF50",
  },
];
