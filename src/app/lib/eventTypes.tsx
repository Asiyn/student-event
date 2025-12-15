import type { StaticImageData } from "next/image";
import vkImg from "../../images/02_VK.png";
import fullMoonSSkadat from "../../images/fullMoonSSkadat.jpg";
import halloweenImg from "../../images/halloween.jpg";
import MidnightImg from "../../images/midnight_tease_skumpa.jpg";

export const STORAGE_KEY = "studentevent-events";

export type EventFormData = {
  id?: number;
  event: string;
  arrangor: string;
  date: string;
  place: string;
  startTime: string;
  endTime: string;
  fakultet: string;
  beskrivning: string;
  organizerURL: string;
  color?: string | null;
  imageData?: string | StaticImageData | null;
};

export const DEFAULT_EVENTS: EventFormData[] = [
  {
    id: 1,
    event: "VinterKravallen",
    arrangor: "Fest-n",
    date: "2025-12-25",
    place: "Kårhuset Kollektivet",
    startTime: "18:00",
    endTime: "23:00",
    fakultet: "LinTek",
    beskrivning: "VinterKravall hela veckan!",
    organizerURL: "https://lintek.liu.se",
    imageData: vkImg,
    color: "#FF9800",
  },
  {
    id: 2,
    event: "FullMoon",
    arrangor: "SSKADAT",
    date: "2025-12-13",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "Consensus",
    beskrivning: "FullMoon sittning!",
    organizerURL: "https://stuff.liu.se",
    imageData: fullMoonSSkadat,
    color: "#4CAF50",
  },
  {
    id: 3,
    event: "Halloween",
    arrangor: "3CANT",
    date: "2025-12-14",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "LinTek",
    beskrivning: "Temasittning med halloween i åtanke!",
    organizerURL: "https://lintek.liu.se",
    imageData: halloweenImg,
    color: "#4CAF50",
  },
  {
    id: 4,
    event: "Midnight Tease",
    arrangor: "skumpa",
    date: "2025-12-15",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "Stuff",
    beskrivning: "Teasing, stripping and much more ;)",
    organizerURL: "https://stuff.liu.se",
    imageData: MidnightImg,
    color: "#4CAF50",
  },
];
