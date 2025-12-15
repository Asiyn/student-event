import type { StaticImageData } from "next/image";
import vkImg from "../../images/02_VK.png";
import fullMoonSSkadat from "../../images/fullMoonSSkadat.jpg";
import halloweenImg from "../../images/halloween.jpg";

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
  color?: string | null;
  imageData?: string | StaticImageData | null;
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
    imageData: vkImg,
    color: "#FF9800",
  },
  {
    event: "FullMoon",
    arrangor: "SSKADAT",
    date: "2025-09-12",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "Consensus",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://stuff.liu.se",
    imageData: fullMoonSSkadat,
    color: "#4CAF50",
  },
  {
    event: "Halloween",
    arrangor: "3CANT",
    date: "2025-09-12",
    place: "Kårhuset Örat",
    startTime: "19:00",
    endTime: "23:30",
    fakultet: "LinTek",
    beskrivning: "Temasittning med tacos, underhållning och efterfest.",
    organizerURL: "https://lintek.liu.se",
    imageData: halloweenImg,
    color: "#4CAF50",
  },
];
